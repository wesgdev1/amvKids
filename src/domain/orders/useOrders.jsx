import { useEffect, useState } from "react";

import { getMyOrders } from "../../api/orders/orders";

export const useOrders = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyOrders();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarOrders();
  }, []);

  return { data, loading, error, cargarOrders };
};
