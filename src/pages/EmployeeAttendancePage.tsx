// src/pages/EmployeeAttendance.tsx
import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import { useAttendanceStore } from "../store/useAtendanceStore";
import { Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeAttendancePage: React.FC = () => {
  const {
    checkIn,
    checkOut,
    fetchUserAttendances,
    fetchTodayAttendance,
    todayAttendance,
    userAttendances,
    isLoading,
  } = useAttendanceStore();

  const { profile, fetchProfile } = useAuthStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?.user_id) {
      fetchTodayAttendance(profile.user_id);
      fetchUserAttendances(profile.user_id);
    }
  }, [profile?.user_id]);

  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "checkin" | "checkout" | null;
    date: string | null;
  }>({ isOpen: false, type: null, date: null });

  const [photo, setPhoto] = useState<Blob | File | undefined>(undefined);
  const [note, setNote] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();

  // === CAMERA LOGIC ===
  const startCamera = async () => {
    if (!videoRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch {
      // fallback ke kamera depan
      const fallbackStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      videoRef.current.srcObject = fallbackStream;
      streamRef.current = fallbackStream;
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) setPhoto(blob);
      else setPhoto(undefined);
    }, "image/jpeg");
  };

  const openModal = (type: "checkin" | "checkout", date: string) => {
    setModal({ isOpen: true, type, date });
    setPhoto(undefined);
    setNote("");
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null, date: null });
    stopCamera();
  };

  // === SUBMIT CHECKIN/CHECKOUT ===
  const handleSubmit = async () => {
    if (!modal.type || !modal.date || !profile) return;

    try {
      // === Ambil posisi user ===
      const getPosition = () =>
        new Promise<{ lat: number; lng: number }>((resolve, reject) => {
          if (!navigator.geolocation) {
            reject("Geolocation tidak tersedia");
          }
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              resolve({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              });
            },
            (err) => reject(err),
            { enableHighAccuracy: true }
          );
        });

      let lat = -6.2; // fallback
      let lng = 106.8; // fallback

      try {
        const position = await getPosition();
        lat = position.lat;
        lng = position.lng;
      } catch (err) {
        console.warn("Gagal ambil geolocation, gunakan default", err);
      }

      // === Check-in ===
      if (modal.type === "checkin") {
        await checkIn({
          user_id: profile.user_id,
          lat,
          lng,
          check_in_description: note,
          photo,
          source: "web",
        });
        toast.success("Berhasil Check-in");
      }

      // === Check-out ===
      if (modal.type === "checkout") {
        if (!todayAttendance?.attendance_id) return;
        await checkOut({
          attendance_id: todayAttendance.attendance_id,
          lat,
          lng,
          check_out_description: note,
          photo,
          source: "web",
        });
        toast.success("Berhasil Check-out");
      }

      // 🔄 Re-fetch biar card & histori update
      await Promise.all([
        fetchTodayAttendance(profile.user_id),
        fetchUserAttendances(profile.user_id),
      ]);

      closeModal();
    } catch (err) {
      console.error("Gagal simpan absensi:", err);
      toast.error("Gagal menyimpan absensi ❌");
    }
  };

  // Start/stop camera otomatis saat modal open/close
  useEffect(() => {
    if (modal.isOpen) startCamera();
    return () => stopCamera();
  }, [modal.isOpen]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Hari Ini */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          {/* Info */}
          <div className="flex flex-col md:flex-row gap-6 w-full md:items-center">
            <div className="flex flex-col gap-2">
              {profile && (
                <h3 className="text-lg md:text-xl font-semibold">
                  {profile.name}
                </h3>
              )}
              <h2 className="text-xl md:text-2xl font-semibold">
                Hari ini{" "}
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <p>
                Status Hadir Kamu:{" "}
                <span
                  className={`font-medium ${
                    todayAttendance?.check_in_time
                      ? "text-green-200"
                      : "text-yellow-200"
                  }`}
                >
                  {todayAttendance?.check_in_time
                    ? todayAttendance?.check_out_time
                      ? "Sudah Check-out"
                      : "Sudah Check-in"
                    : "Belum Absen"}
                </span>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-4 mt-4 justify-center md:justify-end w-full">
            <button
              onClick={() =>
                openModal("checkin", new Date().toISOString().slice(0, 10))
              }
              disabled={!!todayAttendance?.check_in_time}
              className="flex-1 md:flex-none px-6 py-3 bg-white text-blue-600 rounded-xl shadow-md hover:shadow-lg transition disabled:bg-gray-300 disabled:text-gray-500 min-w-[140px]"
            >
              Check-in
            </button>
            <button
              onClick={() =>
                openModal("checkout", new Date().toISOString().slice(0, 10))
              }
              disabled={
                !todayAttendance?.check_in_time ||
                !!todayAttendance?.check_out_time
              }
              className="flex-1 md:flex-none px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:shadow-lg transition disabled:bg-gray-300 disabled:text-gray-500 min-w-[140px]"
            >
              Check-out
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Histori Absensi */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Histori Absensi
            </h2>

            {isLoading ? (
              <p className="text-gray-400 text-center">Memuat histori...</p>
            ) : userAttendances.length === 0 ? (
              <p className="text-gray-400 text-center">
                Belum ada histori absensi.
              </p>
            ) : (
              <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
                {userAttendances.map((att) => (
                  <div
                    key={att.attendance_id}
                    className="flex justify-between items-center p-3 rounded-xl border border-gray-100 hover:shadow-md transition bg-gray-50"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {new Date(
                          att.check_in_time || att.created_at || ""
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-xs text-gray-500">
                        Check-in:{" "}
                        {att.check_in_time
                          ? new Date(att.check_in_time).toLocaleTimeString(
                              "id-ID"
                            )
                          : "-"}
                      </span>
                      <span className="text-xs text-gray-500">
                        Check-out:{" "}
                        {att.check_out_time
                          ? new Date(att.check_out_time).toLocaleTimeString(
                              "id-ID"
                            )
                          : "-"}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-1 text-xs rounded-xl font-medium ${
                          att.status === "hadir"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {att.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        {att.source || "-"}
                      </span>

                      {/* Button Lihat Detail */}
                      <button
                        onClick={() =>
                          navigate(`/attendance/detail/${att.attendance_id}`)
                        }
                        className="mt-2 px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Full Screen */}
        {modal.isOpen && (
          <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white w-full h-full sm:h-auto sm:max-h-[95vh] md:w-11/12 md:h-[90vh] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
              {/* Kiri: Camera */}
              <div className="w-full md:w-1/2 bg-gray-50 p-4 sm:p-6 flex flex-col items-center justify-start gap-4 sm:gap-6 border-b md:border-b-0 md:border-r">
                <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center">
                  {modal.type === "checkin" ? "Check-in" : "Check-out"} <br />
                  <span className="text-xs sm:text-sm text-gray-500">
                    {modal.date}
                  </span>
                </h2>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={capturePhoto}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-md hover:scale-105 transition"
                >
                  <Camera size={18} /> Ambil Foto
                </button>
              </div>

              {/* Kanan: Preview & Catatan */}
              <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto">
                {/* Preview Foto */}
                {photo && (
                  <div className="flex flex-col items-center w-full">
                    <div className="w-full max-h-56 sm:max-h-72 md:max-h-80 rounded-xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Captured"
                        className="max-h-56 sm:max-h-72 md:max-h-80 w-auto object-contain"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2 italic text-center">
                      Preview hasil foto, pastikan wajah terlihat jelas.
                      <br className="hidden sm:block" />
                      Dilarang pakai masker dan kacamata hitam.
                    </p>
                  </div>
                )}

                {/* Catatan */}
                <div className="flex flex-col gap-2 flex-grow">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">
                    Catatan
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Tulis catatan..."
                    className="w-full min-h-[120px] sm:min-h-[150px] md:flex-grow border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 border-t">
                  <button
                    onClick={closeModal}
                    className="px-4 sm:px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-md hover:scale-105 transition"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmployeeAttendancePage;
