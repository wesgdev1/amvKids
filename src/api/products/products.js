import { instance as http } from "../http";

export const getAllProducts = async () => {
  try {
    const { data: response } = await http.get("/products");
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createProduct = async (payload) => {
  try {
    const { data: response } = await http.post("/products", payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProduct = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/products/${id}`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductById = async (id) => {
  try {
    const { data: response } = await http.get(`/products/${id}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
