import { Card, Col, Row, Button, Image, Alert, Form } from "react-bootstrap";
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
  const [cedulaNit, setCedulaNit] = useState("");
  const [telefonoContacto, setTelefonoContacto] = useState(user?.celular || "");

  // Estados para usuarios invitados (sin cuenta)
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [direccionEnvio, setDireccionEnvio] = useState("");

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
        (element.isPromoted
          ? element.pricePromoted
          : user
          ? element.price
          : element.normalPrice) * element.quantity;
    });
    return total;
  };

  const calcularCostoEnvio = () => {
    switch (tipoEnvio) {
      case "contraentrega":
        return 25000;
      case "pagoAnticipado":
        return 18000;
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
                      {(user?.tipoUsuario === "Cliente" || !user) && (
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
                                  id="pagoAnticipado"
                                  value="pagoAnticipado"
                                  checked={tipoEnvio === "pagoAnticipado"}
                                  onChange={() =>
                                    handleTipoEnvioChange("pagoAnticipado")
                                  }
                                />
                                <label
                                  className="form-check-label w-100"
                                  htmlFor="pagoAnticipado"
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>
                                        <i className="bi bi-credit-card me-2"></i>
                                        Pago Anticipado
                                      </strong>
                                      <br />
                                      <small className="text-muted">
                                        Paga ahora y recibe con descuento en
                                        envío
                                      </small>
                                    </div>
                                    <span className="badge bg-info">
                                      +$18,000
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>

                            {/* Campos adicionales para información de contacto */}
                            {/* Solo mostrar si: usuario invitado (siempre) O usuario autenticado con envío (no tienda) */}
                            {(!user || (user && tipoEnvio !== "tienda")) && (
                              <div className="mt-4">
                                <h6 className="mb-3">
                                  <i className="bi bi-person-lines-fill me-2"></i>
                                  Información de contacto
                                </h6>
                                <div className="row g-3">
                                  <div className="col-md-6">
                                    <Form.Label htmlFor="cedulaNit">
                                      Cédula o NIT{" "}
                                      <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                      id="cedulaNit"
                                      type="text"
                                      placeholder="Ingresa tu cédula o NIT"
                                      value={cedulaNit}
                                      onChange={(e) =>
                                        setCedulaNit(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <Form.Label htmlFor="telefonoContacto">
                                      Teléfono de contacto{" "}
                                      <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                      id="telefonoContacto"
                                      type="tel"
                                      placeholder="Ingresa tu teléfono"
                                      value={telefonoContacto}
                                      onChange={(e) =>
                                        setTelefonoContacto(e.target.value)
                                      }
                                      required
                                    />
                                    <Form.Text className="text-muted">
                                      Se usará para coordinar la entrega
                                    </Form.Text>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Información adicional para usuarios invitados */}
                            {!user && (
                              <div className="mt-4">
                                <h6>
                                  <i className="bi bi-person me-2"></i>
                                  Información personal
                                </h6>
                                <div className="mt-3">
                                  <div className="row g-3">
                                    <div className="col-md-6">
                                      <Form.Label htmlFor="guestName">
                                        Nombre completo{" "}
                                        <span className="text-danger">*</span>
                                      </Form.Label>
                                      <Form.Control
                                        id="guestName"
                                        type="text"
                                        placeholder="Ingresa tu nombre completo"
                                        value={guestName}
                                        onChange={(e) =>
                                          setGuestName(e.target.value)
                                        }
                                        required
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <Form.Label htmlFor="guestEmail">
                                        Correo electrónico{" "}
                                        <span className="text-danger">*</span>
                                      </Form.Label>
                                      <Form.Control
                                        id="guestEmail"
                                        type="email"
                                        placeholder="Ingresa tu correo electrónico"
                                        value={guestEmail}
                                        onChange={(e) =>
                                          setGuestEmail(e.target.value)
                                        }
                                        required
                                      />
                                    </div>
                                    {/* Solo mostrar dirección si requiere envío */}
                                    {requiereSeleccionDireccion && (
                                      <div className="col-12">
                                        <Form.Label htmlFor="direccionEnvio">
                                          Dirección de entrega{" "}
                                          <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control
                                          id="direccionEnvio"
                                          type="text"
                                          placeholder="Ingresa la dirección completa de entrega"
                                          value={direccionEnvio}
                                          onChange={(e) =>
                                            setDireccionEnvio(e.target.value)
                                          }
                                          required
                                        />
                                        <Form.Text className="text-muted">
                                          Incluye dirección, ciudad,
                                          departamento y código postal si aplica
                                        </Form.Text>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Selección de dirección para usuarios autenticados con envío */}
                            {user && requiereSeleccionDireccion && (
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
                                    <div className="mt-2">
                                      <Button
                                        variant="link"
                                        className="p-0 text-decoration-none"
                                        onClick={() =>
                                          navigate("/profile?tab=direcciones")
                                        }
                                      >
                                        <i className="bi bi-plus-circle me-1"></i>
                                        Agregar nueva dirección
                                      </Button>
                                    </div>
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
                        user?.tipoUsuario === "Cliente" || !user
                          ? calcularTotalConEnvio
                          : calcularTotal
                      }
                      calcularCostoEnvio={
                        user?.tipoUsuario === "Cliente" || !user
                          ? calcularCostoEnvio
                          : () => 0
                      }
                      tipoEnvio={
                        user?.tipoUsuario === "Cliente" || !user
                          ? tipoEnvio
                          : null
                      }
                      direccionSeleccionada={
                        user?.tipoUsuario === "Cliente" || !user
                          ? direccionSeleccionada
                          : null
                      }
                      direccionesUsuario={
                        user?.tipoUsuario === "Cliente" || !user
                          ? user?.directions || []
                          : []
                      }
                      cedulaNit={
                        (user?.tipoUsuario === "Cliente" || !user) &&
                        (!user || tipoEnvio !== "tienda")
                          ? cedulaNit
                          : ""
                      }
                      telefonoContacto={
                        (user?.tipoUsuario === "Cliente" || !user) &&
                        (!user || tipoEnvio !== "tienda")
                          ? telefonoContacto
                          : ""
                      }
                      // Campos para usuarios invitados
                      guestName={!user ? guestName : ""}
                      guestEmail={!user ? guestEmail : ""}
                      direccionEnvio={!user ? direccionEnvio : ""}
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
