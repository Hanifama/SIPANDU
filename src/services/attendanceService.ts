// src/services/AttendanceService.ts
import api from "../utils/api";
import {
  IAttendance,
  AttendanceListResponse,
  AttendanceDetailResponse,
  AttendanceCheckInRequest,
  AttendanceCheckOutRequest,
  AttendanceMetaData,
  AttendanceMetaDataRekapInformation,
  AttendanceUserSummary,
  AttendanceSummaryResponse,
  AttendanceUserResponse,
  IAttendanceUser,
  AttendanceTodayResponse,
  AttendanceMeResponse,
} from "../interfaces/attendance";

class AttendanceService {
  // Ambil semua attendance
  async getAllAttendances(params?: {
    name?: string;
    date?: string;
    mode?: "day" | "week" | "month";
  }): Promise<{ MetaData: AttendanceMetaData; data: IAttendance[] }> {
    const response = await api.get<AttendanceListResponse>("/attendance", {
      params,
    });
    return response.data.data;
  }

  // Ambil semua attendance rekap information
  async getAllRekapInformation(params?: {
    name?: string;
    date?: string;
    mode?: "day" | "week" | "month";
  }): Promise<{
    MetaData: AttendanceMetaDataRekapInformation;
    data: AttendanceUserSummary[];
  }> {
    const response = await api.get<AttendanceSummaryResponse>(
      "/attendance/information",
      {
        params,
      }
    );
    return response.data.data; // langsung return { MetaData, data }
  }

  async getUserAttendances(userId: string): Promise<IAttendance[]> {
    const response = await api.get<AttendanceUserResponse>(`/attendance/user`, {
      params: { user_id: userId },
    });
    return response.data.data;
  }

  // Ambil status attendance hari ini
  async getTodayAttendance(userId: string): Promise<{
    attendance_id: string | null;
    status: "belum absen" | "sudah check-in" | "sudah check-out";
    check_in_time: string | null;
    check_out_time: string | null;
    user: IAttendanceUser;
  }> {
    const response = await api.get<AttendanceTodayResponse>(
      "/attendance/today",
      {
        params: { user_id: userId },
      }
    );
    return response.data.data;
  }

  async getMyAttendance(params?: {
    month?: string;
    year?: number;
  }): Promise<AttendanceMeResponse> {
    const response = await api.get<{ data: AttendanceMeResponse }>(
      "/attendance/me",
      { params }
    );
    return response.data.data;
  }

  // Ambil attendance by attendanceId
  async getAttendanceById(attendanceId: string): Promise<IAttendance> {
    const response = await api.get<AttendanceDetailResponse>(
      `/attendance/user/${attendanceId}`
    );
    return response.data.data;
  }

  // Check-in
  async checkIn(payload: AttendanceCheckInRequest): Promise<IAttendance> {
    const formData = new FormData();
    formData.append("user_id", payload.user_id);
    formData.append("lat", String(payload.lat));
    formData.append("lng", String(payload.lng));
    if (payload.check_in_description)
      formData.append("check_in_description", payload.check_in_description);
    if (payload.photo) {
      formData.append("photo", payload.photo, "attendance.jpg");
    }
    formData.append("source", payload.source ?? "web");

    const response = await api.post<AttendanceDetailResponse>(
      "/attendance/check-in",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  }

  // Check-out
  async checkOut(payload: AttendanceCheckOutRequest): Promise<IAttendance> {
    const formData = new FormData();
    formData.append("lat", String(payload.lat));
    formData.append("lng", String(payload.lng));
    if (payload.check_out_description)
      formData.append("check_out_description", payload.check_out_description);
    if (payload.photo) {
      formData.append("photo", payload.photo, "attendance.jpg");
    }
    formData.append("source", payload.source ?? "web");

    const response = await api.post<AttendanceDetailResponse>(
      `/attendance/check-out/${payload.attendance_id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  }
}

export const attendanceService = new AttendanceService();
