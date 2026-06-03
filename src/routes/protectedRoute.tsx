import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { tokenService } from "../services/tokenService";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [hasShownToast, setHasShownToast] = useState(false);

  const token = tokenService.getToken();
  const decoded: any = token ? tokenService.decodeToken() : null;

  useEffect(() => {
    if (!token) {
      setIsChecking(false);
      return;
    }

    // pengecekan expired
    const now = Math.floor(Date.now() / 1000);
    if (decoded?.exp && decoded.exp < now) {
      tokenService.clearToken(); // hapus token biar bersih
      toast.error("Sesi kamu sudah habis, silakan login kembali", {
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);

      setIsChecking(false);
      return;
    }

    // pengecekan role
    if (decoded && !roles.includes(decoded.role) && !hasShownToast) {
      setHasShownToast(true);

      toast.error("Tidak punya akses ke halaman ini", {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }

    setIsChecking(false);
  }, [token, decoded, roles, navigate, hasShownToast]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isChecking) {
    return null;
  }

  if (!decoded || !roles.includes(decoded.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
