import { useEffect, useState } from "react";
import { getProductById } from "../../api/products/products";

export const useProduct = (idProduct) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargaProducto = async (idProduct) => {
    setLoading(true);
    setError("");

    try {
      const response = await getProductById(idProduct);

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargaProducto(idProduct);
  }, [idProduct]);

  return { data, loading, error };
};
