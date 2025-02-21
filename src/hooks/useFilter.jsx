import { useState } from "react";

export const useFilter = (initialFilter = []) => {
  const [selectedFilters, setSelectedFilters] = useState(initialFilter);
  const [filtrosSeleccionadosAgrupados, setFiltrosSeleccionadosAgrupados] =
    useState({});
  const [checkFilter, setCheckFilter] = useState({});

  const addFilter = (filter, type) => {
    setSelectedFilters((prevFilters) => [filter, ...prevFilters]);

    setFiltrosSeleccionadosAgrupados({
      ...filtrosSeleccionadosAgrupados,
      [type]:
        filter +
        (filtrosSeleccionadosAgrupados[type]
          ? "-" + filtrosSeleccionadosAgrupados[type]
          : ""),
    });

    console.log("mi grupito", filtrosSeleccionadosAgrupados);
  };

  const deleteFilter = (filter, type) => {
    const aux = [...selectedFilters];
    setSelectedFilters(aux.filter((element) => element != filter));
    setFiltrosSeleccionadosAgrupados((prevAgrupados) => {
      const newAgrupados = { ...prevAgrupados }; // Clonar el objeto

      if (newAgrupados[type]) {
        // Filtrar los valores dentro de la clave `type`
        const newFilters = newAgrupados[type]
          .split("-")
          .filter((filt) => filt !== filter)
          .join("-");

        // Si no quedan filtros, eliminar la clave, de lo contrario, actualizar
        if (newFilters) {
          newAgrupados[type] = newFilters;
        } else {
          delete newAgrupados[type];
        }
      }

      return newAgrupados;
    });

    console.log("filtriños, ", filtrosSeleccionadosAgrupados);
  };

  const clean = () => {
    setSelectedFilters([]);
    setCheckFilter({});
    setFiltrosSeleccionadosAgrupados({});
  };

  return {
    addFilter,
    deleteFilter,
    clean,
    selectedFilters,
    checkFilter,
    setCheckFilter,
    filtrosSeleccionadosAgrupados,
  };
};
