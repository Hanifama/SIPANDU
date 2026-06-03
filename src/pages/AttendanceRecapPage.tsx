// src/pages/AttendanceRecapSummary.tsx
import { useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import CustomTable from "../components/dashboard/_shared/CustomTable";

import { Users, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";

import { TextField, Button, MenuItem } from "@mui/material";
import { useAttendanceStore } from "../store/useAtendanceStore";

const columns = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "name", label: "Nama User", minWidth: 150 },
  { id: "hadir_count", label: "Hadir", minWidth: 100 },
  { id: "tidak_hadir_count", label: "Tidak Hadir", minWidth: 120 },
  { id: "attendance_percentage", label: "Persentase (%)", minWidth: 120 },
];

const AttendanceRecapSummary = () => {
  const { summary, summaryMeta, fetchSummary, isLoading } =
    useAttendanceStore();
  const [filters, setFilters] = useState({
    name: "",
    date: new Date().toLocaleDateString("en-CA"),
    mode: "day" as "day" | "week" | "month",
  });
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (!isFetchedRef.current) {
      fetchSummary(filters);
      isFetchedRef.current = true;
    }
  }, [fetchSummary]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilterSubmit = () => {
    fetchSummary(filters);
  };

  const rows = summary.map((user, index) => ({
    no: index + 1,
    name: user.name,
    hadir_count: user.hadir_count,
    tidak_hadir_count: user.tidak_hadir_count,
    attendance_percentage: user.attendance_percentage,
  }));

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-slate-700 flex items-center gap-2">
            <CalendarDays size={22} className="text-blue-600" />
            Rekap Absensi
          </h1>
        </div>

        {summaryMeta && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {/* Total User */}
            <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
              <Users className="w-6 h-6 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Total User</p>
              <p className="text-xl font-semibold">{summaryMeta.total_user}</p>
            </div>

            {/* Hanya tampilkan jika mode day */}
            {summaryMeta.mode === "day" && (
              <>
                {/* Hadir */}
                <div className="bg-green-50 shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                  <p className="text-sm text-gray-500">Hadir</p>
                  <p className="text-xl font-semibold text-green-600">
                    {summaryMeta.hadir}
                  </p>
                </div>

                {/* Tidak Hadir */}
                <div className="bg-yellow-50 shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
                  <XCircle className="w-6 h-6 text-yellow-400 mb-2" />
                  <p className="text-sm text-gray-500">Tidak Hadir</p>
                  <p className="text-xl font-semibold text-yellow-600">
                    {summaryMeta.tidak_hadir}
                  </p>
                </div>
              </>
            )}

            {/* Total Hari */}
            <div className="bg-red-50 shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
              <Calendar className="w-6 h-6 text-red-400 mb-2" />
              <p className="text-sm text-gray-500">Total Hari</p>
              <p className="text-xl font-semibold text-red-600">
                {summaryMeta.total_days}
              </p>
              <p className="text-xs text-gray-400">
                {summaryMeta.periode_date}
              </p>
            </div>

            {/* Periode Absensi */}
            <div className="bg-blue-50 shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
              <Clock className="w-6 h-6 text-blue-400 mb-2" />
              <p className="text-sm text-gray-500">Periode Absensi</p>
              <p className="text-xl font-semibold text-blue-600">
                {summaryMeta.month_name}
              </p>
              <p className="text-xs text-gray-400">
                {summaryMeta.periode_date}
              </p>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 bg-white p-4 rounded-lg shadow-sm items-stretch">
          <TextField
            label="Cari Nama"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            size="small"
            variant="outlined"
            sx={{ flex: 1, minWidth: 150 }}
          />

          <TextField
            label="Tanggal"
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            size="small"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1, minWidth: 150 }}
          />

          <TextField
            select
            label="Mode"
            name="mode"
            value={filters.mode}
            onChange={handleFilterChange}
            size="small"
            variant="outlined"
            sx={{ flex: 1, minWidth: 150 }}
          >
            <MenuItem value="day">Harian</MenuItem>
            <MenuItem value="week">Mingguan</MenuItem>
            <MenuItem value="month">Bulanan</MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={handleFilterSubmit}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              backgroundColor: "#3b82f6",
              "&:hover": { backgroundColor: "#2563eb" },
              minWidth: 100,
              flexShrink: 0,
            }}
          >
            Filter
          </Button>
        </div>

        <CustomTable
          title="Rekap Absensi User"
          columns={columns}
          rows={rows}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
};

export default AttendanceRecapSummary;
