import { useState } from "react";
import { Alert, Form, Spinner, Card, Button } from "react-bootstrap";
import { ButtonProfile } from "../products/StyledComponents";
import { useOrderAdmin } from "../../domain/orders/useOrderAdmin";
import { OrdersTableAdmin } from "./OrdersTableAdmin";
import styled from "styled-components";

// Styled Components
const SearchContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const SearchTitle = styled.h5`
  color: #111827;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;

  i {
    font-size: 1.25rem;
    color: #3b82f6;
  }
`;

const StyledFormControl = styled(Form.Control)`
  background: #ffffff !important;
  border: 1px solid #d1d5db !important;
  border-radius: 8px !important;
  color: #111827 !important;
  transition: all 0.2s ease;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  padding: 0.75rem 1rem;

  &:focus {
    background: #ffffff !important;
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
    color: #111827 !important;
  }

  &:hover {
    border-color: #9ca3af;
  }

  &::placeholder {
    color: #6b7280 !important;
    font-weight: 400;
  }
`;

const StyledFormSelect = styled(Form.Select)`
  background: #ffffff !important;
  border: 1px solid #d1d5db !important;
  border-radius: 8px !important;
  color: #111827 !important;
  transition: all 0.2s ease;
  font-weight: 400;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  padding: 0.75rem 1rem;

  &:focus {
    background: #ffffff !important;
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
    color: #111827 !important;
  }

  &:hover {
    border-color: #9ca3af;
  }

  option {
    background: #ffffff !important;
    color: #111827 !important;
  }
`;

const StyledFormLabel = styled(Form.Label)`
  color: #374151 !important;
  font-weight: 500;
  margin-bottom: 0.5rem !important;
  font-size: 0.875rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
`;

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1.5rem;
  align-items: end;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
`;

const AdvancedSearchButton = styled(Button)`
  background: #f9fafb !important;
  border: 1px solid #d1d5db !important;
  border-radius: 8px !important;
  color: #374151 !important;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 0.875rem;

  &:hover {
    background: #f3f4f6 !important;
    border-color: #9ca3af !important;
    color: #111827 !important;
  }

  &:focus {
    background: #f9fafb !important;
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
    color: #374151 !important;
  }

  i {
    margin-right: 0.5rem;
  }
`;

const AdvancedSearchCard = styled(Card)`
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card-header {
    background: #f9fafb !important;
    border-bottom: 1px solid #e5e7eb !important;
    color: #111827;
    font-weight: 600;
    padding: 1rem 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      sans-serif;
  }

  .card-body {
    padding: 1.5rem;
    color: #111827;
  }
`;

const ClearButton = styled(Button)`
  background: #ffffff !important;
  border: 1px solid #d1d5db !important;
  border-radius: 8px !important;
  color: #6b7280 !important;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  font-size: 0.875rem;

  &:hover {
    background: #f9fafb !important;
    border-color: #9ca3af !important;
    color: #374151 !important;
  }

  &:focus {
    background: #ffffff !important;
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
    color: #6b7280 !important;
  }

  i {
    margin-right: 0.5rem;
  }
`;

const FilterTag = styled.div`
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
  margin: 0.25rem;
  border: 1px solid #bfdbfe;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
`;

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

      <p>
        Por defecto se mostraran todas las ordenes que no estan marcadas como
        entregadas
      </p>
      <hr />

      {/* Búsqueda básica estilizada */}
      <SearchContainer>
        <SearchTitle>
          <i className="bi bi-search"></i>
          Búsqueda de Órdenes
        </SearchTitle>

        <SearchGrid>
          <div>
            <StyledFormLabel>Número de Orden</StyledFormLabel>
            <StyledFormControl
              type="text"
              size="sm"
              placeholder="Ej: 1847"
              value={advancedSearch.codigoOrder}
              onChange={(e) =>
                handleAdvancedSearchChange("codigoOrder", e.target.value)
              }
            />
          </div>

          <div>
            <StyledFormLabel>Tipo de Usuario</StyledFormLabel>
            <StyledFormSelect
              size="sm"
              value={filterUserType}
              onChange={handleUserTypeChange}
              aria-label="Filtrar por tipo de usuario"
            >
              {userTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "Todos" ? "Todos los tipos" : type}
                </option>
              ))}
            </StyledFormSelect>
          </div>

          <div>
            <StyledFormLabel>Estado de Orden</StyledFormLabel>
            <StyledFormSelect
              size="sm"
              value={filterOrderState}
              onChange={handleOrderStateChange}
              aria-label="Filtrar por estado de orden"
            >
              {orderStates.map((state) => (
                <option key={state} value={state}>
                  {state === "Todos" ? "Todos los estados" : state}
                </option>
              ))}
            </StyledFormSelect>
          </div>
        </SearchGrid>
      </SearchContainer>

      {/* Botón para mostrar/ocultar búsqueda avanzada */}
      <div className="mb-3">
        <AdvancedSearchButton
          size="sm"
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
        >
          <i className="bi bi-funnel"></i> Búsqueda Avanzada
          <i
            className={`bi ${
              showAdvancedSearch ? "bi-chevron-up" : "bi-chevron-down"
            } ms-2`}
          ></i>
        </AdvancedSearchButton>
      </div>

      {/* Sección de búsqueda avanzada */}
      {showAdvancedSearch && (
        <AdvancedSearchCard className="mb-4">
          <Card.Header>
            <h6 className="mb-0">
              <i className="bi bi-gear me-2"></i>
              Búsqueda Avanzada por Productos
            </h6>
          </Card.Header>
          <Card.Body>
            <div className="row g-3">
              <div className="col-md-4">
                <Form.Label>Número de Orden</Form.Label>
                <StyledFormControl
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
                <StyledFormControl
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
                <StyledFormControl
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
                <StyledFormControl
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
            <div className="mt-3 d-flex gap-2 align-items-center flex-wrap">
              <ClearButton size="sm" onClick={clearAdvancedSearch}>
                <i className="bi bi-x-circle"></i> Limpiar Filtros
              </ClearButton>
              {(advancedSearch.name ||
                advancedSearch.size ||
                advancedSearch.color) && (
                <div className="d-flex flex-wrap align-items-center">
                  <span className="text-muted small me-2">
                    Filtros activos:
                  </span>
                  {advancedSearch.name && (
                    <FilterTag>Nombre: "{advancedSearch.name}"</FilterTag>
                  )}
                  {advancedSearch.size && (
                    <FilterTag>Talla: "{advancedSearch.size}"</FilterTag>
                  )}
                  {advancedSearch.color && (
                    <FilterTag>Color: "{advancedSearch.color}"</FilterTag>
                  )}
                </div>
              )}
            </div>
          </Card.Body>
        </AdvancedSearchCard>
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
