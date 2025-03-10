import { useNavigate, useParams } from "react-router-dom";
import { useOrders } from "../../domain/orders/useOrders";
import { useState } from "react";
import { Alert, Form, Spinner } from "react-bootstrap";
import { ButtonProfile, ControlButton } from "../products/StyledComponents";
import { OrdersTable } from "./OrdersTableByUser";
import { useOrdersByUser } from "../../domain/orders/useOrdersByUser";
import { OrdersTableAdmin } from "../orders/OrdersTableAdmin";

export const OrderListByUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { idUser } = params;
  console.log("usuariopapa", idUser);
  const { data, loading, error, cargarOrders } = useOrdersByUser({
    userId: idUser,
  });
  const handleClick = () => {
    console.log("Agregar orden");
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

      const filter = data?.filter((order) => {
        return order.codigoOrder == searchValue;
      });
      setFilteredData(filter);
      setNotificacion(filter.length === 0);
      setSearchValue("");
    }
  };
  return (
    <div className="pt-5 px-4">
      <ControlButton onClick={() => navigate(-1)} className="mb-3">
        <i className="bi bi-arrow-return-left">Regresar</i>
      </ControlButton>
      <h4 className="pb-3">
        <i className="bi bi-receipt-cutoff"></i> Ordenes del Usuario
      </h4>

      {/* boton de regresar */}

      <div>
        <Form.Control
          type="search"
          size="sm"
          placeholder="Buscar por codigo de orden "
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
          <OrdersTable orders={filteredData} />
        </>
      ) : data?.length > 0 ? (
        <OrdersTableAdmin orders={data} />
      ) : (
        <div className="pt-10">
          {" "}
          Este usuario
          <strong> no tiene ordenes</strong> creadas.
        </div>
      )}
    </div>
  );
};
