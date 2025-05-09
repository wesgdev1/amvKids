import { useNavigate } from "react-router-dom";
import { Alert, Form, Spinner } from "react-bootstrap";
import { useState } from "react";

// import { useProducts } from "../../domain/products/useProducts"; // Eliminado

import { UsersTable } from "./UsersTable";
import { ButtonProfile } from "../products/StyledComponents";
import { useUsers } from "../../domain/auth/useUsers";

export const UserList = () => {
  const navigate = useNavigate();
  const { data, loading, error, cargarUsuarios } = useUsers();
  const handleClick = () => {
    navigate("/profile/users/new");
  };
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notificacion, setNotificacion] = useState(false);
  const [filterType, setFilterType] = useState("Todos"); // Estado para el filtro de tipo
  const [sortBy, setSortBy] = useState("default"); // Estado para el ordenamiento

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setFilteredData([]);
    setNotificacion(false);
    setSortBy("default"); // Resetear ordenamiento al cambiar tipo
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    // No es necesario resetear filteredData aquí, el ordenamiento se aplica a la vista actual
  };

  const onSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();

      let baseDataForSearch =
        filterType === "Todos"
          ? data
          : data.filter((user) => user.tipoUsuario === filterType);

      // Aplicar ordenamiento ANTES de la búsqueda textual si es necesario
      if (sortBy === "multasDesc") {
        baseDataForSearch = [...baseDataForSearch].sort(
          (a, b) => (b.numeroMultas || 0) - (a.numeroMultas || 0)
        );
      }

      const filter = baseDataForSearch.filter((user) => {
        return user.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredData(filter);
      setNotificacion(filter.length === 0);
      setSearchValue("");
    }
  };

  // Filtrar datos basado en el tipo seleccionado
  let dataFilteredByType =
    filterType === "Todos"
      ? data
      : data?.filter((user) => user.tipoUsuario === filterType) || [];

  // Aplicar ordenamiento
  if (sortBy === "multasDesc") {
    // Crear una nueva copia antes de ordenar para no mutar el estado original de useUsers
    dataFilteredByType = [...dataFilteredByType].sort(
      (a, b) => (b.numeroMultas || 0) - (a.numeroMultas || 0)
    );
  }

  // Determinar qué datos mostrar: los buscados o los filtrados y ordenados
  const dataToShow =
    filteredData.length > 0 ? filteredData : dataFilteredByType;

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-people-fill me-2"></i> Modulo de Registro de
        Usuarios
      </h4>
      <div className="d-flex justify-content-start pb-3">
        <ButtonProfile onClick={handleClick}>
          <i className="bi bi-plus-circle-fill me-2"></i>Agregar Usuario
        </ButtonProfile>
      </div>

      <div className="d-flex gap-3 mb-4 flex-wrap align-items-center bg-light p-3 rounded shadow-sm">
        <Form.Control
          type="search"
          size="sm"
          placeholder="Buscar por Nombre (Presiona Enter)"
          className="me-2"
          style={{ flex: "2 1 300px" }}
          aria-label="Search"
          onChange={handleInputChange}
          onKeyDown={onSearch}
          value={searchValue}
        />

        <Form.Select
          size="sm"
          value={filterType}
          onChange={handleFilterChange}
          style={{ flex: "1 1 180px", minWidth: "170px" }}
          aria-label="Filtrar por tipo de usuario"
        >
          <option value="Todos">Todos los Tipos</option>
          <option value="Reventa">Reventa</option>
          <option value="Cliente">Cliente</option>
          <option value="Tienda Aliada">Tienda Aliada</option>
          {/* Añadir más tipos si es necesario */}
        </Form.Select>

        {/* Nuevo Select para ordenar */}
        <Form.Select
          size="sm"
          value={sortBy}
          onChange={handleSortChange}
          style={{ flex: "1 1 180px", minWidth: "170px" }}
          aria-label="Ordenar por"
        >
          <option value="default">Ordenar por...</option>
          <option value="multasDesc">Mayor # Multas</option>
          {/* Podrías añadir más opciones de ordenamiento aquí */}
        </Form.Select>
      </div>

      {loading && <Spinner animation="border" variant="info" />}
      {error && (
        <Alert variant="danger">
          {error.message || "Error al cargar usuarios."}
        </Alert>
      )}

      {notificacion ? (
        <div className="pt-3 text-center">
          <Alert variant="warning">
            {`No se encontraron resultados para la búsqueda "`}
            <strong>{filteredData.searchTerm || searchValue}</strong>
            {`".`}
          </Alert>
          <ButtonProfile
            variant="secondary"
            onClick={() => {
              setNotificacion(false);
              setFilteredData([]);
              setSearchValue(""); // Limpiar input de búsqueda
            }}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>Ver todos (
            {filterType})
          </ButtonProfile>
        </div>
      ) : dataToShow?.length > 0 ? (
        <>
          {(filteredData.length > 0 || sortBy !== "default") && (
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p className="pt-2 mb-0 text-muted small">
                {filteredData.length > 0
                  ? `Se encontraron: (${filteredData.length}) coincidencias`
                  : `Mostrando ${dataToShow.length} de ${
                      data?.length || 0
                    } usuarios`}
                {filterType !== "Todos" ? ` del tipo '${filterType}'` : ""}
                {sortBy === "multasDesc"
                  ? ", ordenados por # multas (desc)"
                  : ""}
                .
              </p>
              {filteredData.length > 0 && (
                <ButtonProfile
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => {
                    setFilteredData([]);
                    setSearchValue("");
                  }}
                >
                  Limpiar Búsqueda
                </ButtonProfile>
              )}
            </div>
          )}
          <UsersTable users={dataToShow} cargarUsuarios={cargarUsuarios} />
        </>
      ) : (
        <Alert variant="info" className="text-center">
          No hay usuarios para mostrar
          {filterType !== "Todos" ? `del tipo '${filterType}'` : ""}
          {sortBy === "multasDesc" && data?.length > 0
            ? ". Intenta con otro criterio de ordenamiento o filtro."
            : "."}
          {data?.length === 0 && !loading && "en el sistema."}
        </Alert>
      )}
    </div>
  );
};
