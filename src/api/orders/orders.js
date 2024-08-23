import { instance as http } from "../http";

export const createOrder = async (payload) => {
  try {
    const { data: response } = await http.post("/orders", payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMyOrders = async () => {
  try {
    const { data: response } = await http.get("/orders");
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllOrders = async () => {
  try {
    const { data: response } = await http.get("/orders");
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateOrder = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/orders/${id}`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
