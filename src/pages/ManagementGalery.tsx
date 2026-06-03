// Import React hooks dan icon
import { useState, useEffect, useRef } from "react";
import { Image, Plus } from "lucide-react";

// Import layout dan komponen internal
import DashboardLayout from "../components/layouts/Dashboard/DashboardLayout";
import CustomTable from "../components/dashboard/_shared/CustomTable";
import GalleryModal from "../components/modal/Gallery/GalleryActionModal";

// Import store dan tipe data
import { useGalleryStore } from "../store/useGalleryStore";
import { CreateGalleryRequest } from "../interfaces/gallery";

// UI component
import { Button } from "@mui/material";

// Toast component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Kolom untuk tabel
const columns = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "title", label: "Judul", minWidth: 150 },
  { id: "created_dt", label: "Dibuat Pada", minWidth: 150 },
];

const GaleryManagement = () => {
  // Ambil data & fungsi dari global state (Zustand)
  const {
    galleries,
    fetchGalleries,
    isLoading,
    error,
    addGallery,
    updateGallery,
    fetchGalleryById,
    deleteGallery,
    selectedGallery,
  } = useGalleryStore();

  // State lokal untuk modal dan submit
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "create" | "edit">("view");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mencegah pemanggilan fetchGalleries berkali-kali
  const isFetchedRef = useRef(false);

  // Fetch galeri saat komponen pertama kali mount
  useEffect(() => {
    if (!isFetchedRef.current) {
      fetchGalleries();
      isFetchedRef.current = true;
    }
  }, []);

  // Handler hapus galeri
  const handleDelete = async (row: any) => {
    const gallery = galleries.find(
      (g) => g.name === row.title && g.created_dt === row.created_dt
    );
    if (!gallery) return;

    const confirmDelete = window.confirm(`Yakin ingin menghapus galeri "${gallery.name}"?`);
    if (!confirmDelete) return;

    try {
      await deleteGallery(gallery.gallery_id);
      fetchGalleries();
      toast.success("Galeri berhasil dihapus!");
    } catch (err) {
      console.error("Gagal hapus galeri:", err);
    }
  };

  // Handler edit galeri
  const handleEdit = async (row: any) => {
    const gallery = galleries.find(
      (g) => g.name === row.title && g.created_dt === row.created_dt
    );
    if (gallery) {
      await fetchGalleryById(gallery.gallery_id);
      setModalMode("edit");
      setOpenModal(true);
    }
  };

  // Handler lihat detail galeri
  const handleDetail = async (row: any) => {
    const gallery = galleries.find(
      (g) => g.name === row.title && g.created_dt === row.created_dt
    );
    if (gallery) {
      await fetchGalleryById(gallery.gallery_id);
      setModalMode("view");
      setOpenModal(true);
    }
  };

  // Handler tombol tambah galeri
  const handleCreate = () => {
    setModalMode("create");
    setOpenModal(true);
  };

  // Handler submit form (create/edit)
  const handleSubmit = async (formData: { name: string; alt: string; image: File | null }) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const form = {
        name: formData.name,
        alt: formData.alt,
        image: formData.image,
      };

      if (modalMode === "create") {
        if (!form.image) {
          toast.error("Gambar wajib diunggah!");
          return;
        }
        await addGallery(form as CreateGalleryRequest);
        toast.success("Galeri berhasil ditambahkan!");
      } else if (modalMode === "edit" && selectedGallery) {
        await updateGallery(selectedGallery.gallery_id, form);
        toast.success("Galeri berhasil diperbarui!");
      }

      setOpenModal(false);
      setTimeout(() => fetchGalleries(), 300);
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mapping data galeri ke format baris tabel
  const rows = galleries.map((gallery, index) => ({
    no: index + 1,
    title: gallery.name,
    created_dt: gallery.created_dt,
  }));

  return (
    <DashboardLayout>
      <div className="mb-6">
        {/* Header & Tombol Tambah */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-slate-700 flex items-center gap-2">
            <Image size={22} className="text-purple-600" /> Manajemen Galeri
          </h1>
          <Button
            onClick={handleCreate}
            variant="contained"
            startIcon={<Plus size={18} />}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Tambah Galeri
          </Button>
        </div>

        {/* Error jika ada */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Tabel Daftar Galeri */}
        <CustomTable
          title="Daftar Galeri"
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          onDetail={handleDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal Tambah/Edit/Detail */}
      <GalleryModal
        open={openModal}
        mode={modalMode}
        onClose={() => {
          setOpenModal(false);
          setModalMode("view");
        }}
        data={
          selectedGallery
            ? {
              title: selectedGallery.name,
              alt: selectedGallery.alt,
              created_dt: selectedGallery.created_dt,
              image: selectedGallery.image_url,
            }
            : null
        }
        onSubmit={handleSubmit}
      />      

    </DashboardLayout>
  );
};

export default GaleryManagement;
