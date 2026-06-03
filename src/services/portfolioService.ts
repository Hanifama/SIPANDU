import { PortfolioItem } from "../interfaces/portfolio";
import api from "../utils/api";


export const getPortfolios = async (): Promise<PortfolioItem[]> => {
  const response = await api.get("/portfolios");
  return response.data.data;
};

export const getPortfolioById = async (id: string): Promise<PortfolioItem> => {
  const response = await api.get(`/portfolios/${id}`);
  return response.data.data;
};

export const createPortfolio = async (data: FormData): Promise<PortfolioItem> => {
  const response = await api.post("/portfolios", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
};

export const updatePortfolio = async (
  id: string,
  data: FormData
): Promise<PortfolioItem> => {
  const response = await api.post(`/portfolios/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
};

export const deletePortfolio = async (id: string): Promise<void> => {
  await api.delete(`/portfolios/${id}`);
};


export const getPublicPortfolio = async (): Promise<PortfolioItem[]> => {
  const response = await api.get("/public/portfolios");
  return response.data.data;
};

export const getPublicPortfolioById = async (id: string): Promise<PortfolioItem> => {
  const response = await api.get(`/public/portfolios/${id}`);
  return response.data.data;
};