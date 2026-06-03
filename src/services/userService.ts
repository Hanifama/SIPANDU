// src/services/UserService.ts

import api from "../utils/api";
import {
  IUser,
  UserListResponse,
  UserDetailResponse,
} from "../interfaces/user";

class UserService {
  // ✅ Ambil semua user
  async getAllUsers(search?: string): Promise<IUser[]> {
    const params: { search?: string } = {};
    if (search) params.search = search;

    const response = await api.get<UserListResponse>("/users", { params });
    return response.data.data;
  }

  // ✅ Ambil detail user
  async getUserById(userId: string): Promise<IUser> {
    const response = await api.get<UserDetailResponse>(`/users/${userId}`);
    return response.data.data;
  }

  // ✅ Tambah user baru
  async createUser(userData: FormData | Partial<IUser>): Promise<IUser> {
    const response = await api.post<UserDetailResponse>("/users", userData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  }

  // ✅ Update user
  async updateUser(
    userId: string,
    userData: FormData | Partial<IUser>
  ): Promise<IUser> {
    const response = await api.put<UserDetailResponse>(
      `/users/${userId}`,
      userData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data.data;
  }

  // ✅ Hapus user
  async deleteUser(userId: string): Promise<boolean> {
    const response = await api.delete(`/users/${userId}`);
    return response.data.status;
  }
}

// Export instance langsung biar gampang dipanggil
export const userService = new UserService();
