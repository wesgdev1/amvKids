import { useEffect, useState } from "react";
import { getAllModelsCurvas } from "../../api/model/model";

import { useLocation } from "react-router-dom";

export const useCurvas = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  const cargarCurva = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAllModelsCurvas();
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCurva();
  }, []);

  return { data, loading, error };
};
