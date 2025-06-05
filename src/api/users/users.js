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

export const updatePhotoUserProfile = async (userId, payload) => {
  try {
    const { data: response, status } = await http.patch(
      `/users/${userId}`,
      payload
    );
    return { data: response.data, status };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editUserCreateDirection = async (payload) => {
  try {
    const { data: response, status } = await http.post(`/directions`, payload);

    return { data: response.data, status };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteDirection = async (directionId) => {
  try {
    const { data: response, status } = await http.delete(
      `/directions/${directionId}`
    );
    return { data: response.data, status };
  } catch (error) {
    return Promise.reject(error);
  }
};
