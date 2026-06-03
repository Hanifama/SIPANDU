import { create } from "zustand";
import { IUser } from "../interfaces/user";
import { userService } from "../services/userService";

interface UserState {
  users: IUser[];
  selectedUser: IUser | null;
  isLoading: boolean;
  error: string | null;

  fetchUsers: (search?: string) => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  createUser: (data: FormData | Partial<IUser>) => Promise<void>;
  updateUser: (id: string, data: FormData | Partial<IUser>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,

  fetchUsers: async (search) => {
    set({ isLoading: true, error: null });
    try {
      const data = await userService.getAllUsers(search);
      set({ users: data });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil data user" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await userService.getUserById(id);
      set({ selectedUser: data });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil detail user" });
    } finally {
      set({ isLoading: false });
    }
  },

  createUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const newUser = await userService.createUser(userData);
      set({ users: [...get().users, newUser] }); // update list user
    } catch (error: any) {
      set({ error: error.message || "Gagal menambahkan user" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (id, userData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await userService.updateUser(id, userData);
      set({
        users: get().users.map((u) => (u.user_id === id ? updatedUser : u)),
        selectedUser: updatedUser,
      });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengupdate user" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await userService.deleteUser(id);
      set({ users: get().users.filter((u) => u.user_id !== id) });
    } catch (error: any) {
      set({ error: error.message || "Gagal menghapus user" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
