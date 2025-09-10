import { useState } from "react";
import { Alert, Form, Spinner, Card, Button } from "react-bootstrap";
import { ButtonProfile } from "../products/StyledComponents";
import { useOrderAdmin } from "../../domain/orders/useOrderAdmin";
import { OrdersTableAdmin } from "./OrdersTableAdmin";

export const OrdersAdmin = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notificacion, setNotificacion] = useState(false);
  const [filterUserType, setFilterUserType] = useState("Todos");
  const [filterOrderState, setFilterOrderState] = useState("Todos");

  // Estados para búsqueda avanzada
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState({
    codigoOrder: "",
    name: "",
    size: "",
    color: "",
  });

  const { data, loading, error } = useOrderAdmin(advancedSearch);

  const userTypes = ["Todos", "Cliente", "Reventa", "Tienda Aliada"];
  const orderStates = [
    "Todos",
    "Creada",
    "Pago Enviado",
    "Pago Confirmado",
    "Pedido Entregado",
    "CanceladaAdmin",
  ];

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setFilterUserType(e.target.value);
    setFilteredData([]);
    setNotificacion(false);
  };

  const handleOrderStateChange = (e) => {
    setFilterOrderState(e.target.value);
    setFilteredData([]);
    setNotificacion(false);
  };

  const onSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();

      let baseData = data || [];
      if (filterUserType !== "Todos") {
        baseData = baseData.filter(
          (order) => order.user.tipoUsuario === filterUserType
        );
      }
      if (filterOrderState !== "Todos") {
        baseData = baseData.filter((order) => order.state === filterOrderState);
      }

      const filter = baseData.filter((order) => {
        return (
          order.codigoOrder == searchValue ||
          order.user.codigo == searchValue ||
          order.user.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setFilteredData(filter);
      setNotificacion(filter.length === 0);
      setSearchValue("");
    }
  };

  const handleAdvancedSearchChange = (field, value) => {
    setAdvancedSearch((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Resetear filtros cuando cambie la búsqueda avanzada
    setFilteredData([]);
    setNotificacion(false);
  };

  const clearAdvancedSearch = () => {
    setAdvancedSearch({
      codigoOrder: "",
      name: "",
      size: "",
      color: "",
    });
    setFilteredData([]);
    setNotificacion(false);
  };

  let filteredBySelectors = data || [];
  if (filterUserType !== "Todos") {
    filteredBySelectors = filteredBySelectors.filter(
      (order) => order.user.tipoUsuario === filterUserType
    );
  }
  if (filterOrderState !== "Todos") {
    filteredBySelectors = filteredBySelectors.filter(
      (order) => order.state === filterOrderState
    );
  }

  const dataToShow =
    filteredData.length > 0 || notificacion
      ? filteredData
      : filteredBySelectors;
  const showNotFoundMessage = notificacion && filteredData.length === 0;
  const showNoDataMessage =
    !loading && !error && dataToShow.length === 0 && !notificacion;

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-receipt-cutoff"></i> Ordenes de apartado
      </h4>

      {/* Búsqueda básica */}
      <div className="d-flex gap-3 mb-3 flex-wrap">
        {/* <Form.Control
          type="search"
          size="sm"
          placeholder="Buscar por código orden/usuario o nombre..."
          className="me-2"
          style={{ flex: "2 1 350px" }}
          aria-label="Search"
          onChange={handleInputChange}
          onKeyDown={onSearch}
          value={searchValue}
        /> */}
        <Form.Select
          size="sm"
          value={filterUserType}
          onChange={handleUserTypeChange}
          style={{ flex: "1 1 180px", minWidth: "150px" }}
          aria-label="Filtrar por tipo de usuario"
        >
          {userTypes.map((type) => (
            <option key={type} value={type}>
              {type === "Todos" ? "Tipo Usuario (Todos)" : type}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          size="sm"
          value={filterOrderState}
          onChange={handleOrderStateChange}
          style={{ flex: "1 1 180px", minWidth: "150px" }}
          aria-label="Filtrar por estado de orden"
        >
          {orderStates.map((state) => (
            <option key={state} value={state}>
              {state === "Todos" ? "Estado Orden (Todos)" : state}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* Botón para mostrar/ocultar búsqueda avanzada */}
      <div className="mb-3">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
        >
          <i className="bi bi-search"></i> Búsqueda Avanzada
          <i
            className={`bi ${
              showAdvancedSearch ? "bi-chevron-up" : "bi-chevron-down"
            } ms-2`}
          ></i>
        </Button>
      </div>

      {/* Sección de búsqueda avanzada */}
      {showAdvancedSearch && (
        <Card className="mb-4">
          <Card.Header>
            <h6 className="mb-0">Búsqueda Avanzada por Productos</h6>
          </Card.Header>
          <Card.Body>
            <div className="row g-3">
              <div className="col-md-4">
                <Form.Label>Numero de Orden</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Ej: 1847"
                  value={advancedSearch.codigoOrder}
                  onChange={(e) =>
                    handleAdvancedSearchChange("codigoOrder", e.target.value)
                  }
                />
              </div>
              <div className="col-md-4">
                <Form.Label>Nombre del Modelo</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Ej: Retro 3"
                  value={advancedSearch.name}
                  onChange={(e) =>
                    handleAdvancedSearchChange("name", e.target.value)
                  }
                />
              </div>
              <div className="col-md-4">
                <Form.Label>Talla</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  placeholder="Ej: 25, 43, 35"
                  value={advancedSearch.size}
                  onChange={(e) =>
                    handleAdvancedSearchChange("size", e.target.value)
                  }
                />
              </div>
              <div className="col-md-4">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Ej: Rojo, Azul"
                  value={advancedSearch.color}
                  onChange={(e) =>
                    handleAdvancedSearchChange("color", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={clearAdvancedSearch}
              >
                <i className="bi bi-x-circle"></i> Limpiar
              </Button>
              {(advancedSearch.name ||
                advancedSearch.size ||
                advancedSearch.color) && (
                <div className="text-muted small align-self-center">
                  Filtros activos:{" "}
                  {[
                    advancedSearch.name && `Nombre: "${advancedSearch.name}"`,
                    advancedSearch.size && `Talla: "${advancedSearch.size}"`,
                    advancedSearch.color && `Color: "${advancedSearch.color}"`,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      )}

      {loading && <Spinner animation="border" variant="info" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {showNotFoundMessage && (
        <div className="pt-3">
          <p>No se encontraron resultados para la búsqueda.</p>
          <ButtonProfile
            onClick={() => {
              setNotificacion(false);
              setFilteredData([]);
            }}
          >
            Ver todos ({filterUserType} / {filterOrderState})
          </ButtonProfile>
        </div>
      )}

      {!loading && !error && !showNotFoundMessage && dataToShow.length > 0 && (
        <>
          {filteredData.length > 0 && (
            <p className="pt-2">
              Se encontraron: ({filteredData.length}) coincidencias.
            </p>
          )}
          {filteredData.length > 0 && (
            <ButtonProfile onClick={() => setFilteredData([])}>
              Mostrar todos ({filterUserType} / {filterOrderState})
            </ButtonProfile>
          )}
          <OrdersTableAdmin orders={dataToShow} />
        </>
      )}

      {showNoDataMessage && (
        <p className="pt-3">
          No hay órdenes que mostrar para los filtros seleccionados (
          {filterUserType} / {filterOrderState}).
        </p>
      )}
    </div>
  );
};
