import { useEffect, useState } from "react";
import { getAllModels, getAllModelWithFilters } from "../../api/model/model";
import { generateFilterFormat } from "./utils";

export const useModels = (filtrosSeleccionadosAgrupados) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarModel = async () => {
    setLoading(true);
    setError("");

    try {
      if (Object.keys(filtrosSeleccionadosAgrupados).length > 0) {
        console.log("por el if", filtrosSeleccionadosAgrupados);

        const query = generateFilterFormat(filtrosSeleccionadosAgrupados);

        console.log("query", query);
        const response = await getAllModelWithFilters(query);

        setData(response.data);
      } else {
        console.log("por el else");
        const response = await getAllModels();
        setData(response.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarModel();
  }, [filtrosSeleccionadosAgrupados]);

  return { data, loading, error };
};

export const useModelsFilter = () => {
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
