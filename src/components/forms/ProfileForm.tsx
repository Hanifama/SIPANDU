import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";

const ProfileForm = () => {
  const navigate = useNavigate();
  const { profile, fetchProfile, updateUserProfile, isLoading } = useAuthStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    phone_number: "",
    lat: "",
    lng: "",
    photo: null as File | null,
  });

  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        location: profile.location || "",
        phone_number: profile.phone_number || "",
        lat: profile.lat || "",
        lng: profile.lng || "",
        photo: null,
      });

      setPreviewPhoto(profile.photo || null);
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      const fileUrl = URL.createObjectURL(files[0]);
      setPreviewPhoto(fileUrl);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("location", form.location);
    formData.append("phone_number", form.phone_number);
    formData.append("lat", form.lat);
    formData.append("lng", form.lng);
    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      await updateUserProfile(formData);
      toast.success("Profil berhasil diperbarui!");
      navigate("/profile");
    } catch (error) {
      toast.error("Gagal memperbarui profil.");
    }
  };

  return (
    <DashboardLayout>
      <Box mx="auto">
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Edit Profil
          </Typography>
          <Button onClick={() => navigate(-1)} variant="text">
            ← Kembali
          </Button>
        </Box>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Nama Lengkap"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Lokasi"
              name="location"
              value={form.location}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="No. Telepon"
              name="phone_number"
              value={form.phone_number}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Latitude"
              name="lat"
              value={form.lat}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Longitude"
              name="lng"
              value={form.lng}
              onChange={handleChange}
              fullWidth
            />

            <Button variant="outlined" component="label">
              Upload Foto
              <input
                type="file"
                name="photo"
                accept="image/*"
                hidden
                onChange={handleChange}
              />
            </Button>

            {previewPhoto && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Preview:
                </Typography>
                <img
                  src={previewPhoto}
                  alt="Preview"
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #ccc",
                  }}
                />
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ borderRadius: 2 }}
            >
              Simpan Perubahan
            </Button>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
};

export default ProfileForm;
