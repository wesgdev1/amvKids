import { instance as http } from "../http";

export const signUp = async (payload) => {
  try {
    const { data: response } = await http.post("/users/signup", payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signIn = async (payload) => {
  try {
    const { data: response } = await http.post("/users/signin", payload);
    return { data: response.data, meta: response.meta };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createUsers = async (payload) => {
  try {
    const { data: response } = await http.post("/users/create", payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const myProfile = async (id) => {
  console.log("idApi", id);
  try {
    const { data: response } = await http.post(`/users/myProfile`, { id });
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePassword = async (payload) => {
  try {
    const { data: response } = await http.put(
      "/users/auth/change-password",
      payload
    );
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
