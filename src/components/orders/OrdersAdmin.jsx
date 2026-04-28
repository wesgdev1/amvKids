import { useState } from "react";
import { Alert, Form, Spinner, Button } from "react-bootstrap";
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
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:hover {
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const SearchTitle = styled.button`
  background: none;
  border: none;
  padding: 0;
  width: 100%;
  color: #111827;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  cursor: pointer;

  i.icon-left {
    font-size: 1.1rem;
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
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
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
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
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
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
`;

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Divider = styled.div`
  border-top: 1px solid #e5e7eb;
  margin: 1.2rem 0;
`;

const SectionLabel = styled.p`
  font-size: 0.7rem;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.8rem;
`;

const ClearButton = styled(Button)`
  background: #ffffff !important;
  border: 1px solid #d1d5db !important;
  border-radius: 8px !important;
  color: #6b7280 !important;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
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
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
`;

const SearchButton = styled(Button)`
  background: #390688 !important;
  border: none !important;
  border-radius: 8px !important;
  color: #fff !important;
  font-weight: 600;
  padding: 0.5rem 1.4rem;
  transition: background 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    background: #5a2d9e !important;
  }
`;

export const OrdersAdmin = () => {
  const [filterUserType, setFilterUserType] = useState("Todos");
  const [filterOrderState, setFilterOrderState] = useState("Todos");

  const [advancedSearch, setAdvancedSearch] = useState({
    codigoOrder: "",
    name: "",
    size: "",
    color: "",
  });
  const [committedSearch, setCommittedSearch] = useState({
    codigoOrder: "",
    name: "",
    size: "",
    color: "",
  });

  const { data, loading, error } = useOrderAdmin(committedSearch);

  const userTypes = ["Todos", "Cliente", "Reventa", "Tienda Aliada"];
  const orderStates = [
    "Todos",
    "Creada",
    "Pago Enviado",
    "Pago Confirmado",
    "Pedido Entregado",
    "CanceladaAdmin",
  ];

  const handleSearchChange = (field, value) => {
    setAdvancedSearch((prev) => ({ ...prev, [field]: value }));
  };

  const applySearch = () => {
    setCommittedSearch(advancedSearch);
  };

  const clearSearch = () => {
    const empty = { codigoOrder: "", name: "", size: "", color: "" };
    setAdvancedSearch(empty);
    setCommittedSearch(empty);
    setFilterUserType("Todos");
    setFilterOrderState("Todos");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") applySearch();
  };

  let dataToShow = data || [];
  if (filterUserType !== "Todos")
    dataToShow = dataToShow.filter(
      (o) => o.user.tipoUsuario === filterUserType
    );
  if (filterOrderState !== "Todos")
    dataToShow = dataToShow.filter((o) => o.state === filterOrderState);

  const hasActiveFilters = Object.values(committedSearch).some(Boolean);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-receipt-cutoff"></i> Ordenes de apartado
      </h4>
      <p>
        Por defecto se mostrarán todas las órdenes no marcadas como entregadas.
      </p>
      <hr />

      <SearchContainer>
        <SearchTitle onClick={() => setShowFilters((v) => !v)}>
          <span>
            <i className="bi bi-search icon-left me-2"></i>
            Búsqueda y Filtros
          </span>
          <i
            className={`bi ${showFilters ? "bi-chevron-up" : "bi-chevron-down"}`}
          ></i>
        </SearchTitle>

        {hasActiveFilters && !showFilters && (
          <div className="d-flex flex-wrap align-items-center mt-2">
            <span className="text-muted small me-2">Filtros activos:</span>
            {committedSearch.codigoOrder && (
              <FilterTag>Orden: {committedSearch.codigoOrder}</FilterTag>
            )}
            {committedSearch.name && (
              <FilterTag>Modelo: {committedSearch.name}</FilterTag>
            )}
            {committedSearch.size && (
              <FilterTag>Talla: {committedSearch.size}</FilterTag>
            )}
            {committedSearch.color && (
              <FilterTag>Color: {committedSearch.color}</FilterTag>
            )}
          </div>
        )}

        {showFilters && (
          <>
            <SectionLabel className="mt-3">
              Filtros por base de datos
            </SectionLabel>
            <SearchGrid>
              <div>
                <StyledFormLabel>Número de Orden</StyledFormLabel>
                <StyledFormControl
                  type="text"
                  placeholder="Ej: 1847"
                  value={advancedSearch.codigoOrder}
                  onChange={(e) =>
                    handleSearchChange("codigoOrder", e.target.value)
                  }
                  onKeyDown={handleEnter}
                />
              </div>
              <div>
                <StyledFormLabel>Nombre del Modelo</StyledFormLabel>
                <StyledFormControl
                  type="text"
                  placeholder="Ej: Retro 3"
                  value={advancedSearch.name}
                  onChange={(e) => handleSearchChange("name", e.target.value)}
                  onKeyDown={handleEnter}
                />
              </div>
              <div>
                <StyledFormLabel>Talla</StyledFormLabel>
                <StyledFormControl
                  type="number"
                  placeholder="Ej: 25, 43, 35"
                  value={advancedSearch.size}
                  onChange={(e) => handleSearchChange("size", e.target.value)}
                  onKeyDown={handleEnter}
                />
              </div>
              <div>
                <StyledFormLabel>Color</StyledFormLabel>
                <StyledFormControl
                  type="text"
                  placeholder="Ej: Rojo, Azul"
                  value={advancedSearch.color}
                  onChange={(e) => handleSearchChange("color", e.target.value)}
                  onKeyDown={handleEnter}
                />
              </div>
            </SearchGrid>

            <Divider />

            <SectionLabel>Filtros locales</SectionLabel>
            <SearchGrid>
              <div>
                <StyledFormLabel>Tipo de Usuario</StyledFormLabel>
                <StyledFormSelect
                  value={filterUserType}
                  onChange={(e) => setFilterUserType(e.target.value)}
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
                  value={filterOrderState}
                  onChange={(e) => setFilterOrderState(e.target.value)}
                >
                  {orderStates.map((state) => (
                    <option key={state} value={state}>
                      {state === "Todos" ? "Todos los estados" : state}
                    </option>
                  ))}
                </StyledFormSelect>
              </div>
            </SearchGrid>

            <div className="mt-3 d-flex gap-2 align-items-center flex-wrap">
              <SearchButton onClick={applySearch}>
                <i className="bi bi-search me-1"></i> Buscar
              </SearchButton>
              <ClearButton onClick={clearSearch}>
                <i className="bi bi-x-circle me-1"></i> Limpiar
              </ClearButton>
              {hasActiveFilters && (
                <div className="d-flex flex-wrap align-items-center">
                  <span className="text-muted small me-2">
                    Filtros activos:
                  </span>
                  {committedSearch.codigoOrder && (
                    <FilterTag>Orden: {committedSearch.codigoOrder}</FilterTag>
                  )}
                  {committedSearch.name && (
                    <FilterTag>Modelo: {committedSearch.name}</FilterTag>
                  )}
                  {committedSearch.size && (
                    <FilterTag>Talla: {committedSearch.size}</FilterTag>
                  )}
                  {committedSearch.color && (
                    <FilterTag>Color: {committedSearch.color}</FilterTag>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </SearchContainer>

      {loading && <Spinner animation="border" variant="info" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && dataToShow.length === 0 && (
        <p className="pt-3">
          No hay órdenes que mostrar para los filtros seleccionados.
        </p>
      )}

      {!loading && !error && dataToShow.length > 0 && (
        <OrdersTableAdmin orders={dataToShow} />
      )}
    </div>
  );
};
