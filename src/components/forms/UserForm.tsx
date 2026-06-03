// src/pages/UserForm.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import { useUserStore } from "../../store/useUserStore";

const UserForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.pathname.includes("/edit");
  const isDetail = location.pathname.includes("/detail");

  const { selectedUser, fetchUserById, createUser, updateUser, isLoading } =
    useUserStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "employee",
  });

  // Fetch data jika edit/detail
  useEffect(() => {
    if ((isEdit || isDetail) && id) {
      fetchUserById(id);
    }
  }, [id]);

  // Sinkronisasi data user ke state form
  useEffect(() => {
    if (selectedUser && (isEdit || isDetail)) {
      setForm({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        password: "",
        phone_number: selectedUser.phone_number || "",
        role: selectedUser.role || "employee",
      });
    }
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      email: form.email,
      ...(!isEdit && { password: form.password }), // password hanya saat create
      phone_number: form.phone_number,
      role: form.role as "admin" | "employee",
    };

    try {
      if (isEdit && id) {
        await updateUser(id, payload);
        toast.success("User berhasil diperbarui!");
      } else {
        await createUser(payload);
        toast.success("User berhasil ditambahkan!");
      }
      setTimeout(() => navigate("/dashboard/users"), 1000);
    } catch (err) {
      console.error("Submit failed:", err);
      toast.error("Gagal menyimpan user.");
    }
  };

  return (
    <DashboardLayout>
      <Box mx="auto">
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            {isDetail ? "Detail User" : isEdit ? "Edit User" : "Tambah User"}
          </Typography>
          <Button
            onClick={() => navigate(-1)}
            variant="text"
            sx={{ textTransform: "none" }}
          >
            ← Kembali
          </Button>
        </Box>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box component="form" display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Nama"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              disabled={isDetail}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              disabled={isDetail}
            />
            {!isEdit && (
              <TextField
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                disabled={isDetail}
              />
            )}
            <TextField
              label="No. Telepon"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              fullWidth
              disabled={isDetail}
            />
            <TextField
              select
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              disabled={isDetail}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </TextField>

            {!isDetail && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ borderRadius: 2 }}
              >
                {isEdit ? "Update User" : "Simpan User"}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default UserForm;
