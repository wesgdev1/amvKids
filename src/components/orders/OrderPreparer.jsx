import { useState, useEffect, useMemo } from "react";
import { Alert, Form, Spinner, Badge, Row, Col } from "react-bootstrap";
import { ButtonProfile } from "../products/StyledComponents";
import { OrdersTablePreparer } from "./OrdersTablePreparer";
import { useOrderPreparer } from "../../domain/orders/useOrderPreparer";

// CSS para la animación del badge de notificación
const pulseAnimation = `
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 8px rgba(220, 53, 69, 0);
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
    }
  }
  .pulse-badge {
    animation: pulse 1.5s infinite;
  }
`;

export const OrderPreparer = () => {
  const { data, loading, error, cargarOrders } = useOrderPreparer();

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notificacion, setNotificacion] = useState(false);

  // New states for filtering and sorting
  const [filterStatus, setFilterStatus] = useState("todos");
  const [sortByDate, setSortByDate] = useState("desc");
  const [ordersToPrepareCount, setOrdersToPrepareCount] = useState(0);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value !== "") {
        const filter = data?.filter((order) => {
          return (
            order.codigoOrder == searchValue ||
            (order.user && order.user.codigo == searchValue) ||
            (order.user &&
              order.user.name.toLowerCase().includes(searchValue.toLowerCase()))
          );
        });
        setFilteredData(filter || []);
        setNotificacion((filter || []).length === 0);
      } else {
        setFilteredData([]);
        setNotificacion(false);
      }
    }
  };

  useEffect(() => {
    if (data) {
      const count = data.filter((order) => order.areReady === false).length;
      setOrdersToPrepareCount(count);
    }
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      cargarOrders();
    }, 20000);
    return () => clearInterval(intervalId);
  }, [cargarOrders]);

  const resetAllFilters = () => {
    setSearchValue("");
    setFilteredData([]);
    setNotificacion(false);
    setFilterStatus("todos");
    setSortByDate("desc");
  };

  const displayedOrders = useMemo(() => {
    let ordersToDisplay =
      filteredData.length > 0 || (searchValue && notificacion)
        ? [...filteredData]
        : data
        ? [...data]
        : [];

    if (filterStatus === "creados") {
      ordersToDisplay = ordersToDisplay.filter(
        (order) => order.areReady === false
      );
    } else if (filterStatus === "listos") {
      ordersToDisplay = ordersToDisplay.filter(
        (order) => order.areReady === true
      );
    }

    ordersToDisplay.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return sortByDate === "asc" ? dateA - dateB : dateB - dateA;
    });

    return ordersToDisplay;
  }, [data, filteredData, searchValue, notificacion, filterStatus, sortByDate]);

  const showNoResultsMessage =
    !loading &&
    !error &&
    displayedOrders.length === 0 &&
    (searchValue !== "" || filterStatus !== "todos" || filteredData.length > 0);

  return (
    <div className="pt-5 px-4">
      <style>{pulseAnimation}</style>
      <div className="d-flex align-items-center mb-3">
        <h4 className="mb-0 me-3">
          <i className="bi bi-receipt-cutoff"></i> Ordenes de apartado
        </h4>
        {ordersToPrepareCount > 0 && (
          <Badge
            pill
            bg="danger"
            className="pulse-badge d-flex align-items-center"
          >
            <i className="bi bi-exclamation-triangle-fill me-1"></i>
            {ordersToPrepareCount} por alistar
          </Badge>
        )}
      </div>

      <Row className="mb-3 gx-2">
        <Col md={6} lg={5}>
          <Form.Control
            type="search"
            size="sm"
            placeholder="Buscar por código orden/revendedor, nombre revendedor..."
            className="me-2"
            aria-label="Search"
            onChange={handleInputChange}
            onKeyDown={onSearch}
            value={searchValue}
          />
        </Col>
        <Col md={3} lg={2}>
          <Form.Select
            size="sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filtrar por estado"
          >
            <option value="todos">Todos los estados</option>
            <option value="creados">Creados (Pendientes)</option>
            <option value="listos">Listos</option>
          </Form.Select>
        </Col>
        <Col md={3} lg={2}>
          <Form.Select
            size="sm"
            value={sortByDate}
            onChange={(e) => setSortByDate(e.target.value)}
            aria-label="Ordenar por fecha"
          >
            <option value="desc">Más recientes</option>
            <option value="asc">Más antiguos</option>
          </Form.Select>
        </Col>
        {(searchValue ||
          filterStatus !== "todos" ||
          filteredData.length > 0) && (
          <Col
            md={12}
            lg={3}
            className="mt-2 mt-lg-0 d-flex justify-content-lg-end"
          >
            <ButtonProfile
              size="sm"
              onClick={resetAllFilters}
              variant="outline-secondary"
            >
              <i className="bi bi-x-circle me-1"></i> Limpiar filtros
            </ButtonProfile>
          </Col>
        )}
      </Row>

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" variant="info" />
        </div>
      )}
      {error && (
        <Alert variant="danger">{error.message || JSON.stringify(error)}</Alert>
      )}

      {showNoResultsMessage ? (
        <div className="text-center pt-3">
          <p>No se encontraron resultados para los filtros aplicados.</p>
          <ButtonProfile onClick={resetAllFilters}>
            Mostrar todas las órdenes
          </ButtonProfile>
        </div>
      ) : displayedOrders.length > 0 ? (
        <>
          {(filteredData.length > 0 || (searchValue && notificacion)) && (
            <p className="pt-2 text-muted small">
              Resultados de búsqueda: ({filteredData.length}) coincidencias.
              {displayedOrders.length !== filteredData.length &&
                ` Mostrando ${displayedOrders.length} tras aplicar filtros adicionales.`}
            </p>
          )}
          <OrdersTablePreparer orders={displayedOrders} />
        </>
      ) : !loading && !error ? (
        <div className="d-flex flex-column align-items-center justify-content-center text-center pt-5 pb-4">
          <img
            src="https://res.cloudinary.com/dppqkypts/image/upload/v1745958810/29_abr_2025_03_33_08_p.m._by1awa.png"
            alt="No hay ordenes pendientes"
            style={{
              maxWidth: "250px",
              marginBottom: "1.5rem",
              filter: "grayscale(50%)",
            }}
          />
          <h5 className="text-muted">
            No tienes órdenes pendientes por alistar
          </h5>
          <p className="text-secondary small">
            ¡Buen trabajo manteniéndote al día!
          </p>
        </div>
      ) : null}
    </div>
  );
};
