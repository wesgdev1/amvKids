import Swal from "sweetalert2";
import { ButtonPayment, CardChekoutStyle } from "./StyledComponent";
import { Card } from "react-bootstrap";

export const CarCheckout = ({ calcularTotal, dispatch }) => {
  const handleCheckout = () => {
    // aqui envio la informacion al backend
    // luego alerta de compra exitosa o algo asi
    // y luego limpio el carrito

    Swal.fire({
      icon: "success",
      title: "Compra exitosa",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });

    dispatch({
      type: "DELETE_ALL",
    });
  };
  return (
    <CardChekoutStyle>
      <Card.Body>
        <Card.Text>Cuenta </Card.Text>
        <div className="d-flex justify-content-between">
          <p className="mb-2">Subtotal</p>
          <p className="mb-2">${calcularTotal().toLocaleString("es-CO")}</p>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <p className="mb-2">Descuento</p>

          <p className="mb-2">${0}</p>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <p className="mb-2">Total</p>

          <p className="mb-2">${calcularTotal().toLocaleString("es-CO")}</p>
        </div>
        <ButtonPayment onClick={handleCheckout}>Realizar pedido</ButtonPayment>
      </Card.Body>
    </CardChekoutStyle>
  );
};
