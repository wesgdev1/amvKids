import { useEffect, useState } from "react";
import {
  getCountCategories,
  getCountModels,
  getCountOrders,
  getCountPairs,
  getCountUsers,
  getSumaTotalesOrdenes,
  getParesVendidos,
  getModelosMasVendidos,
  getInfoUtilidades,
} from "../../api/reports/reports";

export const useCountPairs = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCountPais = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getCountPairs();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountPais();
  }, []);

  return { data, loading, error };
};

export const useCountUsers = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCountUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getCountUsers();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountUsers();
  }, []);

  return { data, loading, error };
};

export const useCountModels = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCountModels = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getCountModels();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountModels();
  }, []);

  return { data, loading, error };
};

export const useCountProdcuts = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCountProdcuts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getCountCategories();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountProdcuts();
  }, []);

  return { data, loading, error };
};

export const useCountOrders = (startDate, endDate) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCountOrders = async (start, end) => {
    if (!start || !end) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = { startDate: start, endDate: end };
      const response = await getCountOrders(payload);

      setData(response.data);
    } catch (error) {
      console.error("Hook: Error fetching period orders:", error);
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      loadCountOrders(startDate, endDate);
    }
  }, [startDate, endDate]);

  return { data, loading, error };
};

export const useSumaTotalesOrdenes = (startDate, endDate) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSumaTotalesOrdenes = async (start, end) => {
    if (!start || !end) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = { startDate: start, endDate: end };
      const response = await getSumaTotalesOrdenes(payload);

      setData(response.data);
    } catch (error) {
      console.error("Hook: Error fetching period orders:", error);
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      loadSumaTotalesOrdenes(startDate, endDate);
    }
  }, [startDate, endDate]);

  return { data, loading, error };
};

export const useParesVendidos = (startDate, endDate) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadParesVendidos = async (start, end) => {
    if (!start || !end) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = { startDate: start, endDate: end };
      const response = await getParesVendidos(payload);

      setData(response.data);
    } catch (error) {
      console.error("Hook: Error fetching period orders:", error);
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      loadParesVendidos(startDate, endDate);
    }
  }, [startDate, endDate]);

  return { data, loading, error };
};

export const useModelosMasVendidos = (startDate, endDate) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadModelosMasVendidos = async (start, end) => {
    if (!start || !end) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = { startDate: start, endDate: end };
      const response = await getModelosMasVendidos(payload);

      setData(response.data);
    } catch (error) {
      console.error("Hook: Error fetching period orders:", error);
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      loadModelosMasVendidos(startDate, endDate);
    }
  }, [startDate, endDate]);

  return { data, loading, error };
};

export const useInfoUtilidades = (startDate, endDate) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadInfoUtilidades = async (start, end) => {
    if (!start || !end) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = { startDate: start, endDate: end };
      const response = await getInfoUtilidades(payload);

      setData(response.data);
    } catch (error) {
      console.error("Hook: Error fetching period orders:", error);
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      loadInfoUtilidades(startDate, endDate);
    }
  }, [startDate, endDate]);

  return { data, loading, error };
};
