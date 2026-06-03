import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import { useAuthStore } from "../store/useAuthStore";
import { Pencil, KeyRound, X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { UpdatePasswordRequest } from "../interfaces/auth";
import { toast } from "react-toastify";
dayjs.locale("id");

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profile, fetchProfile, changePassword, isLoading, error } =
    useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<UpdatePasswordRequest>({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
    new_password_confirmation: false,
  });

  const resetForm = () => {
    setForm({
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    });
    setShowPassword({
      old_password: false,
      new_password: false,
      new_password_confirmation: false,
    });
  };

  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      fetchProfile();
      isFetched.current = true;
    }
  }, [fetchProfile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(form);
      toast.success("Password berhasil diperbarui!");
      setIsModalOpen(false);
      setForm({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (err: any) {
      toast.error(err.message || "Gagal memperbarui password");
    }
  };

  const profileFields = [
    { label: "Nama Lengkap", value: profile?.name },
    { label: "Email", value: profile?.email },
    { label: "Role", value: profile?.role },
    { label: "No. Telepon", value: profile?.phone_number },
    { label: "Alamat", value: profile?.location },
    {
      label: "Dibuat Pada",
      value: profile?.created_at
        ? dayjs(profile.created_at).format("DD MMMM YYYY HH:mm")
        : "-",
    },
    {
      label: "Diupdate Terakhir",
      value: profile?.updated_at
        ? dayjs(profile.updated_at).format("DD MMMM YYYY HH:mm")
        : "-",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 relative">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Profil Pengguna
          </h1>
          <button
            onClick={() => navigate("/profile/edit")}
            className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 transition"
            title="Edit Profile"
          >
            <Pencil size={20} />
          </button>

          {/* Info User */}
          <div className="flex items-center gap-6 mb-8">
            {profile?.photo ? (
              <img
                src={profile.photo}
                alt="User"
                className="h-20 w-20 rounded-xl object-cover border-2 border-blue-500"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                {profile?.name?.charAt(0) || "?"}
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {profile?.name || "-"}
              </h2>
              <p className="text-sm text-gray-500">{profile?.email || "-"}</p>
            </div>
          </div>

          {/* Profile Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {profileFields.map((field, index) => (
              <div key={index}>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value || "-"}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-700"
                />
              </div>
            ))}
          </div>

          {/* Button Ganti Password */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              <KeyRound size={18} />
              Ganti Password
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Ganti Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {(
                [
                  "old_password",
                  "new_password",
                  "new_password_confirmation",
                ] as const
              ).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field === "old_password"
                      ? "Password Lama"
                      : field === "new_password"
                      ? "Password Baru"
                      : "Konfirmasi Password Baru"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword[field] ? "text" : "password"}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    >
                      {showPassword[field] ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>

            {/* Error Feedback */}
            {error && (
              <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProfilePage;
