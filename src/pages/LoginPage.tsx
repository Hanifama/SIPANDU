import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthStore } from "../store/useAuthStore";
import { tokenService } from "../services/tokenService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginUser, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false); // state toggle password

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.email) newErrors.email = "Email wajib diisi";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Format email tidak valid";
    if (!formData.password) newErrors.password = "Password wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await loginUser(formData);
      const role = tokenService.decodeToken()?.role;

      toast.success("Login berhasil, Silahkan Masuk!", {
        position: "top-right",
        autoClose: 2000,
      });

      // load 2 seccon autoClose
      setTimeout(() => {
        // if (role === "admin") navigate("/dashboard");
        if (role === "admin") navigate("/dashboard/employee/acc");
        else if (role === "employee") navigate("/dashboard/employee");
        else navigate("/login");
      }, 2000);
    } catch (err: any) {
      toast.error(err.message || "Login gagal", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#dbeafe] via-white to-[#bfdbfe] px-4">
      <div className="bg-white shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="mx-auto h-16 w-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Selamat Datang!</h1>
          <p className="text-sm text-gray-500 mt-1">
            Silakan masuk untuk melanjutkan
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mt-2">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400 w-5 h-5" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@email.com"
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition duration-200 ease-in-out focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400 w-5 h-5" />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} // toggle password
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className={`w-full pl-10 pr-10 py-2 rounded-lg border transition duration-200 ease-in-out focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-400 w-5 h-5" />
                ) : (
                  <Eye className="text-gray-400 w-5 h-5" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
            }`}
          >
            {isLoading ? "Sedang masuk..." : "Masuk"}
          </button>

          {/* <div className="text-center text-sm mt-5">
            Belum punya akun?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Daftar
            </a>
          </div> */}
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
