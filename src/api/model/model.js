import { instance as http } from "../http";

export const getAllModels = async () => {
  try {
    const { data: response } = await http.get("/models");
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getAllModelsCurvas = async () => {
  try {
    const { data: response } = await http.get("/models/curvas");
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getAllModelWithFilters = async (query) => {
  try {
    const { data: response } = await http.get(`/models/filter?${query}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getAllModelBySearch = async (search) => {
  try {
    const { data: response } = await http.get(`/models/search/${search}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getAllModelWithFiltersSearch = async (query, search) => {
  try {
    const { data: response } = await http.get(
      `/models/search/${search}/filter?${query}`
    );
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createModel = async (payload) => {
  try {
    const { data: response } = await http.post("/models", payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateModel = async (id, payload) => {
  try {
    const { data: response } = await http.patch(`/models/${id}`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateModelText = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/models/${id}`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getModelById = async (id) => {
  try {
    const { data: response } = await http.get(`/models/${id}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getModelByIdNoAuth = async (id) => {
  try {
    const { data: response } = await http.get(`/models/modelInfo/${id}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePhotoModel = async (id, payload) => {
  try {
    const { data: response } = await http.put(`/photos/${id}`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addPhotoModel = async (payload) => {
  try {
    const { data: response } = await http.post(`/photos`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePhotoModel = async (id) => {
  try {
    const { data: response } = await http.delete(`/photos/${id}`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getRecommendedModels = async () => {
  try {
    const { data: response } = await http.get(`/models/recommended`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getModelNamesWithColors = async () => {
  try {
    const { data: response } = await http.get(`/models/search`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getModelLowStock = async () => {
  try {
    const { data: response } = await http.get(`/models/lowStock`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
