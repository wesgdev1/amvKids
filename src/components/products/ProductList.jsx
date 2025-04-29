import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { ProductsTable } from "./ProductsTable";
import { useProducts } from "../../domain/products/useProducts";
import { ButtonProfile } from "./StyledComponents";

export const ProductList = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useProducts();
  const handleClick = () => {
    navigate("/profile/products/new");
  };
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notificacion, setNotificacion] = useState(false);
  const [sortOption, setSortOption] = useState("name-asc");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
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

  // Función para ordenar productos
  const sortProducts = (products, option) => {
    const sortedProducts = [...products]; // Crear una copia para no mutar el estado original
    switch (option) {
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "models-asc":
        sortedProducts.sort(
          (a, b) => (a.models?.length || 0) - (b.models?.length || 0)
        );
        break;
      case "models-desc":
        sortedProducts.sort(
          (a, b) => (b.models?.length || 0) - (a.models?.length || 0)
        );
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  // Determinar qué datos mostrar y ordenarlos
  const dataToShow = filteredData.length > 0 ? filteredData : data || [];
  const sortedData = sortProducts(dataToShow, sortOption);

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
        <i className="bi bi-box"></i> Productos o Categorias
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
      <div className="my-3 w-50">
        <Form.Select size="sm" value={sortOption} onChange={handleSortChange}>
          <option value="name-asc">Nombre (A-Z)</option>
          <option value="name-desc">Nombre (Z-A)</option>
          <option value="models-asc">Menos Modelos</option>
          <option value="models-desc">Más Modelos</option>
        </Form.Select>
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
          <ProductsTable productos={sortedData} />
        </>
      ) : (
        sortedData.length > 0 && <ProductsTable productos={sortedData} />
      )}
    </div>
  );
};
