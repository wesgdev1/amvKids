import { instance as http } from "../http";

export const getCountUsers = async () => {
  try {
    const { data: response } = await http.get(`/users/countUser`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getCountModels = async () => {
  try {
    const { data: response } = await http.get(`/models/count`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getCountPairs = async () => {
  try {
    const { data: response } = await http.get(`/stocks/countPairs`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCountCategories = async () => {
  try {
    const { data: response } = await http.get(`/products/countProducts`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
