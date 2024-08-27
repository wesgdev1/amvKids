import { useEffect, useState } from "react";

import { getOrderById } from "../../api/orders/orders";

export const useOrder = (id) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarOrder = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await getOrderById(id);

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarOrder(id);
  }, [id]);

  return { data, loading, error, cargarOrder };
};
