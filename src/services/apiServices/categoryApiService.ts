
import { authAxiosInstance } from "../../config/axiosConfig";

export const getCategories = async () => {
  return await authAxiosInstance.get('category');
};

export const addCategory = async (data: { name: string; parentCategory?: string | null; description?: string }) => {
  return await authAxiosInstance.post('category', data);
};

export const updateCategory = async (id: string, data: { name?: string; isActive?: boolean; description?: string }) => {
  return await authAxiosInstance.put(`category/${id}`, data);
};

export const deleteCategory = async (id: string) => {
  return await authAxiosInstance.delete(`category/${id}`);
};
