import { create } from "zustand";
import {
    getPortfolios,
    getPortfolioById,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    getPublicPortfolio,
    getPublicPortfolioById,
} from "../services/portfolioService";
import { PortfolioItem } from "../interfaces/portfolio";

interface PortfolioState {
    portfolios: PortfolioItem[];
    selectedPortfolio: PortfolioItem | null;
    isLoading: boolean;
    error: string | null;

    fetchPortfolios: () => Promise<void>;
    addPortfolio: (data: FormData) => Promise<void>;
    updatePortfolio: (id: string, data: FormData) => Promise<void>;
    fetchPortfolioById: (id: string) => Promise<void>;
    deletePortfolio: (id: string) => Promise<void>; 

    fetchPublicPortfolios: () => Promise<void>;
    fetchPublicPorfolioById: (id: string) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    publicPortfolios: [],
    portfolios: [],
    selectedPortfolio: null,
    isLoading: false,
    error: null,

    fetchPortfolios: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await getPortfolios();
            set({ portfolios: data });
        } catch (error: any) {
            set({ error: error.message || "Gagal mengambil data portfolio" });
        } finally {
            set({ isLoading: false });
        }
    },

    addPortfolio: async (data: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const newPortfolio = await createPortfolio(data);
            set((state) => ({
                portfolios: [newPortfolio, ...state.portfolios],
            }));
        } catch (error: any) {
            set({ error: error.message || "Gagal menambahkan portfolio" });
        } finally {
            set({ isLoading: false });
        }
    },

    updatePortfolio: async (id, data: FormData) => {
        set({ isLoading: true, error: null });
        try {
            const updated = await updatePortfolio(id, data);
            set((state) => ({
                portfolios: state.portfolios.map((p) =>
                    p.portfolio_id === id ? updated : p
                ),
            }));
        } catch (error: any) {
            set({ error: error.message || "Gagal memperbarui portfolio" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchPortfolioById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const portfolio = await getPortfolioById(id);
            set({ selectedPortfolio: portfolio });
        } catch (error: any) {
            set({ error: error.message || "Gagal mengambil detail portfolio" });
        } finally {
            set({ isLoading: false });
        }
    },

    deletePortfolio: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await deletePortfolio(id);
            set((state) => ({
                portfolios: state.portfolios.filter((p) => p.portfolio_id !== id),
            }));
        } catch (error: any) {
            set({ error: error.message || "Gagal menghapus portfolio" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchPublicPortfolios: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await getPublicPortfolio();
            set({ portfolios: data });
        } catch (error: any) {
            set({ error: error.message || "Gagal mengambil galeri publik" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchPublicPorfolioById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const data = await getPublicPortfolioById(id);
            set({ selectedPortfolio: data });
        } catch (error: any) {
            set({ error: error.message || "Gagal mengambil detail galeri publik" });
        } finally {
            set({ isLoading: false });
        }
    },
}));
