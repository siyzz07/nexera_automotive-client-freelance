import { authAxiosInstance } from "../../config/axiosConfig";

export const addCarListing = async (formData: FormData) => {
  return await authAxiosInstance.post('car/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllCars = async () => {
  return await authAxiosInstance.get('car');
};

export const getCarById = async (id: string) => {
  return await authAxiosInstance.get(`car/${id}`);
};

export const updateCarListing = async (id: string, formData: FormData) => {
  return await authAxiosInstance.put(`car/${id}/update`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
