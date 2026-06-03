import {
  LoginRequest,
  LoginData,
  UserProfile,
  UpdateProfileResponse,
  UpdatePasswordRequest,
} from "../interfaces/auth";
import api from "../utils/api";
import { tokenService } from "./tokenService";

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginData> {
    try {
      const response = await api.post("/login", credentials);
      const { token } = response.data.data;

      if (token) {
        tokenService.setToken(token);
        return response.data.data;
      }

      throw new Error(response.data.message || "Login gagal");
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Login gagal");
    }
  }

  async getProfile(): Promise<UserProfile> {
    const response = await api.get("/profile");
    return response.data.data;
  }

  async updateProfile(profileData: FormData): Promise<UpdateProfileResponse> {
    const response = await api.post("/profile", profileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  async changePassword(data: UpdatePasswordRequest): Promise<void> {
    try {
      await api.put("/profile/password", data);
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Gagal ganti password");
    }
  }
}

export const authService = new AuthService();
