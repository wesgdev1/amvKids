import { useEffect, useState } from "react";
import {
  getAllModelBySearch,
  getAllModels,
  getAllModelWithFilters,
  getAllModelWithFiltersSearch,
  getModelLowStock,
  getModelNamesWithColors,
  getRecommendedModels,
} from "../../api/model/model";
import { generateFilterFormat } from "./utils";
import { useLocation, useNavigate } from "react-router-dom";
import { set } from "zod";

export const useModels = (
  filtrosSeleccionadosAgrupados,
  searchValue = "",
  setFiltrosSeleccionadosAgrupados
) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const cargarModel = async () => {
    setLoading(true);
    setError("");
    const isSearchRoute = location.pathname.startsWith("/productos/search/");

    const urlSearch = location.search;

    // imprimir el url actual completo
    console.log("URL con filters:", urlSearch);

    try {
      // voy a hacer un condicional para cuando en la ruta ya hay presente urlSearch, ENTONCES APLIque esos filter

      if (
        searchValue.length > 0 &&
        isSearchRoute &&
        Object.keys(filtrosSeleccionadosAgrupados).length === 0 &&
        !urlSearch
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
        navigate(
          `/productos/search/${searchValue}?${generateFilterFormat(
            filtrosSeleccionadosAgrupados
          )}`
        );
      } else if (Object.keys(filtrosSeleccionadosAgrupados).length > 0) {
        // aqui es si hay puro filtro seleccionado
        console.log("por el if", filtrosSeleccionadosAgrupados);

        const query = generateFilterFormat(filtrosSeleccionadosAgrupados);

        console.log("query", query);
        const response = await getAllModelWithFilters(query);

        setData(response.data);
        // elimino el primer &a al inicio del query
        const cleanedQuery = query.startsWith("&") ? query.slice(1) : query;
        navigate(`/productos?${cleanedQuery}`);
      } else if (urlSearch && urlSearch.length > 0 && !searchValue) {
        // si hay un search en la url, entonces voy a buscar los modelos con ese search
        // console.log("por el urlSearch", urlSearch);

        // debo armar nuevamente el objeto de filtros y ponerlos en el estado, debo trasnformar el urlSearch en un objeto de filtros

        // primero elimino el ? al inicio del urlSearch
        // luego transformo el urlSearch en un objeto de filtros
        // const params = new URLSearchParams(urlSearch);
        // console.log("params", params);
        // //muestro cada param con el valor
        // params.forEach((value, key) => {
        //   console.log(`Key: ${key}, Value: ${value}`);
        // });
        // const filtros = {};
        // params.forEach((value, key) => {
        //   // si el key ya existe en el objeto filtros, entonces lo concateno con un guion
        //   if (filtros[key]) {
        //     filtros[key] += `-${value}`;
        //   } else {
        //     filtros[key] = value;
        //   }
        // });

        // console.log("filtros", filtros);
        // ahora seteo los filtros seleccionados agrupados

        const cleanedUrlSearch = urlSearch.startsWith("?")
          ? urlSearch.slice(1)
          : urlSearch;
        const response = await getAllModelWithFilters(cleanedUrlSearch);

        setData(response.data);
        // setFiltrosSeleccionadosAgrupados(filtros);
        // console.log(
        //   "filtrosSeleccionadosAgrupados",
        //   filtrosSeleccionadosAgrupados
        // );
        // nave
      } else if (
        urlSearch &&
        urlSearch.length > 0 &&
        searchValue.length > 0 &&
        isSearchRoute
      ) {
        console.log("por el urlSearch con searchValue", urlSearch);
        const cleanedUrlSearch = urlSearch.startsWith("?")
          ? urlSearch.slice(1)
          : urlSearch;
        const response = await getAllModelWithFiltersSearch(
          cleanedUrlSearch,
          searchValue
        );
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

export const useModelLowStock = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarModelsLow = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getModelLowStock();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarModelsLow();
  }, []);

  return { data, loading, error };
};
