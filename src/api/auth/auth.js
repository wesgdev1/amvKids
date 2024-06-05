import { instance as http } from "../http";

export const signUp = async (payload) => {
  try {
    const { data: response } = await http.post("/users/signup", payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
