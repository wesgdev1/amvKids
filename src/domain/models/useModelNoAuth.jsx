import { useEffect, useState } from "react";

import { getModelById, getModelByIdNoAuth } from "../../api/model/model";

export const useModelNoAuth = (idModel) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarModel = async (idModel) => {
    setLoading(true);
    setError("");

    try {
      const response = await getModelByIdNoAuth(idModel);

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarModel(idModel);
  }, [idModel]);

  return { data, loading, error, cargarModel };
};
