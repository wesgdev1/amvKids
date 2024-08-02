import { ButtonPayment, CardChekoutStyle } from "./StyledComponent";
import { Card } from "react-bootstrap";

export const CarCheckout = () => {
  return (
    <CardChekoutStyle>
      <Card.Body>
        <Card.Text>Cuenta</Card.Text>
        <div className="d-flex justify-content-between">
          <p className="mb-2">Subtotal</p>
          <p className="mb-2">${10000}</p>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <p className="mb-2">Total</p>
          <p className="mb-2">${10000}</p>
        </div>
        <ButtonPayment>Realizar pedido</ButtonPayment>
      </Card.Body>
    </CardChekoutStyle>
  );
};
