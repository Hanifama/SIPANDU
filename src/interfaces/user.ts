// Base Response buat konsistensi
export interface BaseApiResponse {
  status: boolean;
  code: number;
  message: string;
}

// User sesuai response BE
export interface IUser {
  user_id: string;
  name: string;
  email: string;
  photo: string | null;
  phone_number: string | null;
  lat: string | null;
  lng: string | null;
  status: number; // 1 = active, 0 = inactive
  role: "admin" | "employee"; // bisa di-enum biar strict
  created_at: string; // ISO datetime string
  updated_at: string;
}

// Response untuk list user
export interface UserListResponse extends BaseApiResponse {
  data: IUser[];
}

// Response untuk detail user
export interface UserDetailResponse extends BaseApiResponse {
  data: IUser;
}
