import { instance as http } from "../http";
export const getAllInfluencers = async () => {
  try {
    const { data: response } = await http.get(`/influencers`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createInfluencer = async (payload) => {
  try {
    const { data: response } = await http.post(`/influencers`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateInfluencer = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/influencers/${id}`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getInfluencerById = async (id) => {
  try {
    const { data: response } = await http.get(`/influencers/${id}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteInfluencer = async (id) => {
  try {
    const { data: response } = await http.delete(`/influencers/${id}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
