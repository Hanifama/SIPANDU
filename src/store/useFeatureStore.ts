import { create } from "zustand";
import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    getPublicServices,
    getPublicServiceById,
} from "../services/featureService";
import {
    ServiceItem,
} from "../interfaces/feature";

interface ServiceState {
    services: ServiceItem[];
    isLoading: boolean;
    error: string | null;
    selectedService: ServiceItem | null;

    fetchPublicServices: () => Promise<void>;
    fetchPublicServiceById: (id: string) => Promise<void>;

    fetchServices: () => Promise<void>;
    addService: (data: FormData) => Promise<void>;
    updateService: (id: string, data: FormData) => Promise<void>;
    fetchServiceById: (id: string) => Promise<void>;
    deleteService: (id: string) => Promise<void>;
}

export const useServiceStore = create<ServiceState>((set) => ({
    publicServices: [],
    services: [],
    isLoading: false,
    error: null,
    selectedService: null,

    fetchServices: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await getServices();
            set({ services: data });
        } catch (error: any) {
            set({ error: error.message || "Gagal mengambil data layanan" });
        } finally {
            set({ isLoading: false });
        }
    },

    addService: async (data: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const newService = await createService(data);
            set((state) => ({
                services: [newService, ...state.services],
            }));
        } catch (error: any) {
            set({ error: error.message || "Gagal menambahkan layanan" });
        } finally {
            set({ isLoading: false });
        }
    },

    updateService: async (id, data: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const updated = await updateService(id, data);
            set((state) => ({
                services: state.services.map((s) =>
                    s.service_id === id ? updated : s
                ),
            }));
        } catch (error: any) {
            set({ error: error.message || "Gagal memperbarui layanan" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchServiceById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const service = await getServiceById(id);
            set({ selectedService: service });
        } catch (error: any) {
            set({ error: error.message || "Gagal mengambil detail layanan" });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteService: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await deleteService(id);
            set((state) => ({
                services: state.services.filter((s) => s.service_id !== id),
            }));
        } catch (error: any) {
            set({ error: error.message || "Gagal menghapus layanan" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchPublicServices: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await getPublicServices();
            set({ services: data });
        } catch (error: any) {
            set({ error: error.message || "Gagal mengambil layanan publik" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchPublicServiceById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const data = await getPublicServiceById(id);
            set({ selectedService: data });
        } catch (error: any) {
            set({ error: error.message || "Gagal mengambil detail layanan publik" });
        } finally {
            set({ isLoading: false });
        }
    },
}));
