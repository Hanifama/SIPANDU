// services/tokenService.ts
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  user_id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export const tokenService = {
  setToken: (token: string | null) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  },

  getToken: (): string | null => localStorage.getItem("token"),

  clearToken: () => {
    localStorage.removeItem("token");
  },

  decodeToken: (): DecodedToken | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      return jwtDecode<DecodedToken>(token); // cast ke DecodedToken
    } catch (error) {
      console.error("Invalid token format");
      return null;
    }
  },
};
