// src/pages/EmployeeDashboardPage.tsx
import { useEffect, useState } from "react";
import { Clipboard, Folder, Calendar } from "lucide-react";

import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import InfoCard from "../components/dashboard/_shared/InfoCard";
import CustomTable from "../components/dashboard/_shared/CustomTable";
import { useAttendanceStore } from "../store/useAtendanceStore";

// import dari MUI
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { id } from "date-fns/locale";

const EmployeeDashboardPage = () => {
  const { fetchMyAttendance, myAttendance, summaryMyMeta, isLoading, error } =
    useAttendanceStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (!selectedDate) return;
    fetchMyAttendance({
      month: String(selectedDate.getMonth() + 1).padStart(2, "0"),
      year: selectedDate.getFullYear(),
    });
  }, [selectedDate, fetchMyAttendance]);

  // Cari status absensi hari ini
  const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
  const todayAttendance = myAttendance.find((d) => d.date === today);

  let statusHariIni = "Belum Absen";

  if (todayAttendance?.status === "hadir") {
    statusHariIni = "Sudah Absen";
  } else if (todayAttendance?.status === "tidak_hadir") {
    statusHariIni = "Tidak Hadir";
  }

  // ==== data dari summaryMyMeta  ====
  const nama = summaryMyMeta?.name;
  const bulan = summaryMyMeta?.month;
  const tahun = summaryMyMeta?.year;

  const totalHari = summaryMyMeta?.total_days ?? 0;
  const totalHadir = summaryMyMeta?.hadir ?? 0;
  const totalAlpha = summaryMyMeta?.tidak_hadir ?? 0;

  const persenHadir =
    totalHari > 0 ? ((totalHadir / totalHari) * 100).toFixed(1) : "0";
  const persenAlpha =
    totalHari > 0 ? ((totalAlpha / totalHari) * 100).toFixed(1) : "0";

  // Data untuk table
  const columnsAttendance = [
    { id: "no", label: "No", minWidth: 50 },
    { id: "date", label: "Tanggal", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 120 },
  ];

  const rowsAttendance =
    myAttendance.map((d, i) => ({
      no: i + 1,
      date: d.date,
      status: d.status,
    })) ?? [];

  return (
    <DashboardLayout>
      {/* Header Dashboard */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard Kehadiran</h1>
        <p className="text-gray-600">
          {nama ? `${nama} - ` : ""}Periode {bulan} {tahun}
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <InfoCard
          title="Total Hari Kerja"
          value={String(totalHari)}
          color="blue"
          icon={<Clipboard size={24} />}
        />
        <InfoCard
          title="Total Hadir"
          value={`${totalHadir} (${persenHadir}%)`}
          color="green"
          icon={<Folder size={24} />}
        />
        <InfoCard
          title="Total Tidak Hadir"
          value={`${totalAlpha} (${persenAlpha}%)`}
          color="purple"
          icon={<Calendar size={24} />}
        />
        <InfoCard
          title="Status Absen Hari Ini"
          value={statusHariIni}
          color="red"
          icon={<Calendar size={24} />}
        />
      </div>

      {/* Table + Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Calendar */}
        <div className="bg-white rounded-xl shadow p-4">
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={id}>
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </LocalizationProvider>
        </div>

        <div className="lg:col-span-2">
          <CustomTable
            title={`Riwayat Kehadiran - ${bulan} ${tahun}`}
            columns={columnsAttendance}
            rows={rowsAttendance}
            isLoading={isLoading}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboardPage;
