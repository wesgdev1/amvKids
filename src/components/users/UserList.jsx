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

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Manejador para el cambio en el select de tipo
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    // Opcional: podrías querer resetear la búsqueda por nombre aquí
    setFilteredData([]);
    setNotificacion(false);
  };

  const onSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();

      // Aplicar búsqueda sobre los datos ya filtrados por tipo
      const baseData =
        filterType === "Todos"
          ? data
          : data.filter((user) => user.tipoUsuario === filterType);

      const filter = baseData.filter((user) => {
        return user.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredData(filter);
      setNotificacion(filter.length === 0);
      setSearchValue("");
    }
  };

  // Filtrar datos basado en el tipo seleccionado
  const dataFilteredByType =
    filterType === "Todos"
      ? data
      : data?.filter((user) => user.tipoUsuario === filterType) || [];

  // Determinar qué datos mostrar: los buscados o los filtrados por tipo
  const dataToShow =
    filteredData.length > 0 ? filteredData : dataFilteredByType;

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-box"></i> Modulo de Registro de Usuarios
      </h4>
      <div className="d-flex justify-content-start pb-3">
        <ButtonProfile onClick={handleClick}>Agregar Usuario</ButtonProfile>
      </div>
      {/* Contenedor para búsqueda y filtro */}
      <div className="d-flex gap-3 mb-3 flex-wrap">
        {/* Barra de búsqueda */}
        <Form.Control
          type="search"
          size="sm"
          placeholder="Buscar por Nombre "
          className="me-2" // Quitar w-50 para que se ajuste
          style={{ flex: "1 1 300px" }} // Permitir que crezca y tenga base
          aria-label="Search"
          onChange={handleInputChange}
          onKeyDown={onSearch}
          value={searchValue}
        />
        {/* Select para filtrar por tipo */}
        <Form.Select
          size="sm"
          value={filterType}
          onChange={handleFilterChange}
          style={{ flex: "1 1 200px", minWidth: "180px" }} // Ajustar flex y min-width
          aria-label="Filtrar por tipo de usuario"
        >
          <option value="Todos">Todos los Tipos</option>
          <option value="Reventa">Reventa</option>
          <option value="Cliente">Cliente</option>
          <option value="Tienda Aliada">Tienda Aliada</option>
          {/* Añadir más tipos si es necesario */}
        </Form.Select>
      </div>

      {loading && <Spinner animation="border" variant="info" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {notificacion ? (
        <div className="pt-3">
          <p>No se encontraron resultados para la búsqueda.</p>
          <ButtonProfile
            onClick={() => {
              setNotificacion(false);
              setFilteredData([]); // Limpiar resultados de búsqueda
            }}
          >
            Ver todos ({filterType})
          </ButtonProfile>
        </div>
      ) : dataToShow?.length > 0 ? (
        <>
          {filteredData.length > 0 && (
            <p className="pt-2">
              Se encontraron: ({filteredData.length}) coincidencias
              {filterType !== "Todos" ? `en tipo '${filterType}'` : ""}.
            </p>
          )}
          {/* Mostrar botón de limpiar búsqueda solo si hay búsqueda activa */}
          {filteredData.length > 0 && (
            <ButtonProfile onClick={() => setFilteredData([])}>
              Mostrar todos ({filterType})
            </ButtonProfile>
          )}
          <UsersTable users={dataToShow} cargarUsuarios={cargarUsuarios} />
        </>
      ) : (
        <p>
          No hay usuarios para mostrar{" "}
          {filterType !== "Todos" ? `del tipo '${filterType}'` : ""}.
        </p>
      )}
    </div>
  );
};
