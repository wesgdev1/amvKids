import { useEffect, useState } from "react";

import { getMyOrders } from "../../api/orders/orders";
import { getOrdersByUser } from "../../api/users/users";

export const useOrdersByUser = ({ userId }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getOrdersByUser({ userId });

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
