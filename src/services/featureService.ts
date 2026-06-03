import api from "../utils/api";
import {
  ServiceItem
} from "../interfaces/feature";

export const getServices = async (): Promise<ServiceItem[]> => {
  const response = await api.get("/services");
  return response.data.data;
};

export const getServiceById = async (id: string): Promise<ServiceItem> => {
  const response = await api.get(`/services/${id}`);
  return response.data.data;
};

export const createService = async (
  data: FormData
): Promise<ServiceItem> => {
  const response = await api.post("/services", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
};

export const updateService = async (
  id: string,
  data: FormData
): Promise<ServiceItem> => {
  const response = await api.post(`/services/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
};


export const deleteService = async (id: string): Promise<void> => {
  await api.delete(`/services/${id}`);
};

export const getPublicServices = async (): Promise<ServiceItem[]> => {
  const response = await api.get("/public/services");
  return response.data.data;
};

export const getPublicServiceById = async (id: string): Promise<ServiceItem> => {
  const response = await api.get(`/public/services/${id}`);
  return response.data.data;
};

