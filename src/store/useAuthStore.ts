import { create } from "zustand";
import { authService } from "../services/authService";
import {
  LoginData,
  LoginRequest,
  UserProfile,
  UpdatePasswordRequest,
} from "../interfaces/auth";
import { tokenService } from "../services/tokenService";

class AuthStore {
  user: LoginData | null = null;
  profile: UserProfile | null = null;
  isLoading = false;
  error: string | null = null;

  setState: (partial: Partial<AuthStore>) => void;
  getState: () => AuthStore;

  constructor(set: any, get: any) {
    this.setState = set;
    this.getState = get;
  }

  loginUser = async (credentials: LoginRequest): Promise<void> => {
    this.setState({ isLoading: true, error: null });
    try {
      const userData = await authService.login(credentials);
      this.setState({ user: userData });
      await this.fetchProfile();
    } catch (error: any) {
      this.setState({ error: error.message || "Login gagal" });
      throw error;
    } finally {
      this.setState({ isLoading: false });
    }
  };

  logoutUser = (): void => {
    tokenService.clearToken();
    this.setState({ user: null, profile: null });
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");
  };

  fetchProfile = async (): Promise<void> => {
    this.setState({ isLoading: true, error: null });
    try {
      const userProfile = await authService.getProfile();
      this.setState({ profile: userProfile });
      localStorage.setItem("userName", userProfile.name);
      if (userProfile.photo) {
        localStorage.setItem("userImage", userProfile.photo);
      }
    } catch (error: any) {
      this.setState({ error: error.message || "Gagal mengambil profil" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  updateUserProfile = async (data: FormData): Promise<void> => {
    this.setState({ isLoading: true, error: null });
    try {
      await authService.updateProfile(data);
      await this.fetchProfile();
    } catch (error: any) {
      this.setState({ error: error.message || "Gagal memperbarui profil" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePassword = async (data: UpdatePasswordRequest): Promise<void> => {
    this.setState({ isLoading: true, error: null });
    try {
      await authService.changePassword(data);
    } catch (error: any) {
      this.setState({ error: error.message || "Gagal ganti password" });
      throw error;
    } finally {
      this.setState({ isLoading: false });
    }
  };
}

export const useAuthStore = create<AuthStore>((set, get) => {
  const store = new AuthStore(set, get);
  return store;
});
