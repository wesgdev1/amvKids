import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useProduct } from "../../domain/products/useProduct";
import { ButtonProfile } from "../products/StyledComponents";
import { ModelsTable } from "./ModelsTable";

export const ModelList = () => {
  const params = useParams();
  const { idProduct } = params;
  console.log(idProduct);
  const navigate = useNavigate();
  const { data, loading, error } = useProduct(idProduct);
  const handleClick = () => {
    navigate(`/profile/products/${idProduct}/models/new`);
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

      const filter = data.models.filter((model) => {
        return model.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredData(filter);
      setNotificacion(filter.length === 0);
      setSearchValue("");
    }
  };
  return (
    <div className="pt-5 px-4">
      <Button
        className="mb-4"
        variant="light"
        onClick={() => {
          navigate(`/profile/products`);
        }}
      >
        Volver
      </Button>
      <h4 className="pb-3">
        <i className="bi bi-box"></i> Modelos de la marca - {data?.name}
      </h4>
      <div className="d-flex justify-content-start pb-3">
        <ButtonProfile onClick={handleClick}>Agregar Modelo</ButtonProfile>
      </div>
      <div>
        <Form.Control
          type="search"
          size="sm"
          placeholder="Buscar por Modelo "
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
          <ModelsTable modelos={filteredData} />
        </>
      ) : (
        data && data.models.length > 0 && <ModelsTable modelos={data.models} />
      )}
    </div>
  );
};
