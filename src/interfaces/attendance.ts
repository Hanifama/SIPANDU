// Base Response buat konsistensi
export interface BaseApiResponse {
  status: boolean;
  code: number;
  message: string;
}

// Request untuk check-in
export interface AttendanceCheckInRequest {
  user_id: string;
  lat: number;
  lng: number;
  check_in_description?: string;
  photo?: File | Blob;
  source?: "web" | "mobile";
}

// Request untuk check-out
export interface AttendanceCheckOutRequest {
  attendance_id: string;
  lat: number;
  lng: number;
  check_out_description?: string;
  photo?: File | Blob | null;
  source?: "web" | "mobile";
}

// Minimal data user di attendance
export interface IAttendanceUser {
  user_id: string;
  name: string;
  email?: string | null;
  photo?: string | null;
  location?: string | null;
  phone_number?: string | null;
  lat?: string | null;
  lng?: string | null;
  status?: number;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

// Attendance sesuai response BE
export interface IAttendance {
  attendance_id: string | null;
  user_id: string;
  check_in_time: string | null;
  check_out_time: string | null;
  lat: string | null;
  lng: string | null;
  status: "hadir" | "izin" | "sakit" | "alpha" | "tidak hadir";
  check_in_description: string | null;
  check_out_description: string | null;
  check_in_photo: string | null;
  check_out_photo: string | null;
  source: "web" | "mobile" | null;
  date: string | null;
  created_at: string | null;
  updated_at: string | null;
  user: IAttendanceUser;
}

// Summary / MetaData response dari BE
export interface AttendanceMetaData {
  total_user: number;
  total_records: number;
  total_days: number;
  mode: "day" | "week" | "month";
  periode_date: string;
  month_name: string;
}

// Data rekap absensi
export interface AttendanceUserSummary {
  user_id: string;
  name: string;
  hadir_count: number;
  tidak_hadir_count: number;
  attendance_percentage: number;
}

// MetaData response Rekap absensi
export interface AttendanceMetaDataRekapInformation {
  total_user: number;
  total_days: number;
  mode: "day" | "week" | "month";
  periode_date: string;
  month_name: string;
  hadir: number;
  tidak_hadir: number;
}

// Metadata response absensi bulanan user
export interface AttendanceMetadataMe {
  user_id: string;
  name: string;
  month: string;
  year: number;
  total_days: number;
  hadir: number;
  tidak_hadir: number;
}

// Detail absensi harian user
export interface IUserMeAttendance {
  date: string;
  status: string; // "hadir" | "tidak hadir"
}

// Response untuk list Attendance User
export interface AttendanceUserResponse extends BaseApiResponse {
  data: IAttendance[];
}

// Response untuk list attendance
export interface AttendanceListResponse extends BaseApiResponse {
  data: {
    MetaData: AttendanceMetaData;
    data: IAttendance[];
  };
}

// Response untuk detail attendance
export interface AttendanceDetailResponse extends BaseApiResponse {
  data: IAttendance;
}

// Response Api untuk Rekap Absensi
export interface AttendanceSummaryResponse extends BaseApiResponse {
  data: {
    MetaData: AttendanceMetaDataRekapInformation;
    data: AttendanceUserSummary[];
  };
}

// Response untuk absensi hari ini
export interface AttendanceTodayResponse extends BaseApiResponse {
  data: {
    attendance_id: string | null;
    status: "belum absen" | "sudah check-in" | "sudah check-out";
    check_in_time: string | null;
    check_out_time: string | null;
    user: IAttendanceUser;
  };
}

// Response absensi bulanan user (endpoint /attendance/me)
export interface AttendanceMeResponse extends BaseApiResponse {
  MetaData: AttendanceMetadataMe;
  data: IUserMeAttendance[];
}
