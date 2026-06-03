import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
    TextField,
    Button,
    CircularProgress,
    Typography,
    Box,
} from "@mui/material";

import { useServiceStore } from "../../store/useFeatureStore";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import { ServiceFormData } from "../../interfaces/feature";
import { toast } from "react-toastify";

const ServiceForm = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const isEdit = location.pathname.includes("/edit");
    const isDetail = location.pathname.includes("/detail");

    const {
        selectedService,
        fetchServiceById,
        addService,
        updateService,
        isLoading,
    } = useServiceStore();

    const [form, setForm] = useState<ServiceFormData>({
        name: "",
        tagline: "",
        description: "",
        icon: null,
        package_1_name: "",
        package_1_price: "",
        package_2_name: "",
        package_2_price: "",
        package_3_name: "",
        package_3_price: "",
    });

    const [previewIcon, setPreviewIcon] = useState<string | null>(null);

    useEffect(() => {
        if (form.icon) {
            const fileUrl = URL.createObjectURL(form.icon);
            setPreviewIcon(fileUrl);

            return () => URL.revokeObjectURL(fileUrl); // cleanup
        } else if (selectedService?.icon && (isEdit || isDetail)) {
            setPreviewIcon(selectedService.icon); // dari backend
        }
    }, [form.icon, selectedService]);



    useEffect(() => {
        if ((isEdit || isDetail) && id) {
            fetchServiceById(id);
        }
    }, [id]);

    useEffect(() => {
        if (selectedService && (isEdit || isDetail)) {
            setForm({
                ...form,
                name: selectedService.name,
                tagline: selectedService.tagline || "",
                description: selectedService.description || "",
                package_1_name: selectedService.package_1_name || "",
                package_1_price: selectedService.package_1_price?.toString() || "",
                package_2_name: selectedService.package_2_name || "",
                package_2_price: selectedService.package_2_price?.toString() || "",
                package_3_name: selectedService.package_3_name || "",
                package_3_price: selectedService.package_3_price?.toString() || "",
                icon: null, // file input kosong
            });
        }
    }, [selectedService]);

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
        formData.append("tagline", form.tagline);
        formData.append("description", form.description);
        if (form.icon) formData.append("icon", form.icon);

        if (form.package_1_name) formData.append("package_1_name", form.package_1_name);
        if (form.package_1_price) formData.append("package_1_price", form.package_1_price);
        if (form.package_2_name) formData.append("package_2_name", form.package_2_name);
        if (form.package_2_price) formData.append("package_2_price", form.package_2_price);
        if (form.package_3_name) formData.append("package_3_name", form.package_3_name);
        if (form.package_3_price) formData.append("package_3_price", form.package_3_price);

        try {
            if (isEdit && id) {
                await updateService(id, formData);
                toast.success("Layanan berhasil diperbarui!");
            } else {
                await addService(formData);
                toast.success("Layanan berhasil ditambahkan!");
            }

            // Delay 2 detik sebelum redirect
            setTimeout(() => {
                navigate("/dashboard/layanan");
            }, 1000);
        } catch (err) {
            console.error("Submit failed:", err);
            toast.error("Gagal menyimpan layanan. Silakan coba lagi.");
        }
    };


    return (
        <DashboardLayout>
            <Box mx="auto">
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h5" fontWeight="bold">
                        {isDetail ? "Detail Layanan" : isEdit ? "Edit Layanan" : "Tambah Layanan"}
                    </Typography>

                    <Button
                        variant="text"
                        onClick={() => navigate(-1)}
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
                            label="Nama Layanan"
                            name="name"
                            variant="outlined"
                            value={form.name}
                            onChange={handleChange}
                            fullWidth
                            disabled={isDetail}
                        />

                        <TextField
                            label="Tagline"
                            name="tagline"
                            variant="outlined"
                            value={form.tagline}
                            onChange={handleChange}
                            fullWidth
                            disabled={isDetail}
                        />

                        <TextField
                            label="Deskripsi"
                            name="description"
                            variant="outlined"
                            value={form.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            fullWidth
                            disabled={isDetail}
                        />

                        {/* Custom Upload */}
                        <Box>
                            {!isDetail && (
                                <Button variant="outlined" component="label">
                                    Upload Icon
                                    <input
                                        type="file"
                                        name="icon"
                                        hidden
                                        onChange={handleChange}
                                        accept="image/*"
                                    />
                                </Button>
                            )}

                            {previewIcon && (
                                <Box mt={2}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Preview Icon:
                                    </Typography>
                                    <Box
                                        component="img"
                                        src={previewIcon}
                                        alt="Preview Icon"
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 2,
                                            objectFit: "cover",
                                            boxShadow: 2,
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>

                        {/* Packages */}
                        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={2}>
                            <TextField
                                label="Paket 1 - Nama"
                                name="package_1_name"
                                value={form.package_1_name}
                                onChange={handleChange}
                                fullWidth
                                disabled={isDetail}
                            />
                            <TextField
                                label="Paket 1 - Harga"
                                name="package_1_price"
                                value={form.package_1_price}
                                onChange={handleChange}
                                fullWidth
                                disabled={isDetail}
                            />
                        </Box>

                        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={2}>
                            <TextField
                                label="Paket 2 - Nama"
                                name="package_2_name"
                                value={form.package_2_name}
                                onChange={handleChange}
                                fullWidth
                                disabled={isDetail}
                            />
                            <TextField
                                label="Paket 2 - Harga"
                                name="package_2_price"
                                value={form.package_2_price}
                                onChange={handleChange}
                                fullWidth
                                disabled={isDetail}
                            />
                        </Box>

                        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
                            <TextField
                                label="Paket 3 - Nama"
                                name="package_3_name"
                                value={form.package_3_name}
                                onChange={handleChange}
                                fullWidth
                                disabled={isDetail}
                            />
                            <TextField
                                label="Paket 3 - Harga"
                                name="package_3_price"
                                value={form.package_3_price}
                                onChange={handleChange}
                                fullWidth
                                disabled={isDetail}
                            />
                        </Box>

                        {/* Submit */}
                        {!isDetail && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{ borderRadius: 2, mt: 2 }}
                            >
                                {isEdit ? "Update Layanan" : "Simpan Layanan"}
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
        </DashboardLayout>
    );
};

export default ServiceForm;
