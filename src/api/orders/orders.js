import { instance as http } from "../http";

export const createOrder = async (payload) => {
  try {
    const { data: response } = await http.post("/orders", payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createOrderWhitoutUser = async (payload) => {
  try {
    const { data: response } = await http.post(
      "/orders/createOrderWhitoutUser",
      payload
    );
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

export const getAllOrdersWithParams = async (payload) => {
  console.log("payload", payload);
  try {
    const { data: response } = await http.post("/orders/search", payload);
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

export const updateOrderItemsUnity = async (payload) => {
  try {
    const { data: response } = await http.put(
      `/orders/deleteItemsUnity`,
      payload
    );

    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const linkPago = async (payload) => {
  try {
    const { data: response } = await http.post(`/orders/pagos`, payload);
    console.log("response", response);
    return { response };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTotalDiscount = async (payload) => {
  try {
    const { data: response } = await http.put(`/orders/applyDiscount`, payload);

    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
