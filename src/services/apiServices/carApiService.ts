import { authAxiosInstance } from "../../config/axiosConfig";

export const addCarListing = async (formData: FormData) => {
  return await authAxiosInstance.post('car/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllCars = async (page: number = 1, limit: number = 8, filters: any = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...Object.entries(filters).reduce((acc: any, [key, value]) => {
      if (value && value !== 'All') acc[key] = value;
      return acc;
    }, {})
  }).toString();
  
  return await authAxiosInstance.get(`car?${queryParams}`);
};

export const getSearchFilters = async () => {
  return await authAxiosInstance.get('car/filters');
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

export const updateCarStatus = async (id: string, status: string) => {
  return await authAxiosInstance.patch(`car/${id}/status`, { status });
};

export const deleteCarListing = async (id: string) => {
  return await authAxiosInstance.delete(`car/${id}/delete`);
};
