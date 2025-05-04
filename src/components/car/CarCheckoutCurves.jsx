// import Swal from "sweetalert2"; // No usado por ahora
import { ButtonPayment, CardChekoutStyle } from "./StyledComponent";
// import { Card, Spinner } from "react-bootstrap"; // Spinner no usado por ahora
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
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
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="tooltip-realizar-pedido">
              Haz clic para crear tu orden en el sistema. Podrás realizar el
              pago electrónico más tarde desde la sección 'Mis Pedidos'.
            </Tooltip>
          }
        >
          <ButtonPayment onClick={handleCheckout} disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Realizar pedido"
            )}
          </ButtonPayment>
        </OverlayTrigger>

        <AddiWidget
          price={String(calcularTotal())}
          allySlug="amvstoreboutique-social"
        />

        {/* Nota informativa sobre Addi */}
        <div className="mt-3 p-3 rounded-lg bg-light border text-center shadow-sm">
          <p className="text-muted small mb-0">
            <i className="bi bi-info-circle me-2"></i>
            Para solicitudes de <strong>crédito Addi</strong>, visítanos
            directamente en tienda o contáctanos vía{" "}
            <i className="bi bi-whatsapp text-success"></i> WhatsApp.
          </p>
        </div>

        <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-200 text-center shadow-sm">
          <p className="text-primary fw-semibold mb-2">
            <i className="bi bi-shield-check me-2"></i>
            Paga seguro con Bold
          </p>
          <p className="text-muted small mb-0 d-flex flex-wrap justify-content-center align-items-center gap-3">
            <span>
              <i className="bi bi-credit-card me-1"></i>Tarjetas
            </span>
            <span>
              <i className="bi bi-bank me-1"></i>PSE
            </span>
            <span>Nequi</span> {/* No hay icono obvio */}
            <span>Bancolombia</span> {/* No hay icono obvio */}
            {/* Puedes añadir más si Bold los soporta */}
          </p>
        </div>
      </Card.Body>
    </CardChekoutStyle>
  );
};
