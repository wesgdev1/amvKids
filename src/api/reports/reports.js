import { instance as http } from "../http";

export const getCountUsers = async () => {
  try {
    const { data: response } = await http.get(`/users/countUser`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getCountModels = async () => {
  try {
    const { data: response } = await http.get(`/models/count`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getCountPairs = async () => {
  try {
    const { data: response } = await http.get(`/stocks/countPairs`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCountCategories = async () => {
  try {
    const { data: response } = await http.get(`/products/countProducts`);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCountOrders = async (payload) => {
  try {
    const { data: response } = await http.post(
      `/orders/countOrderByDate`,
      payload
    );
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSumaTotalesOrdenes = async (payload) => {
  try {
    const { data: response } = await http.post(
      `/orders/sumarTotalOrdenesByDate`,
      payload
    );
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getNumbersOfOrdersWithCoupons = async (payload) => {
  try {
    const { data: response } = await http.post(
      `/orders/orderswithcoupon`,
      payload
    );
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getParesVendidos = async (payload) => {
  try {
    const { data: response } = await http.post(
      `/orders/sumarParesVendidosPorFecha`,
      payload
    );
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getModelosMasVendidos = async (payload) => {
  try {
    const { data: response } = await http.post(
      `/orders/modeloMasVendido`,
      payload
    );
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getInfoUtilidades = async (payload) => {
  try {
    const { data: response } = await http.post(
      `/orders/calcularUtilidad`,
      payload
    );
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getInfoUtilidadesGraficos = async (payload) => {
  try {
    const { data: response } = await http.post(`/orders/graficos`, payload);
    return { data: response.data };
  } catch (error) {
    return Promise.reject(error);
  }
};
