import { useEffect, useState } from "react";
import { getAllModels } from "../../api/model/model";

export const useModels = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarModel = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAllModels();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarModel();
  }, []);

  return { data, loading, error };
};
