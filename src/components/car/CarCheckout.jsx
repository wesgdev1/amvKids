/* eslint-disable react/prop-types */ // Deshabilitar temporalmente validación de props
import Swal from "sweetalert2";
import { ButtonPayment, CardChekoutStyle } from "./StyledComponent";
import { Card, Spinner, Tooltip, OverlayTrigger, Alert } from "react-bootstrap";
import { useContext, useState } from "react";
import { createOrder } from "../../api/orders/orders";
import AddiWidget from "../payments/AddiWidget";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";

export const CarCheckout = ({
  calcularTotal,
  calcularTotalConEnvio,
  calcularCostoEnvio,
  tipoEnvio,
  direccionSeleccionada,
  direccionesUsuario,
  dispatch,
  state,
}) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const obtenerDireccionCompleta = () => {
    console.log(direccionesUsuario);
    console.log(direccionSeleccionada);
    if (!tipoEnvio || tipoEnvio === "tienda") {
      return null;
    }

    const direccion = direccionesUsuario.find(
      (dir) => dir.id === direccionSeleccionada
    );
    console.log(direccion);
    return direccion || null;
  };

  const obtenerNombreTipoEnvio = () => {
    if (!tipoEnvio) {
      return "Envío estándar";
    }

    switch (tipoEnvio) {
      case "contraentrega":
        return "Contraentrega";
      case "contraentregaAnticipado":
        return "Contraentrega Pago Anticipado";
      case "tienda":
      default:
        return "Recoger en tienda";
    }
  };

  const validarPedido = () => {
    // Solo validar direcciones para usuarios tipo Cliente con envío
    if (tipoEnvio && tipoEnvio !== "tienda" && !direccionSeleccionada) {
      Swal.fire({
        icon: "warning",
        title: "Dirección requerida",
        text: "Por favor selecciona una dirección de entrega para continuar.",
        confirmButtonText: "Entendido",
      });
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validarPedido()) {
      return;
    }

    try {
      setLoading(true);

      const direccionEnvio = obtenerDireccionCompleta();

      const payload = {
        total: calcularTotalConEnvio(),
        comments,
        formaOrder: tipoEnvio || "estandar",
        directionOrder: direccionEnvio
          ? direccionEnvio.address +
            "- " +
            direccionEnvio.city +
            " " +
            direccionEnvio.state +
            " " +
            direccionEnvio.zipCode
          : null,
        costoEnvio: calcularCostoEnvio(),
        items: state.map((element) => {
          return {
            modelId: element.id,
            // pasar a number el size
            size: Number(element.size),

            quantity: element.quantity,
            price: element.price, // Asumiendo que 'price' es un campo en el item
            normalPrice: element.normalPrice, // Asumiendo que 'normalPrice' es un campo en el item
            alliancePrice: element.alliancePrice, // Asumiendo que 'alliancePrice' es un campo en el item
            basePrice: element.basePrice || 0, // Asumiendo que 'basePrice' es un campo en el item
            isPromoted: element.isPromoted, // Asumiendo que 'isPromoted' es un campo en el item
            pricePromoted: element.pricePromoted || 0,
          };
        }),
      };

      let response = await createOrder(payload);
      console.log("envie la orden", response);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Compra exitosa",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      }
      setLoading(false);

      dispatch({
        type: "DELETE_ALL",
      });
      navigate("/profile/myOrders");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Error al realizar la compra, ${error.message}`,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
    }
  };

  return (
    <CardChekoutStyle>
      <Card.Body>
        <Card.Text>Resumen del pedido</Card.Text>

        {/* Información del tipo de envío - Solo para Clientes */}
        {tipoEnvio && (
          <div className="mb-3 p-2 bg-light rounded">
            <small className="text-muted d-block">Tipo de envío:</small>
            <strong className="text-primary">{obtenerNombreTipoEnvio()}</strong>
            {tipoEnvio !== "tienda" && direccionSeleccionada && (
              <div className="mt-1 text-black">
                <small className="text-muted d-block">Dirección:</small>
                <small>
                  {obtenerDireccionCompleta()?.address},{" "}
                  {obtenerDireccionCompleta()?.city},{" "}
                  {obtenerDireccionCompleta()?.state}{" "}
                  {obtenerDireccionCompleta()?.zipCode}
                </small>
              </div>
            )}
          </div>
        )}

        <div className="d-flex justify-content-between">
          <p className="mb-2">Subtotal productos</p>
          <p className="mb-2">${calcularTotal().toLocaleString("es-CO")}</p>
        </div>

        {/* Solo mostrar costo de envío si hay información de envío */}
        {tipoEnvio && (
          <div className="d-flex justify-content-between">
            <p className="mb-2">Costo de envío</p>
            <p className="mb-2">
              {calcularCostoEnvio() === 0 ? (
                <span className="text-success">GRATIS</span>
              ) : (
                `$${calcularCostoEnvio().toLocaleString("es-CO")}`
              )}
            </p>
          </div>
        )}

        <div className="d-flex justify-content-between mb-4">
          <p className="mb-2">Descuento</p>
          <p className="mb-2">${0}</p>
        </div>

        <hr />

        <div className="d-flex justify-content-between mb-4">
          <p className="mb-2 fw-bold">Total a pagar</p>
          <p className="mb-2 fw-bold text-primary">
            ${calcularTotalConEnvio().toLocaleString("es-CO")}
          </p>
        </div>

        <Card.Text>Comentarios</Card.Text>
        <textarea
          className="w-100 text-black px-2 form-control mb-3"
          rows="3"
          placeholder="Instrucciones especiales, detalles de envío, etc."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>

        {/* Nota importante sobre el flujo */}
        <Alert variant="info" className="text-center small p-2 mb-3">
          <i className="bi bi-info-circle-fill me-2"></i>
          <strong>Importante:</strong> Primero haz clic en{" "}
          <strong>Realizar pedido</strong> para guardar tu orden. Luego podrás
          elegir cómo pagar.
        </Alert>

        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip id="tooltip-realizar-pedido">
              Haz clic para crear tu orden en el sistema. Podrás realizar el
              pago electrónico más tarde desde la sección &apos;Mis
              Pedidos&apos;.
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
        {user?.tipoUsuario !== "Reventa" &&
        user?.tipoUsuario !== "Tienda Aliada" ? (
          <>
            <AddiWidget
              price={String(calcularTotalConEnvio())}
              allySlug="amv"
            />
            <div className="mt-3 p-3 rounded-lg bg-light border text-center shadow-sm">
              <p className="text-muted small mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Para solicitudes de <strong>crédito Addi</strong>, visítanos
                directamente en tienda o contáctanos vía{" "}
                <i className="bi bi-whatsapp text-success"></i> WhatsApp.
              </p>
            </div>

            {/* Nuevo: Información Pagos Bold */}
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
          </>
        ) : null}

        {/* <AddiWidget price={"100000"} allySlug="sandbox" /> */}
        {/* <div>
          <h3>Generar Link de Pago con Bold</h3>
          <button onClick={handleGenerarLink}>Pagar con Bold</button>
          {link && (
            <p>
              Link generado:{" "}
              <a href={link} target="_blank">
                {link}
              </a>
            </p>
          )}
        </div> */}
        {/* <div id="bold-container" className="mt-3">
          realiza
          <BoldCheckout total={5000} orderId={1} />
        </div> */}

        {/* <addi-widget
          price="100000"
          ally-slug="amvstoreboutique-ecommerce"
        ></addi-widget> */}
      </Card.Body>
    </CardChekoutStyle>
  );
};
