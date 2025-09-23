import { useParams } from "react-router-dom";
import { useOrder } from "../../domain/orders/useOrder";
import { Alert, Badge, Card, Form, Spinner } from "react-bootstrap";
import { z } from "zod";
import { ErrorMessage, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

import { ButtonProfile, ControlButton } from "../products/StyledComponents";
import { linkPago, updateOrder } from "../../api/orders/orders";
import { ShoesCardStyledPayment } from "../StyledComponents";
import { AuthContext } from "../../auth/context/AuthContext";
import { ProgressBar } from "./ProgressBar";

const imageRqd = z.any().optional();

export const OrdeDetail = () => {
  const { user } = useContext(AuthContext);
  const copyToClipboardBC = () => {
    const accountNumber = "83200001513";
    navigator.clipboard.writeText(accountNumber).then(() => {
      console.log("Número de cuenta copiado al portapapeles");
    });
  };
  const copyToClipboardNe = () => {
    const accountNumber = "3123460008";
    navigator.clipboard.writeText(accountNumber).then(() => {
      console.log("Número de cuenta copiado al portapapeles");
    });
  };
  const copyToClipboardDa = () => {
    const accountNumber = "3108709900";
    navigator.clipboard.writeText(accountNumber).then(() => {
      console.log("Número de cuenta copiado al portapapeles");
    });
  };
  const params = useParams();
  const { id } = params;
  const { data, loading, error, cargarOrder: refresh } = useOrder(id);

  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  const initialValues = {
    images: "",
  };

  const modelSchema = z.object({
    images: imageRqd,
  });

  const updateOrderPayment = async (values) => {
    try {
      const response = await updateOrder(id, values);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Orden Actualizada",
          text: "La orden se actualizo correctamente",
        });
        refresh(id);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Orden no actualizada",
        text: "Ups, la orden no se actualizo correctamente, intenta nuevamente",
      });
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const formData = new FormData();

      if (!values.images) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes adjuntar una imagen",
        });
      }

      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append("images", file);
        });
      }
      console.log("formData", formData);
      await updateOrderPayment(formData);
      setSubmitting(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al subir pago",
        text:
          error.message ||
          "No se pudo subir el comprobante. Intenta nuevamente",
      });
      setSubmitting(false);
    }
  };
  const progresoEnvio = {
    Creada: 1,
    "Pago Enviado": 2,
    "Pago Confirmado": 3,
    "Pedido Entregado": 4,
  };

  const handleGenerarLink = async () => {
    if (!data || !data.user) {
      Swal.fire(
        "Error",
        "No se pudieron cargar los datos de la orden o del usuario.",
        "error"
      );
      return;
    }

    setIsGeneratingLink(true);
    Swal.fire({
      title: "Generando link de pago...",
      text: "Por favor espera.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const payload = {
        orderId: data.id,
        total: data.total,
        descripcion: `Pago Orden #${data.codigoOrder} - AMV KIDS`,
        email: data.user.email,
      };

      const res = await linkPago(payload);
      console.log("respuesta de bold", res);

      const url = res?.response?.payload?.url;

      if (url) {
        Swal.close();
        window.location.href = url;
      } else {
        throw new Error("No se recibió una URL de pago válida.");
      }
    } catch (err) {
      Swal.close();
      console.error("Error generando link de pago:", err);
      Swal.fire(
        "Error",
        err.message || "No se pudo generar el link de pago.",
        "error"
      );
    } finally {
      setIsGeneratingLink(false);
    }
  };

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-receipt-cutoff"></i> Detalle de mi orden #{" "}
        {data?.codigoOrder}
      </h4>

      <div>
        {loading && <Spinner animation="border" variant="info" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {data && (
          <ShoesCardStyledPayment>
            <ProgressBar currentStep={progresoEnvio[data.state]} />

            <div className="text-center my-4">
              {data.areReady ? (
                <span className="text-lg font-semibold text-green-700 bg-green-100 px-4 py-2 rounded-full inline-flex items-center shadow-sm border border-green-200">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Tu pedido ya fue alistado
                </span>
              ) : (
                <span className="text-lg font-semibold text-orange-700 bg-orange-100 px-4 py-2 rounded-full inline-flex items-center shadow-sm border border-orange-200">
                  <i className="bi bi-clock-history me-1"></i>
                  En proceso de alistamiento
                </span>
              )}
            </div>
            {data.pagoBold && (
              <div className="text-center mb-4">
                {" "}
                {/* Añadido margen inferior */}
                {/* Indicador de Pago Bold */}
                <span className="text-md font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full inline-flex items-center shadow-sm border border-blue-200">
                  <i className="bi bi-credit-card-2-front-fill me-2"></i>{" "}
                  {/* Icono sugerido para pago electrónico */}
                  Pago realizado con Bold
                </span>
                {/* Mostrar ID de Transacción si existe */}
                {data.idTransaction && (
                  <p className="text-muted small mt-2 mb-0">
                    ID Transacción Bold: {data.idTransaction}
                  </p>
                )}
              </div>
            )}
            <Card.Header>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5">
                    Total: {data.total.toLocaleString("es-CO")} COP
                  </span>
                </div>

                {/* Información de envío */}
                {(data.formaOrder ||
                  data.directionOrder ||
                  data.costoEnvio !== undefined) && (
                  <div className="mt-3 p-3 bg-light rounded border">
                    <h6 className="mb-2 text-primary">
                      <i className="bi bi-truck me-2"></i>
                      Información de Envío
                    </h6>

                    {/* Tipo de envío */}
                    <div className="mb-2">
                      <strong>Tipo de envío:</strong>
                      {data.formaOrder ? (
                        <span
                          className={`badge ms-2 ${
                            data.formaOrder === "pagoAnticipado"
                              ? "bg-info"
                              : data.formaOrder === "tienda"
                              ? "bg-success"
                              : data.formaOrder === "contraentrega"
                              ? "bg-warning"
                              : "bg-secondary"
                          }`}
                        >
                          {data.formaOrder === "pagoAnticipado"
                            ? "Pago Anticipado"
                            : data.formaOrder === "tienda"
                            ? "Recoger en Tienda"
                            : data.formaOrder === "contraentrega"
                            ? "Contraentrega"
                            : data.formaOrder}
                        </span>
                      ) : (
                        <span className="text-muted ms-2">
                          No hay información
                        </span>
                      )}
                    </div>

                    {/* Dirección de entrega */}
                    <div className="mb-2">
                      <strong>Dirección de entrega:</strong>
                      {data.directionOrder && data.formaOrder !== "tienda" ? (
                        <div className="text-muted mt-1">
                          <i className="bi bi-geo-alt me-1"></i>
                          {data.directionOrder}
                        </div>
                      ) : data.formaOrder === "tienda" ? (
                        <div className="text-info mt-1">
                          <i className="bi bi-shop me-1"></i>
                          Recoger en tienda física
                        </div>
                      ) : (
                        <span className="text-muted ms-2">
                          No hay información
                        </span>
                      )}
                    </div>

                    {/* Costo de envío */}
                    <div className="mb-2">
                      <strong>Costo de envío:</strong>
                      {data.costoEnvio !== undefined &&
                      data.costoEnvio !== null ? (
                        <span
                          className={`ms-2 ${
                            data.costoEnvio === 0
                              ? "text-success fw-bold"
                              : "text-primary"
                          }`}
                        >
                          {data.costoEnvio === 0
                            ? "GRATIS"
                            : `$${data.costoEnvio.toLocaleString("es-CO")} COP`}
                        </span>
                      ) : (
                        <span className="text-muted ms-2">
                          No hay información
                        </span>
                      )}
                    </div>

                    {/* Cédula/NIT */}
                    <div className="mb-2">
                      <strong>Cédula/NIT:</strong>
                      <span className="ms-2">
                        {data.cedulaNit || "No reporta"}
                      </span>
                    </div>

                    {/* Teléfono de contacto */}
                    <div className="mb-0">
                      <strong>Teléfono de contacto:</strong>
                      <span className="ms-2">
                        {data.telefonoContacto || "No reporta"}
                      </span>
                    </div>

                    {/* Mensajes contextuales */}
                    {data.formaOrder === "pagoAnticipado" && (
                      <div className="mt-2 p-2 bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded">
                        <small className="text-danger fw-bold">
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          Cliente debe pagar inmediatamente para confirmar
                        </small>
                      </div>
                    )}

                    {data.formaOrder === "tienda" && (
                      <div className="mt-2 p-2 bg-success bg-opacity-10 border border-success border-opacity-25 rounded">
                        <small className="text-success fw-bold">
                          <i className="bi bi-shop me-1"></i>
                          Cliente recogerá en tienda física
                        </small>
                      </div>
                    )}

                    {/* Mensaje cuando no hay información completa */}
                    {!data.formaOrder &&
                      !data.directionOrder &&
                      (data.costoEnvio === undefined ||
                        data.costoEnvio === null) && (
                        <div className="mt-2 p-2 bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded">
                          <small className="text-warning fw-bold">
                            <i className="bi bi-info-circle me-1"></i>
                            Información de envío no disponible
                          </small>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Productos</Card.Title>
              <Card.Text>
                {data.orderItems.map((item) => (
                  <p key={item.id}>
                    {item.quantity} x {item.model.name} -{" "}
                    {user?.tipoUsuario === "Cliente"
                      ? item.model.normalPrice.toLocaleString("es-CO") +
                        "COP - Talla:"
                      : user?.tipoUsuario === "Tienda Aliada"
                      ? item.model.alliancePrice.toLocaleString("es-CO") +
                        "COP - Talla:"
                      : item.model.price.toLocaleString("es-CO") +
                        "COP - Talla:"}
                    {/* {item.model.price.toLocaleString("es-CO")} COP - talla:{" "} */}
                    {item.size}
                    {item.model.color && ` - Color: ${item.model.color}`}
                    {item.isPromoted && (
                      <Badge
                        className="ms-2"
                        bg="warning"
                        pill
                        style={{ fontSize: "0.8rem" }}
                      >
                        En Promo
                      </Badge>
                    )}
                  </p>
                ))}
              </Card.Text>
            </Card.Body>
            <hr />
            <Card.Body>
              <div>
                <strong>
                  <p>Comentarios:</p>
                </strong>
                <p>{data.comments}</p>
              </div>

              <p>
                <strong>Estado del pedido: </strong>
                {data.state}
              </p>
            </Card.Body>
            <hr />
            {data.paymentUrl ? (
              <></>
            ) : (
              <Card.Body>
                <strong>Medio de pago</strong>
                <div className="pt-2">
                  <h5>AMV KIDS</h5>

                  <div className="flex flex-col items-start">
                    <ControlButton onClick={copyToClipboardBC}>
                      <p>Bancolombia - Ahorros: 83200001513</p>
                    </ControlButton>
                    <ControlButton onClick={copyToClipboardNe}>
                      <p>Nequi - Andres Moreno: 3123460008</p>
                    </ControlButton>
                    <ControlButton onClick={copyToClipboardDa}>
                      <p>DaviPlata - Carlos Becerra: 3108709900</p>
                    </ControlButton>
                  </div>
                </div>
              </Card.Body>
            )}

            {data.paymentUrl || data.pagoBold ? (
              <Card.Body>
                <span>Genial, ya realizaste el pago </span>
                <i className="bi bi-check-square-fill"></i>
              </Card.Body>
            ) : (
              <Card.Body>
                <span>Adjunta el soporte de pago</span>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={toFormikValidationSchema(modelSchema)}
                >
                  {({
                    errors,
                    touched,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                  }) => (
                    <>
                      <Form
                        className="d-flex flex-column gap-4 "
                        onSubmit={handleSubmit}
                        style={{
                          width: "100%",
                          margin: "auto",
                          marginTop: "10px",
                        }}
                      >
                        {error && (
                          <Alert
                            variant="danger"
                            style={{
                              width: "75%",
                              margin: "auto",
                              marginTop: "10px",
                            }}
                          >
                            Hubo un error, intentalo nuevamente
                          </Alert>
                        )}

                        <Form.Group
                          className="align-items-center"
                          controlId="formProdFileIMG"
                        >
                          <Form.Control
                            style={{ width: "50%" }}
                            type="file"
                            size="sm"
                            name="images"
                            // solo admitir 1 imagen
                            multiple={false}
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => {
                              // const file = e.currentTarget.files[0];
                              const file = Array.from(e.currentTarget.files);
                              setFieldValue("images", file);
                            }}
                            className={
                              touched.images && errors.images
                                ? "is-invalid"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="images"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Form.Group>

                        {/* Contenedor para notas informativas (centrado y con ancho máx. en PC) */}
                        {user?.tipoUsuario === "Cliente" && (
                          <div className="d-flex flex-column gap-3 items-center justify-center w-full md:max-w-lg mx-auto">
                            {/* Nota Addi */}
                            <div className="p-3 rounded-lg bg-light border text-center shadow-sm w-full">
                              <p className="text-muted small mb-0">
                                <i className="bi bi-info-circle me-2"></i>
                                Para solicitudes de{" "}
                                <strong>crédito Addi</strong>, visítanos
                                directamente en tienda o contáctanos vía{" "}
                                <i className="bi bi-whatsapp text-success"></i>{" "}
                                WhatsApp.
                              </p>
                            </div>

                            {/* Información Pagos Bold */}
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center shadow-sm w-full">
                              <p className="text-primary fw-semibold mb-2">
                                <i className="bi bi-shield-check me-2"></i>
                                Paga seguro con Bold
                              </p>
                              <p className="text-muted small mb-0 d-flex flex-wrap justify-content-center align-items-center gap-3">
                                <span>
                                  <i className="bi bi-credit-card me-1"></i>
                                  Tarjetas
                                </span>
                                <span>
                                  <i className="bi bi-bank me-1"></i>PSE
                                </span>
                                <span>Nequi</span> {/* No hay icono obvio */}
                                <span>Bancolombia</span>{" "}
                                {/* No hay icono obvio */}
                                {/* Puedes añadir más si Bold los soporta */}
                              </p>
                            </div>
                            <div className="mt-3">
                              <button
                                type="button"
                                className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
                                onClick={() => {
                                  const phoneNumber = "573123460008"; // Número sin + y espacios

                                  // Preparar información de la orden
                                  const orderInfo = `
🛍️ *Información de mi Pedido*

📦 *Orden:* #${data.codigoOrder}
💰 *Total:* ${data.total.toLocaleString("es-CO")} COP
📊 *Estado:* ${data.state}
${
  data.formaOrder
    ? `🚚 *Tipo de envío:* ${
        data.formaOrder === "pagoAnticipado"
          ? "Pago Anticipado"
          : data.formaOrder === "tienda"
          ? "Recoger en Tienda"
          : data.formaOrder === "contraentrega"
          ? "Contraentrega"
          : data.formaOrder
      }`
    : ""
}
${
  data.directionOrder && data.formaOrder !== "tienda"
    ? `📍 *Dirección:* ${data.directionOrder}`
    : ""
}

📋 *Productos:*
${data.orderItems
  .map(
    (item) =>
      `• ${item.quantity}x ${item.model.name} - Talla: ${item.size}${
        item.model.color ? ` - Color: ${item.model.color}` : ""
      }`
  )
  .join("\n")}

${data.comments ? `💬 *Comentarios:* ${data.comments}` : ""}

Necesito asesoría sobre este pedido que realicé.
                                  `.trim();

                                  // Codificar el mensaje para URL
                                  const encodedMessage =
                                    encodeURIComponent(orderInfo);

                                  // Crear URL de WhatsApp
                                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

                                  // Abrir WhatsApp
                                  window.open(whatsappUrl, "_blank");
                                }}
                                style={{
                                  backgroundColor: "#25D366",
                                  borderColor: "#25D366",
                                  fontSize: "0.95rem",
                                  fontWeight: "500",
                                  padding: "0.75rem 1rem",
                                }}
                              >
                                <i className="bi bi-whatsapp fs-5"></i>
                                <span>Hablar con un Asesor</span>
                              </button>
                              <small className="text-muted text-center d-block mt-2">
                                <i className="bi bi-info-circle me-1"></i>
                                Te ayudamos con cualquier duda sobre tu pedido
                              </small>
                            </div>
                          </div>
                        )}

                        <div className="d-flex justify-content-center gap-3">
                          <ButtonProfile
                            variant="primary"
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                          >
                            {!isSubmitting ? (
                              "Subir el pago"
                            ) : (
                              <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            )}
                          </ButtonProfile>
                          {user?.tipoUsuario === "Cliente" && (
                            <ButtonProfile
                              variant="info"
                              type="button"
                              size="lg"
                              onClick={handleGenerarLink}
                              disabled={isGeneratingLink || !data}
                            >
                              {!isGeneratingLink ? (
                                <span>
                                  <i className="bi bi-credit-card"></i> Pagar
                                  con Bold
                                </span>
                              ) : (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              )}
                            </ButtonProfile>
                          )}
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
              </Card.Body>
            )}
          </ShoesCardStyledPayment>
        )}
      </div>
    </div>
  );
};
