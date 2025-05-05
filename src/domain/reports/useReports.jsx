import { useEffect, useState } from "react";
import {
  getCountCategories,
  getCountModels,
  getCountPairs,
  getCountUsers,
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
