import { Card, Col, Row, Button, Image, Alert } from "react-bootstrap";
import { useCart } from "../store";
import { CarCheckout } from "../components/car/CarCheckout";
import { CardElements } from "../components/car/CardElements";
import { Continue } from "../components/car/Continue";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";

export const CarList = () => {
  const { state, dispatch } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estados para manejo de envío
  const [tipoEnvio, setTipoEnvio] = useState("tienda");
  const [direccionSeleccionada, setDireccionSeleccionada] = useState("");

  const calcularTotalCarrito = () => {
    let total = 0;
    state.forEach((element) => {
      total += element.quantity;
    });
    return total;
  };

  const calcularTotal = () => {
    let total = 0;
    state.forEach((element) => {
      total +=
        (element.isPromoted ? element.pricePromoted : element.price) *
        element.quantity;
    });
    return total;
  };

  const calcularCostoEnvio = () => {
    switch (tipoEnvio) {
      case "contraentrega":
        return 25000;
      case "contraentregaAnticipado":
        return 15000;
      case "tienda":
      default:
        return 0;
    }
  };

  const calcularTotalConEnvio = () => {
    return calcularTotal() + calcularCostoEnvio();
  };

  const handleTipoEnvioChange = (tipo) => {
    setTipoEnvio(tipo);
    if (tipo === "tienda") {
      setDireccionSeleccionada("");
    }
  };

  const requiereSeleccionDireccion = tipoEnvio !== "tienda";
  const tienesDirecciones = user?.directions && user.directions.length > 0;

  return (
    <section>
      <div className="pt-5 mb-5">
        <Card className="mx-3">
          <Card.Body className="p-4">
            <Continue />

            <h3 className="text-center my-4 fw-light">
              Tu Selección Exclusiva ✨
            </h3>

            <hr className="pb-4" />
            {state.length > 0 ? (
              <>
                <Alert
                  variant="warning"
                  className="text-center small p-2 mb-4 mx-lg-5"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>¡Recuerda!</strong> Solo hacer clic en{" "}
                  <strong>Realizar pedido</strong> reserva tu calzado. Tenerlo
                  en el carrito no asegura disponibilidad.
                </Alert>

                <div className="flex justify-center flex-wrap gap-5">
                  <div className="">
                    <p>
                      Tienes ({calcularTotalCarrito()}) productos en tu carrito
                      de compras
                    </p>
                    {state.map((model, index) => (
                      <div key={index}>
                        <Row className="align-items-center">
                          <Col>
                            <CardElements model={model} dispatch={dispatch} />
                          </Col>
                        </Row>
                      </div>
                    ))}

                    <div className="mt-4">
                      {/* Sección de selección de tipo de envío - Solo para Clientes */}
                      {user?.tipoUsuario === "Cliente" && (
                        <Card className="mb-4">
                          <Card.Header className="bg-light">
                            <h5 className="mb-0">
                              <i className="bi bi-truck me-2"></i>
                              Selecciona el tipo de envío
                            </h5>
                          </Card.Header>
                          <Card.Body>
                            <div className="d-flex flex-column gap-3">
                              {/* Opción Recoger en tienda */}
                              <div className="form-check p-3 border rounded">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="tipoEnvio"
                                  id="tienda"
                                  value="tienda"
                                  checked={tipoEnvio === "tienda"}
                                  onChange={() =>
                                    handleTipoEnvioChange("tienda")
                                  }
                                />
                                <label
                                  className="form-check-label w-100"
                                  htmlFor="tienda"
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>
                                        <i className="bi bi-shop me-2"></i>
                                        Recoger en tienda
                                      </strong>
                                      <br />
                                      <small className="text-muted">
                                        Recoge tu pedido directamente en nuestra
                                        tienda física
                                      </small>
                                    </div>
                                    <span className="badge bg-success">
                                      GRATIS
                                    </span>
                                  </div>
                                </label>
                              </div>

                              {/* Opción Contraentrega */}
                              <div className="form-check p-3 border rounded">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="tipoEnvio"
                                  id="contraentrega"
                                  value="contraentrega"
                                  checked={tipoEnvio === "contraentrega"}
                                  onChange={() =>
                                    handleTipoEnvioChange("contraentrega")
                                  }
                                />
                                <label
                                  className="form-check-label w-100"
                                  htmlFor="contraentrega"
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>
                                        <i className="bi bi-cash-coin me-2"></i>
                                        Contraentrega
                                      </strong>
                                      <br />
                                      <small className="text-muted">
                                        Paga cuando recibas tu pedido en casa
                                      </small>
                                    </div>
                                    <span className="badge bg-warning">
                                      +$25,000
                                    </span>
                                  </div>
                                </label>
                              </div>

                              {/* Opción Contraentrega Pago Anticipado */}
                              <div className="form-check p-3 border rounded">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="tipoEnvio"
                                  id="contraentregaAnticipado"
                                  value="contraentregaAnticipado"
                                  checked={
                                    tipoEnvio === "contraentregaAnticipado"
                                  }
                                  onChange={() =>
                                    handleTipoEnvioChange(
                                      "contraentregaAnticipado"
                                    )
                                  }
                                />
                                <label
                                  className="form-check-label w-100"
                                  htmlFor="contraentregaAnticipado"
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>
                                        <i className="bi bi-credit-card me-2"></i>
                                        Contraentrega Pago Anticipado
                                      </strong>
                                      <br />
                                      <small className="text-muted">
                                        Paga ahora y recibe con descuento en
                                        envío
                                      </small>
                                    </div>
                                    <span className="badge bg-info">
                                      +$15,000
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>

                            {/* Selección de dirección si se requiere */}
                            {requiereSeleccionDireccion && (
                              <div className="mt-4">
                                <h6>
                                  <i className="bi bi-geo-alt me-2"></i>
                                  Dirección de entrega
                                </h6>

                                {tienesDirecciones ? (
                                  <div className="mt-3">
                                    <select
                                      className="form-select"
                                      value={direccionSeleccionada}
                                      onChange={(e) =>
                                        setDireccionSeleccionada(e.target.value)
                                      }
                                      required
                                    >
                                      <option value="">
                                        Selecciona una dirección
                                      </option>
                                      {user.directions.map((direccion) => (
                                        <option
                                          key={direccion.id}
                                          value={direccion.id}
                                        >
                                          {direccion.address}, {direccion.city},{" "}
                                          {direccion.state}
                                          {direccion.zipCode &&
                                            ` - ${direccion.zipCode}`}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ) : (
                                  <Alert variant="warning" className="mt-3">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    No tienes direcciones registradas.{" "}
                                    <Button
                                      variant="link"
                                      className="p-0 align-baseline"
                                      onClick={() =>
                                        navigate("/profile?tab=direcciones")
                                      }
                                    >
                                      Agregar dirección aquí
                                    </Button>
                                  </Alert>
                                )}
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      )}
                    </div>
                  </div>
                  <Col className="col-12 col-lg-4">
                    <CarCheckout
                      state={state}
                      calcularTotal={calcularTotal}
                      calcularTotalConEnvio={
                        user?.tipoUsuario === "Cliente"
                          ? calcularTotalConEnvio
                          : calcularTotal
                      }
                      calcularCostoEnvio={
                        user?.tipoUsuario === "Cliente"
                          ? calcularCostoEnvio
                          : () => 0
                      }
                      tipoEnvio={
                        user?.tipoUsuario === "Cliente" ? tipoEnvio : null
                      }
                      direccionSeleccionada={
                        user?.tipoUsuario === "Cliente"
                          ? direccionSeleccionada
                          : null
                      }
                      direccionesUsuario={
                        user?.tipoUsuario === "Cliente"
                          ? user?.directions || []
                          : []
                      }
                      dispatch={dispatch}
                    />
                  </Col>
                </div>
              </>
            ) : (
              <div className="text-center py-5 d-flex flex-column align-items-center">
                <Image
                  src="https://res.cloudinary.com/dppqkypts/image/upload/v1745961207/ChatGPT_Image_29_abr_2025_04_13_10_p.m._uoefiq.png"
                  alt="Carrito Vacío"
                  fluid
                  style={{ maxWidth: "250px", marginBottom: "2rem" }}
                />
                <h4 className="text-muted mb-3">Tu carrito está vacío</h4>
                <p className="text-secondary mb-4">
                  Parece que aún no has añadido ningún producto.
                </p>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/productos")}
                  className="btn-lg"
                >
                  <i className="bi bi-box-seam me-2"></i> Ver Productos
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};
