import { Card, Col, Row, Button, Image } from "react-bootstrap";
import { CarCheckoutCurves } from "../components/car/CarCheckoutCurves";
import { Continue } from "../components/car/Continue";
import { useNavigate } from "react-router-dom";
import { useCartCurvas } from "../store/curvas";
import { useState } from "react";
import Swal from "sweetalert2";
import { createOrder } from "../api/orders/orders";

export const CarListCurves = () => {
  const { state, dispatch } = useCartCurvas();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calcularTotalCurvas = () => {
    return state.reduce((acc, item) => acc + item.quantity, 0);
  };

  const calcularTotalPrecio = () => {
    return state.reduce(
      (acc, item) => acc + item.precioCurva * item.quantity,
      0
    );
  };

  const handleRealizarPedido = async (comments) => {
    if (state.length === 0) {
      Swal.fire(
        "Carrito vacío",
        "No puedes realizar un pedido sin items.",
        "warning"
      );
      return;
    }

    setIsSubmitting(true);
    Swal.fire({
      title: "Procesando tu pedido...",
      text: "Por favor espera.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const payload = {
      total: calcularTotalPrecio(),
      comments: comments || "",
      typeOrder: "Curva",
      items: state.map((item) => ({
        id: item.id,
        name: item.name,
        color: item.color,
        tipoCurva: item.tipoCurva,
        precioCurva: item.precioCurva,
        detalleCurva: item.detalleCurva,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
        size: 0,
      })),
    };

    console.log("Enviando payload de curvas:", payload);

    try {
      const response = await createOrder(payload);
      console.log("Respuesta de createOrder:", response);

      Swal.close();
      await Swal.fire({
        icon: "success",
        title: "¡Pedido Realizado!",
        text: `Tu pedido de curvas ha sido creado con éxito. Código: ${
          response?.codigoOrder || "N/A"
        }`,
        timer: 3000,
        timerProgressBar: true,
      });

      dispatch({ type: "DELETE_ALL" });
      navigate("/profile/myOrders");
    } catch (error) {
      console.error("Error al crear la orden:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error al realizar el pedido",
        text:
          error.message ||
          "Ocurrió un problema inesperado. Inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="pt-5 mb-5">
        <Card className="mx-3">
          <Card.Body className="p-4">
            <Continue />
            <hr className="pb-4" />

            {state.length === 0 ? (
              <div className="text-center py-5 d-flex flex-column align-items-center">
                <Image
                  src="https://res.cloudinary.com/dppqkypts/image/upload/v1745961207/ChatGPT_Image_29_abr_2025_04_13_10_p.m._uoefiq.png"
                  alt="Carrito Vacío"
                  fluid
                  style={{ maxWidth: "250px", marginBottom: "2rem" }}
                />
                <h4 className="text-muted mb-3">
                  Tu carrito de curvas está vacío
                </h4>
                <p className="text-secondary mb-4">
                  Añade algunas curvas desde los detalles del producto.
                </p>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/productos")}
                  className="btn-lg"
                >
                  <i className="bi bi-box-seam me-2"></i> Ver Productos
                </Button>
              </div>
            ) : (
              <Row>
                <Col lg={8}>
                  <h5 className="mb-4">
                    Tienes ({calcularTotalCurvas()}) curvas en tu carrito.
                  </h5>
                  {state.map((item, index) => (
                    <Card
                      key={`${item.id}-${item.tipoCurva}-${index}`}
                      className="mb-3 shadow-sm"
                    >
                      <Card.Body>
                        <Row className="align-items-center g-3">
                          <Col xs={3} sm={2}>
                            <Image
                              src={
                                item.imageUrl ||
                                "https://res.cloudinary.com/dppqkypts/image/upload/v1700685111/david_sanchez_oigkwg.png"
                              }
                              alt={`${item.name} ${item.color}`}
                              thumbnail
                              fluid
                            />
                          </Col>
                          <Col xs={9} sm={6} md={7}>
                            <h6 className="mb-1">
                              {item.name} ({item.color})
                            </h6>
                            <p className="mb-1 text-muted small">
                              Curva: {item.tipoCurva}
                            </p>
                            <p className="mb-1 text-muted small">
                              Detalle: {item.detalleCurva}
                            </p>
                            <p className="mb-0 fw-semibold">
                              {item.precioCurva.toLocaleString("es-CO", {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 0,
                              })}{" "}
                              c/u
                            </p>
                          </Col>
                          <Col xs={12} sm={4} md={3} className="text-sm-end">
                            <div className="d-flex justify-content-start justify-content-sm-end align-items-center mb-2">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                className="px-2"
                                onClick={() =>
                                  dispatch({
                                    type: "DELETE_ONE",
                                    payload: { item },
                                  })
                                }
                              >
                                -
                              </Button>
                              <span className="mx-2 fw-bold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                className="px-2"
                                onClick={() =>
                                  dispatch({
                                    type: "ADD_TO_CART",
                                    payload: { item, quantity: 1 },
                                  })
                                }
                              >
                                +
                              </Button>
                            </div>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="mb-2"
                              onClick={() =>
                                dispatch({ type: "DELETE", payload: { item } })
                              }
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                            <p className="fw-bold mb-0">
                              {(
                                item.precioCurva * item.quantity
                              ).toLocaleString("es-CO", {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 0,
                              })}
                            </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
                <Col lg={4}>
                  <CarCheckoutCurves
                    state={state}
                    calcularTotal={calcularTotalPrecio}
                    dispatch={dispatch}
                    onRealizarPedido={handleRealizarPedido}
                    isSubmitting={isSubmitting}
                  />
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};
