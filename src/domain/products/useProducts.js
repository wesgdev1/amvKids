import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/products/products";

export const useProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarProductos = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAllProducts();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return { data, loading, error, cargarProductos };
};
