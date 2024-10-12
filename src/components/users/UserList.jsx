import { useNavigate } from "react-router-dom";
import { Alert, Form, Spinner } from "react-bootstrap";
import { useState } from "react";

import { useProducts } from "../../domain/products/useProducts";

import { UsersTable } from "./UsersTable";
import { ButtonProfile } from "../products/StyledComponents";
import { useUsers } from "../../domain/auth/useUsers";

export const UserList = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useUsers();
  const handleClick = () => {
    navigate("/profile/users/new");
  };
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notificacion, setNotificacion] = useState(false);
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();

      const filter = data.filter((user) => {
        return user.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredData(filter);
      setNotificacion(filter.length === 0);
      setSearchValue("");
    }
  };
  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-box"></i> Usuarios de reventa
      </h4>
      <div className="d-flex justify-content-start pb-3">
        <ButtonProfile onClick={handleClick}>Agregar Usuario</ButtonProfile>
      </div>
      <div>
        <Form.Control
          type="search"
          size="sm"
          placeholder="Buscar por Nombre "
          className="me-2 w-50"
          aria-label="Search"
          onChange={handleInputChange}
          onKeyDown={onSearch}
          value={searchValue}
        />
      </div>
      {loading && <Spinner animation="border" variant="info" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {notificacion ? (
        <div className="pt-3">
          <p>No se encontraron resultados</p>
          <ButtonProfile onClick={() => setNotificacion(false)}>
            Ver todo
          </ButtonProfile>
        </div>
      ) : filteredData.length > 0 ? (
        <>
          <p className="pt-2">
            Se encontraron: ({filteredData.length}) coincidencias
          </p>
          <ButtonProfile onClick={() => setFilteredData([])}>
            Mostrar todo
          </ButtonProfile>
          <UsersTable users={filteredData} />
        </>
      ) : (
        data?.length > 0 && <UsersTable users={data} />
      )}
    </div>
  );
};
