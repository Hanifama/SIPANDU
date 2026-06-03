// src/store/useAttendanceStore.ts
import { create } from "zustand";
import {
  IAttendance,
  AttendanceCheckInRequest,
  AttendanceCheckOutRequest,
  AttendanceMetaData,
  AttendanceMetaDataRekapInformation,
  AttendanceUserSummary,
  IAttendanceUser,
  AttendanceMetadataMe,
  IUserMeAttendance,
} from "../interfaces/attendance";
import { attendanceService } from "../services/attendanceService";

interface AttendanceState {
  // Data attendance detail
  attendances: IAttendance[];
  attendanceMeta: AttendanceMetaData | null;

  // Data rekap summary
  summary: AttendanceUserSummary[];
  summaryMeta: AttendanceMetaDataRekapInformation | null;

  // Data absensi user
  userAttendances: IAttendance[];

  selectedAttendance: IAttendance | null;
  isLoading: boolean;
  error: string | null;

  myAttendance: IUserMeAttendance[];
  summaryMyMeta: AttendanceMetadataMe | null;

  todayAttendance: {
    attendance_id: string | null;
    status: "belum absen" | "sudah check-in" | "sudah check-out";
    check_in_time: string | null;
    check_out_time: string | null;
    user: IAttendanceUser | null;
  } | null;

  // Actions
  fetchAttendances: (params?: {
    name?: string;
    date?: string;
    mode?: "day" | "week" | "month";
  }) => Promise<void>;

  fetchSummary: (params?: {
    name?: string;
    date?: string;
    mode?: "day" | "week" | "month";
  }) => Promise<void>;

  fetchAttendanceById: (attendanceId: string) => Promise<void>;
  fetchUserAttendances: (userId: string) => Promise<void>;

  fetchTodayAttendance: (userId: string) => Promise<void>;

  fetchMyAttendance: (params?: {
    month?: string;
    year?: number;
  }) => Promise<void>;

  checkIn: (payload: AttendanceCheckInRequest) => Promise<void>;
  checkOut: (payload: AttendanceCheckOutRequest) => Promise<void>;
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  attendances: [],
  attendanceMeta: null,
  summary: [],
  summaryMeta: null,
  summaryMyMeta: null,
  todayAttendance: null,
  userAttendances: [],
  selectedAttendance: null,
  myAttendance: [],
  isLoading: false,
  error: null,

  // ===============================
  // Fetch attendance list
  // ===============================
  fetchAttendances: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const res = await attendanceService.getAllAttendances(params);
      set({
        attendances: res.data,
        attendanceMeta: res.MetaData,
      });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil data attendance" });
    } finally {
      set({ isLoading: false });
    }
  },

  // ===============================
  // Fetch rekap summary
  // ===============================
  fetchSummary: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const res = await attendanceService.getAllRekapInformation(params);
      set({
        summary: res.data,
        summaryMeta: res.MetaData,
      });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil rekap attendance" });
    } finally {
      set({ isLoading: false });
    }
  },

  // ===============================
  // Fetch attendance by ID
  // ===============================
  fetchAttendanceById: async (attendanceId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await attendanceService.getAttendanceById(attendanceId);
      set({ selectedAttendance: data || null });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil data attendance user" });
    } finally {
      set({ isLoading: false });
    }
  },

  // ===============================
  // Fetch attendance per user
  // ===============================
  fetchUserAttendances: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await attendanceService.getUserAttendances(userId);
      set({ userAttendances: data });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil histori absensi user" });
    } finally {
      set({ isLoading: false });
    }
  },

  // ===============================
  // Fetch today attendance
  // ===============================
  fetchTodayAttendance: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await attendanceService.getTodayAttendance(userId);
      set({ todayAttendance: data });
    } catch (error: any) {
      set({
        error: error.message || "Gagal mengambil status absensi hari ini",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // ====================================
  // Fetch my attendance (bulan + tahun)
  // ====================================
  fetchMyAttendance: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const data = await attendanceService.getMyAttendance(params);
      set({ myAttendance: data.data });
      set({
        myAttendance: data.data,
        summaryMyMeta: data.MetaData,
      });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil absensi bulanan user" });
    } finally {
      set({ isLoading: false });
    }
  },

  // ===============================
  // Check-in attendance
  // ===============================
  checkIn: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const newAttendance = await attendanceService.checkIn(payload);
      set({
        attendances: [...get().attendances, newAttendance],
        selectedAttendance: newAttendance,
      });
    } catch (error: any) {
      set({ error: error.message || "Gagal check-in" });
    } finally {
      set({ isLoading: false });
    }
  },

  // ===============================
  // Check-out attendance
  // ===============================
  checkOut: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await attendanceService.checkOut(payload);
      set({
        attendances: get().attendances.map((a) =>
          a.attendance_id === updated.attendance_id ? updated : a
        ),
        selectedAttendance: updated,
      });
    } catch (error: any) {
      set({ error: error.message || "Gagal check-out" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
