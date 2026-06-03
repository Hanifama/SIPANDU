import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Avatar,
  Divider,
} from "@mui/material";

// Props yang diterima oleh modal
interface GalleryModalProps {
  open: boolean;
  mode: "view" | "create" | "edit";
  onClose: () => void;
  onSubmit?: (data: { name: string; alt: string; image: File | null }) => void;
  data?: {
    title: string;
    alt: string;
    created_dt: string;
    image: string;
  } | null;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  open,
  mode,
  onClose,
  onSubmit,
  data,
}) => {
  const isView = mode === "view";
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    name: "",
    alt: "",
    image: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  // Isi ulang form saat modal dibuka berdasarkan mode dan data
  useEffect(() => {
    if ((isEdit || isView) && data) {
      setForm({ name: data.title, alt: data.alt, image: null });
      setPreview(data.image);
    } else if (mode === "create") {
      setForm({ name: "", alt: "", image: null });
      setPreview(null);
    }
  }, [mode, data, open]);

  // Handler input teks
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        alt: mode === "create" ? value : prev.alt,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handler file upload & preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Trigger submit dari parent
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(form);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        {isView ? "Detail Galeri" : isEdit ? "Edit Galeri" : "Tambah Galeri"}
      </DialogTitle>

      <DialogContent dividers>
        {isView ? (
          // Tampilan detail
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Judul</Typography>
              <Typography variant="body1" fontWeight="medium">{data?.title}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Deskripsi (Alt Text)</Typography>
              <Typography variant="body1" fontWeight="medium">{data?.alt}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Dibuat Pada</Typography>
              <Typography variant="body1" fontWeight="medium">{data?.created_dt}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Gambar</Typography>
              <img
                src={data?.image}
                alt={data?.alt}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        ) : (
          // Form input
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField fullWidth label="Judul" name="name" value={form.name} onChange={handleChange} />
            <TextField fullWidth label="Deskripsi Gambar (Alt Text)" name="alt" value={form.alt} onChange={handleChange} />
            {preview && (
              <Box display="flex" justifyContent="center" mt={1}>
                <Avatar variant="rounded" src={preview} alt="Preview" sx={{ width: 120, height: 120, borderRadius: 3 }} />
              </Box>
            )}
            <Button variant="outlined" component="label" sx={{ borderRadius: 2, textTransform: "none" }}>
              Upload Gambar
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ borderRadius: 2, textTransform: "none" }}>
          Tutup
        </Button>
        {!isView && (
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ borderRadius: 2, textTransform: "none" }}>
            Simpan
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GalleryModal;
