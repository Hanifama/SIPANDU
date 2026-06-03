// src/pages/UserManagement.tsx

import { useEffect, useRef, useState } from "react";
import { X, Users, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import CustomTable from "../components/dashboard/_shared/CustomTable";

import { Button, IconButton, TextField, InputAdornment } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../store/useUserStore";

const columns = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "name", label: "Nama", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "phone_number", label: "No. Telepon", minWidth: 130 },
];

const UserManagement = () => {
  const navigate = useNavigate();
  const { users, fetchUsers, deleteUser, isLoading } = useUserStore();

  const [search, setSearch] = useState("");
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (!isFetchedRef.current) {
      fetchUsers();
      isFetchedRef.current = true;
    }
  }, [fetchUsers]);

  const handleSearch = () => {
    fetchUsers(search.trim() || undefined);
  };

  const handleDelete = async (row: any) => {
    const confirmDelete = window.confirm(
      `Yakin ingin menghapus user "${row.name}"?`
    );
    if (!confirmDelete) return;

    try {
      await deleteUser(row.user_id);
      fetchUsers(search.trim() || undefined);
      toast.success("User berhasil dihapus!");
    } catch (err) {
      console.error("Gagal hapus user:", err);
      toast.error("Gagal menghapus user.");
    }
  };

  const handleEdit = (row: any) => navigate(`/users/edit/${row.user_id}`);
  const handleDetail = (row: any) => navigate(`/users/detail/${row.user_id}`);
  const handleCreate = () => navigate("/users/create");

  const rows = users.map((user, index) => ({
    user_id: user.user_id,
    no: index + 1,
    name: user.name,
    email: user.email,
    role: user.role,
    phone_number: user.phone_number || "-",
  }));

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-slate-700 flex items-center gap-2">
            <Users size={22} className="text-red-600" /> User Management
          </h1>
          <Button
            onClick={handleCreate}
            variant="contained"
            startIcon={<Plus size={18} />}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Tambah User
          </Button>
        </div>

        {/* 🔍 Search Bar */}
        <div className="mb-4">
          <TextField
            size="small"
            placeholder="Cari user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSearch("");
                      fetchUsers();
                    }}
                  >
                    <X size={16} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: 300, backgroundColor: "white", borderRadius: 1 }}
          />
        </div>

        <CustomTable
          title="Daftar User"
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          onDetail={handleDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
