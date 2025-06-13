import { useEffect, useState } from "react";
import { getAllOrders, getAllOrdersWithParams } from "../../api/orders/orders";

export const useOrderAdmin = (searchParams = {}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const { name, size, color } = searchParams;
      const hasSearchParams = name || size || color;

      let response;
      if (hasSearchParams) {
        const payload = {
          ...(name && { name }),
          ...(size && { size }),
          ...(color && { color }),
        };
        response = await getAllOrdersWithParams(payload);
      } else {
        response = await getAllOrders();
      }

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarOrders();
  }, [searchParams.name, searchParams.size, searchParams.color]);

  return { data, loading, error, cargarOrders };
};
