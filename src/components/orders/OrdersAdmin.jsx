import { useState } from "react";
import { Alert, Form, Spinner } from "react-bootstrap";
import { ButtonProfile } from "../products/StyledComponents";
import { useOrderAdmin } from "../../domain/orders/useOrderAdmin";
import { OrdersTableAdmin } from "./OrdersTableAdmin";

export const OrdersAdmin = () => {
  const { data, loading, error } = useOrderAdmin();

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notificacion, setNotificacion] = useState(false);
  const [filterUserType, setFilterUserType] = useState("Todos");
  const [filterOrderState, setFilterOrderState] = useState("Todos");

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

      <div className="d-flex gap-3 mb-3 flex-wrap">
        <Form.Control
          type="search"
          size="sm"
          placeholder="Buscar por código orden/usuario o nombre..."
          className="me-2"
          style={{ flex: "2 1 350px" }}
          aria-label="Search"
          onChange={handleInputChange}
          onKeyDown={onSearch}
          value={searchValue}
        />
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
