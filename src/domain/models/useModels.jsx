import { useEffect, useState } from "react";
import {
  getAllModelBySearch,
  getAllModels,
  getAllModelWithFilters,
  getAllModelWithFiltersSearch,
  getModelNamesWithColors,
  getRecommendedModels,
} from "../../api/model/model";
import { generateFilterFormat } from "./utils";
import { useLocation } from "react-router-dom";

export const useModels = (filtrosSeleccionadosAgrupados, searchValue = "") => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  const cargarModel = async () => {
    setLoading(true);
    setError("");
    const isSearchRoute = location.pathname.startsWith("/productos/search/");

    try {
      if (
        searchValue.length > 0 &&
        isSearchRoute &&
        Object.keys(filtrosSeleccionadosAgrupados).length === 0
      ) {
        console.log("por el search-", searchValue);
        const response = await getAllModelBySearch(searchValue);

        setData(response.data);
      } else if (
        searchValue.length > 0 &&
        isSearchRoute &&
        Object.keys(filtrosSeleccionadosAgrupados).length > 0
      ) {
        const response = await getAllModelWithFiltersSearch(
          generateFilterFormat(filtrosSeleccionadosAgrupados),
          searchValue
        );
        setData(response.data);
      } else if (Object.keys(filtrosSeleccionadosAgrupados).length > 0) {
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
  }, [searchValue]);

  return { data, loading, error, cargarModel };
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

export const useModelRecommended = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarRecomendados = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getRecommendedModels();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarRecomendados();
  }, []);

  return { data, loading, error, cargarRecomendados };
};

export const useModelWithColors = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarModelsColor = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getModelNamesWithColors();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarModelsColor();
  }, []);

  return { data, loading, error };
};
