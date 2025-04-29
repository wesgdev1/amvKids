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
    const { data: response } = await http.get("/orders/myOrders");
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

export const getAllPreparer = async () => {
  try {
    const { data: response } = await http.get("/orders/preparer");
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

export const updateOrderState = async (id, payload) => {
  try {
    const { data: response } = await http.patch(`/orders/${id}`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateOrderStatePreparer = async (id, payload) => {
  try {
    const { data: response } = await http.patch(`/orders/${id}`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOrderById = async (id) => {
  try {
    const { data: response } = await http.get(`/orders/${id}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteOrder = async (id) => {
  try {
    const { data: response } = await http.delete(`/orders/${id}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateOrderItems = async (payload) => {
  try {
    const { data: response } = await http.put(`/orders/deleteItems`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
