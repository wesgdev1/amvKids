import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { ProductsTable } from "./ProductsTable";
import { useProducts } from "../../domain/products/useProducts";
import { ButtonProfile } from "./StyledComponents";

export const ProductList = () => {
  const navigate = useNavigate();
  const { data, loading, error, cargarProductos } = useProducts();
  const handleClick = () => {
    navigate("/profile/products/new");
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

      const searchWords = searchValue
        .toLowerCase()
        .split(" ")
        .filter((word) => word);

      const filter = data.filter((product) => {
        const productName = product.name.toLowerCase();
        return searchWords.every((word) => productName.includes(word));
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
          navigate(`/`);
        }}
      >
        Volver
      </Button>
      <h4 className="pb-3">
        <i className="bi bi-box"></i> Productos
      </h4>
      <div className="d-flex justify-content-start pb-3">
        <ButtonProfile onClick={handleClick}>Agregar Producto</ButtonProfile>
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
          <ProductsTable productos={filteredData} />
        </>
      ) : (
        data.length > 0 && <ProductsTable productos={data} />
      )}
    </div>
  );
};
