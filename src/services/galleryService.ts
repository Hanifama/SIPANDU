// Import konfigurasi axios dari utils dan tipe data galeri
import api from "../utils/api";
import {
  GalleryItem,
  CreateGalleryRequest,
  CreateGalleryResponse,
} from "../interfaces/gallery";

/**
 * Mengambil daftar semua galeri dari server
 * Endpoint: GET /galleries
 */
export const getGalleries = async (): Promise<GalleryItem[]> => {
  try {
    const response = await api.get("/galleries");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Gagal mengambil data galeri");
  }
};

/**
 * Menambahkan galeri baru ke server
 * - Menggunakan FormData karena termasuk upload gambar
 * - Endpoint: POST /galleries
 */
export const createGallery = async (
  galleryData: CreateGalleryRequest
): Promise<CreateGalleryResponse> => {
  try {
    const formData = new FormData();
    formData.append("name", galleryData.name);
    formData.append("alt", galleryData.alt);
    formData.append("image", galleryData.image);

    const response = await api.post("/galleries", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Gagal menambahkan galeri");
  }
};

/**
 * Mengambil detail galeri berdasarkan ID
 * Endpoint: GET /galleries/:id
 */
export const getGalleryById = async (
  galleryId: string
): Promise<GalleryItem> => {
  try {
    const response = await api.get(`/galleries/${galleryId}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Gagal mengambil detail galeri");
  }
};

/**
 * Menghapus galeri berdasarkan ID
 * Endpoint: DELETE /galleries/:id
 */
export const deleteGallery = async (galleryId: string): Promise<void> => {
  try {
    await api.delete(`/galleries/${galleryId}`);
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Gagal menghapus galeri");
  }
};

/**
 * Mengupdate galeri berdasarkan ID
 * - Jika ada gambar, dikirim sebagai FormData
 * - Endpoint: POST /galleries/:id
 */
export const updateGallery = async (
  galleryId: string,
  galleryData: { name: string; alt: string; image?: File | null }
): Promise<GalleryItem> => {
  try {
    const formData = new FormData();
    formData.append("name", galleryData.name);
    formData.append("alt", galleryData.alt);
    if (galleryData.image) {
      formData.append("image", galleryData.image);
    }

    const response = await api.post(`/galleries/${galleryId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Gagal mengedit galeri");
  }
};

export const getPublicGalleries = async (): Promise<GalleryItem[]> => {
  const response = await api.get("/public/galleries");
  return response.data.data;
};

export const getPublicGalleryById = async (id: string): Promise<GalleryItem> => {
  const response = await api.get(`/public/galleries/${id}`);
  return response.data.data;
};



