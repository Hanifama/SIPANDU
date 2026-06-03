import { useEffect, useRef } from "react";
import { ServerCog, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import CustomTable from "../components/dashboard/_shared/CustomTable";

import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useServiceStore } from "../store/useFeatureStore";

const columns = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "name", label: "Nama Layanan", minWidth: 150 },
  { id: "tagline", label: "Tagline", minWidth: 150 },
];

const ServiceManagement = () => {
  const navigate = useNavigate();

  const {
    services,
    fetchServices,
    deleteService,
  } = useServiceStore();

  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (!isFetchedRef.current) {
      fetchServices();
      isFetchedRef.current = true;
    }
  }, []);

  const handleDelete = async (row: any) => {
    const confirmDelete = window.confirm(`Yakin ingin menghapus layanan "${row.name}"?`);
    if (!confirmDelete) return;

    try {
      await deleteService(row.service_id);
      fetchServices();
      toast.success("Layanan berhasil dihapus!");
    } catch (err) {
      console.error("Gagal hapus layanan:", err);
      toast.error("Gagal menghapus layanan.");
    }
  };

  const handleEdit = (row: any) => {
    navigate(`/layanan/edit/${row.service_id}`);
  };

  const handleDetail = (row: any) => {
    navigate(`/layanan/detail/${row.service_id}`);
  };

  const handleCreate = () => {
    navigate("/layanan/create");
  };

  const rows = services.map((service, index) => ({
    service_id: service.service_id, // penting!
    no: index + 1,
    name: service.name,
    tagline: service.tagline,
    package_1_price: `Rp ${service.package_1_price?.toLocaleString("id-ID") || "-"}`,
  }));


  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-slate-700 flex items-center gap-2">
            <ServerCog size={22} className="text-blue-600" /> Manajemen Layanan
          </h1>
          <Button
            onClick={handleCreate}
            variant="contained"
            startIcon={<Plus size={18} />}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Tambah Layanan
          </Button>
        </div>

        <CustomTable
          title="Daftar Layanan"
          columns={columns}
          rows={rows}
          isLoading={false}
          onDetail={handleDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default ServiceManagement;
