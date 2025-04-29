import { useState, useEffect } from "react";
import { Alert, Form, Spinner } from "react-bootstrap";
import { ButtonProfile } from "../products/StyledComponents";
import { useOrderAdmin } from "../../domain/orders/useOrderAdmin";
import { OrdersTablePreparer } from "./OrdersTablePreparer";

export const OrderPreparer = () => {
  const { data, loading, error, cargarOrders } = useOrderAdmin();

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notificacion, setNotificacion] = useState(false);
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();

      const filter = data?.filter((order) => {
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

  // useEffect para recargar datos cada 20 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Recargando órdenes..."); // Opcional: para verificar en consola
      cargarOrders();
    }, 20000); // 20000 ms = 20 segundos

    // Función de limpieza para detener el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [cargarOrders]); // Dependencia para asegurar que se use la última función cargarOrders

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-receipt-cutoff"></i> Ordenes de apartado
      </h4>

      <div>
        <Form.Control
          type="search"
          size="sm"
          placeholder="Buscar por codigo de orden - codigo de revendedor - nombre de revendedor"
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
          <OrdersTablePreparer orders={filteredData} />
        </>
      ) : data?.length > 0 ? (
        <OrdersTablePreparer orders={data} />
      ) : (
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
      )}
    </div>
  );
};
