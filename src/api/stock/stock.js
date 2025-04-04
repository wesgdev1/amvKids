import { instance as http } from "../http";

export const createStock = async (payload) => {
  try {
    const { data: response } = await http.post("/stocks", payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateStock = async (payload) => {
  const { id } = payload;
  try {
    const { data: response } = await http.put(`/stocks/${id}`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
