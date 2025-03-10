import { instance as http } from "../http";

export const getUsers = async () => {
  try {
    const { data: response } = await http.get("/users/getAll");
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editUser = async (user, payload) => {
  try {
    const { data: response, status } = await http.put(
      `/users/${user}`,
      payload
    );

    return { data: response.data, status };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOrdersByUser = async ({ userId }) => {
  try {
    const { data: response } = await http.get(`/orders/ordersByUser/${userId}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
