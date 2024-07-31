import { useEffect, useState } from "react";

import { getModelById } from "../../api/model/model";

export const useModel = (idModel) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarModel = async (idModel) => {
    setLoading(true);
    setError("");

    try {
      const response = await getModelById(idModel);

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
