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
      const { name, size, color, codigoOrder } = searchParams;
      const hasSearchParams = name || size || color || codigoOrder;
      console.log("hasSearchParams", hasSearchParams);

      let response;
      if (hasSearchParams) {
        const payload = {
          ...(name && { name }),
          ...(size && { size }),
          ...(color && { color }),
          ...(codigoOrder && { codigoOrder }),
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
  }, [
    searchParams.name,
    searchParams.size,
    searchParams.color,
    searchParams.codigoOrder,
  ]);

  return { data, loading, error, cargarOrders };
};
