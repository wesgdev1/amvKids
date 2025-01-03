import { instance as http } from "../http";

export const getUsers = async () => {
  try {
    const { data: response } = await http.get("/users/getAll");
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
