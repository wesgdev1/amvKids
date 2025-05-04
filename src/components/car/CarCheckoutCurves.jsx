// import Swal from "sweetalert2"; // No usado por ahora
import { ButtonPayment, CardChekoutStyle } from "./StyledComponent";
// import { Card, Spinner } from "react-bootstrap"; // Spinner no usado por ahora
import { Card } from "react-bootstrap";
// import { useContext, useState } from "react"; // useContext no usado
import { useState } from "react";
import AddiWidget from "../payments/AddiWidget";

export const CarCheckoutCurves = ({
  calcularTotal,
  /* dispatch, state, */ onRealizarPedido,
}) => {
  const [comments, setComments] = useState("");

  const handleCheckout = () => {
    if (typeof onRealizarPedido === "function") {
      // Pasamos comments por si la función los necesita eventualmente
      onRealizarPedido(comments);
    } else {
      console.error("onRealizarPedido no es una función!");
    }
  };
  return (
    <CardChekoutStyle>
      <Card.Body>
        <Card.Title className="mb-3">Resumen del Pedido</Card.Title>
        <div className="d-flex justify-content-between">
          <p className="mb-2">Subtotal</p>
          <p className="mb-2">
            {calcularTotal().toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
          </p>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <p className="mb-2 fw-bold">Total</p>
          <p className="mb-2 fw-bold">
            {calcularTotal().toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
          </p>
        </div>
        <Card.Text className="fw-semibold">Comentarios (Opcional)</Card.Text>
        <textarea
          className="w-100 text-black px-2 form-control mb-3"
          rows="3"
          placeholder="Instrucciones especiales, detalles de envío, etc."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>
        <ButtonPayment onClick={handleCheckout}>Realizar pedido</ButtonPayment>

        <AddiWidget
          price={String(calcularTotal())}
          allySlug="amvstoreboutique-social"
        />
      </Card.Body>
    </CardChekoutStyle>
  );
};
