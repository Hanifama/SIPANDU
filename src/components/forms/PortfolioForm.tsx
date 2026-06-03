import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import { toast } from "react-toastify";

const PortfolioForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.pathname.includes("/edit");
  const isDetail = location.pathname.includes("/detail");

  const {
    selectedPortfolio,
    fetchPortfolioById,
    addPortfolio,
    updatePortfolio,
    isLoading,
  } = usePortfolioStore();

  const [form, setForm] = useState({
    name: "",
    description: "",
    team: "",
    location: "",
    date: "",
    duration: "",
    cost: "",
    image: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (form.image) {
      const fileUrl = URL.createObjectURL(form.image);
      setPreviewImage(fileUrl);
      return () => URL.revokeObjectURL(fileUrl);
    } else if (selectedPortfolio?.image && (isEdit || isDetail)) {
      setPreviewImage(`/${selectedPortfolio.image}`);
    }
  }, [form.image, selectedPortfolio]);

  useEffect(() => {
    if ((isEdit || isDetail) && id) {
      fetchPortfolioById(id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedPortfolio && (isEdit || isDetail)) {
      setForm({
        name: selectedPortfolio.name || "",
        description: selectedPortfolio.description || "",
        team: selectedPortfolio.team || "",
        location: selectedPortfolio.location || "",
        date: selectedPortfolio.date || "",
        duration: selectedPortfolio.duration || "",
        cost: selectedPortfolio.cost || "",
        image: null,
      });
    }
  }, [selectedPortfolio]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("team", form.team);
    formData.append("location", form.location);
    formData.append("date", form.date);
    formData.append("duration", form.duration);
    formData.append("cost", form.cost);
    if (form.image) formData.append("image", form.image);

    try {
      if (isEdit && id) {
        await updatePortfolio(id, formData);
        toast.success("Portfolio berhasil diperbarui!");
      } else {
        await addPortfolio(formData);
        toast.success("Portfolio berhasil ditambahkan!");
      }

      setTimeout(() => navigate("/dashboard/portfolio"), 1000);
    } catch (err) {
      console.error("Submit failed:", err);
      toast.error("Gagal menyimpan portfolio.");
    }
  };

  return (
    <DashboardLayout>
      <Box mx="auto">
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            {isDetail
              ? "Detail Portfolio"
              : isEdit
              ? "Edit Portfolio"
              : "Tambah Portfolio"}
          </Typography>
          <Button onClick={() => navigate(-1)} variant="text" sx={{ textTransform: "none" }}>
            ← Kembali
          </Button>
        </Box>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box component="form" display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Project Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              disabled={isDetail}
            />
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              disabled={isDetail}
            />
            <TextField
              label="Team"
              name="team"
              value={form.team}
              onChange={handleChange}
              fullWidth
              disabled={isDetail}
            />
            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              fullWidth
              disabled={isDetail}
            />
            <TextField
              label="Date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              fullWidth
              disabled={isDetail}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Duration"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              fullWidth
              disabled={isDetail}
            />
            <TextField
              label="Cost"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              fullWidth
              disabled={isDetail}
            />

            {/* Upload Image */}
            {!isDetail && (
              <Button variant="outlined" component="label">
                Upload Gambar
                <input
                  type="file"
                  name="image"
                  hidden
                  accept="image/*"
                  onChange={handleChange}
                />
              </Button>
            )}
            {previewImage && (
              <Box mt={1}>
                <Typography variant="subtitle2" gutterBottom>
                  Preview:
                </Typography>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ width: 150, height: "auto", borderRadius: 8, objectFit: "cover", border: "1px solid #ccc" }}
                />
              </Box>
            )}

            {!isDetail && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ borderRadius: 2 }}
              >
                {isEdit ? "Update Portfolio" : "Simpan Portfolio"}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default PortfolioForm;
