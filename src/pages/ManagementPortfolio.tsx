import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Folder, Plus } from "lucide-react";
import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import CustomTable from "../components/dashboard/_shared/CustomTable";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { usePortfolioStore } from "../store/usePortfolioStore";

const columns = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "project", label: "Project Name", minWidth: 150 },
  { id: "team", label: "Team", minWidth: 100 },
];

const PortfolioManagement = () => {
  const navigate = useNavigate();
  const { portfolios, fetchPortfolios, deletePortfolio } = usePortfolioStore();
  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (!isFetchedRef.current) {
      fetchPortfolios();
      isFetchedRef.current = true;
    }
  }, []);

  const handleDelete = async (row: any) => {
    const confirm = window.confirm(`Yakin ingin menghapus project "${row.project}"?`);
    if (!confirm) return;

    try {
      await deletePortfolio(row.portfolio_id);
      fetchPortfolios();
      toast.success("Portfolio berhasil dihapus!");
    } catch (err) {
      console.error("Gagal hapus portfolio:", err);
      toast.error("Gagal menghapus portfolio.");
    }
  };

  const handleEdit = (row: any) => {
    navigate(`/portfolio/edit/${row.portfolio_id}`);
  };

  const handleDetail = (row: any) => {
    navigate(`/portfolio/detail/${row.portfolio_id}`);
  };

  const handleCreate = () => {
    navigate("/portfolio/create");
  };

  const rows = portfolios.map((item, index) => ({
    portfolio_id: item.portfolio_id, // penting untuk handleEdit/Delete
    no: index + 1,
    project: item.name,
    team: item.team || "-",
  }));

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-slate-700 flex items-center gap-2">
            <Folder size={22} className="text-green-600" /> Portfolio Management
          </h1>
          <Button
            onClick={handleCreate}
            variant="contained"
            startIcon={<Plus size={18} />}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Tambah Portfolio
          </Button>
        </div>

        <CustomTable
          title="Daftar Portfolio"
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

export default PortfolioManagement;
