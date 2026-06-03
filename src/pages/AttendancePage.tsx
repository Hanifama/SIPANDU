// src/pages/AttendanceManagement.tsx
import { useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import CustomTable from "../components/dashboard/_shared/CustomTable";

import { TextField, Button, MenuItem } from "@mui/material";
import { useAttendanceStore } from "../store/useAtendanceStore";

import { toast } from "react-toastify";

import { Users, Database, Calendar, Clock } from "lucide-react";

const columns = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "name", label: "Nama User", minWidth: 150 },
  { id: "date", label: "Tanggal", minWidth: 170 },
  { id: "check_in_time", label: "Check In", minWidth: 170 },
  { id: "check_out_time", label: "Check Out", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "source", label: "Sumber", minWidth: 100 },
];

const AttendanceManagement = () => {
  const navigate = useNavigate();
  const { attendances, attendanceMeta, fetchAttendances, isLoading } =
    useAttendanceStore();

  const [filters, setFilters] = useState({
    name: "",
    date: new Date().toLocaleDateString("en-CA"),
    mode: "day" as "day" | "week" | "month",
  });
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (!isFetchedRef.current) {
      fetchAttendances(filters);
      isFetchedRef.current = true;
    }
  }, [fetchAttendances]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilterSubmit = () => {
    fetchAttendances(filters);
  };

  const handleDetail = (row: any) => {
    if (!row.attendance_id) {
      toast.info("User belum absen", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    navigate(`/attendance/detail/${row.attendance_id}`);
  };

  const rows = attendances.map((att, index) => ({
    attendance_id: att.attendance_id,
    user_id: att.user_id,
    no: index + 1,
    name: att.user?.name || "-",
    date: att.date || "-",
    check_in_time: att.check_in_time || "-",
    check_out_time: att.check_out_time || "-",
    status: att.status || "-",
    source: att.source || "-",
    isDetailDisabled: !att.attendance_id,
  }));

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-slate-700 flex items-center gap-2">
            <CalendarDays size={22} className="text-blue-600" />
            Riwayat Absensi
          </h1>
        </div>

        {attendanceMeta && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Total User */}
            <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
              <Users className="w-6 h-6 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Total User</p>
              <p className="text-xl font-semibold">
                {attendanceMeta.total_user}
              </p>
            </div>

            {/* Total Data */}
            <div className="bg-green-50 shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
              <Database className="w-6 h-6 text-green-400 mb-2" />
              <p className="text-sm text-gray-500">Total Data</p>
              <p className="text-xl font-semibold text-green-600">
                {attendanceMeta.total_records}
              </p>
            </div>

            {/* Total Hari */}
            <div className="bg-red-50 shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
              <Calendar className="w-6 h-6 text-red-400 mb-2" />
              <p className="text-sm text-gray-500">Total Hari</p>
              <p className="text-xl font-semibold text-red-600">
                {attendanceMeta.total_days}
              </p>
              <p className="text-xs text-gray-400">
                {attendanceMeta.periode_date}
              </p>
            </div>

            {/* Periode Absensi */}
            <div className="bg-blue-50 shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
              <Clock className="w-6 h-6 text-blue-400 mb-2" />
              <p className="text-sm text-gray-500">Periode Absensi</p>
              <p className="text-xl font-semibold text-blue-600">
                {attendanceMeta.month_name}
              </p>
              <p className="text-xs text-gray-400">
                {attendanceMeta.periode_date}
              </p>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 bg-white p-4 rounded-lg shadow-sm items-stretch">
          {/* Nama input */}
          <TextField
            label="Cari Nama"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            size="small"
            variant="outlined"
            sx={{ flex: 1, minWidth: 150 }}
          />

          {/* Tanggal input */}
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

          {/* Button filter */}
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
          title="Daftar Absensi"
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          onDetail={handleDetail}
        />
      </div>
    </DashboardLayout>
  );
};

export default AttendanceManagement;
