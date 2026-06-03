// Import Zustand untuk membuat state global
import { create } from "zustand";

// Import service API galeri
import {
  getGalleries,
  createGallery,
  updateGallery,
  getGalleryById,
  deleteGallery,
  getPublicGalleryById,
  getPublicGalleries,
} from "../services/galleryService";

// Import tipe data galeri
import { GalleryItem, CreateGalleryRequest } from "../interfaces/gallery";

// Struktur dan tipe state galeri
interface GalleryState {
  galleries: GalleryItem[]; // daftar galeri
  isLoading: boolean; // indikator loading
  error: string | null; // pesan error
  selectedGallery: GalleryItem | null; // galeri yang sedang dipilih (untuk detail/edit)

  // Fungsi untuk manipulasi data galeri
  fetchGalleries: () => Promise<void>;
  addGallery: (data: CreateGalleryRequest) => Promise<void>;
  updateGallery: (
    id: string,
    data: { name: string; alt: string; image?: File | null }
  ) => Promise<void>;
  fetchGalleryById: (id: string) => Promise<void>;
  deleteGallery: (id: string) => Promise<void>;
  fetchPublicGalleries: () => Promise<void>;
  fetchPublicGalleryById: (id: string) => Promise<void>;
}

// Store Zustand utama untuk manajemen galeri
export const useGalleryStore = create<GalleryState>((set) => ({
  publicGalleries: [],
  galleries: [],
  isLoading: false,
  error: null,
  selectedGallery: null,

  // Ambil semua data galeri dari server
  fetchGalleries: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getGalleries();
      set({ galleries: data });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil data galeri" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Tambahkan galeri baru ke server dan update state lokal
  addGallery: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await createGallery(data);
      set((state) => ({
        galleries: [response.data, ...state.galleries],
      }));
    } catch (error: any) {
      set({ error: error.message || "Gagal menambahkan galeri" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Ambil detail galeri berdasarkan ID dan simpan ke selectedGallery
  fetchGalleryById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const gallery = await getGalleryById(id);
      set({ selectedGallery: gallery });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil detail galeri" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Hapus galeri dari server dan perbarui state lokal
  deleteGallery: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteGallery(id);
      set((state) => ({
        galleries: state.galleries.filter((g) => g.gallery_id !== id),
      }));
    } catch (error: any) {
      set({ error: error.message || "Gagal menghapus galeri" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Perbarui galeri berdasarkan ID di server dan sinkronkan ke state lokal
  updateGallery: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await updateGallery(id, data);
      set((state) => ({
        galleries: state.galleries.map((g) =>
          g.gallery_id === id ? updated : g
        ),
      }));
    } catch (error: any) {
      set({ error: error.message || "Gagal mengupdate galeri" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPublicGalleries: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getPublicGalleries();
      set({ galleries: data });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil galeri publik" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPublicGalleryById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getPublicGalleryById(id);
      set({ selectedGallery: data });
    } catch (error: any) {
      set({ error: error.message || "Gagal mengambil detail galeri publik" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
