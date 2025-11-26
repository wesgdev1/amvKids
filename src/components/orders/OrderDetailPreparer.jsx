import { useParams } from "react-router-dom";
import { useOrder } from "../../domain/orders/useOrder";
import { Alert, Badge, Card, Spinner } from "react-bootstrap";

import Swal from "sweetalert2";

import { updateOrderState } from "../../api/orders/orders";

import { ButtonCardStyled, ShoesCardStyledPayment } from "../StyledComponents";
import styled from "@emotion/styled";
import { ProgressBar } from "./ProgressBar";

// Botón secundario con un estilo diferente
const SecondaryButton = styled(ButtonCardStyled)`
  background-color: #73ccfd;
  margin-left: 10px;

  &:hover {
    background-color: #5ba8d9;
  }
`;

export const OrdeDetailPreparer = () => {
  const params = useParams();
  const { id } = params;
  const { data, loading, error, cargarOrder: refresh } = useOrder(id);

  // Función para imprimir el recibo en la impresora POS
  const printReceipt = (orderData) => {
    return new Promise((resolve, reject) => {
      try {
        // Crear el contenido del recibo
        const receiptContent = generateReceiptContent(orderData);

        // Usar la API de impresión del navegador
        const printWindow = window.open("", "_blank", "width=300,height=600");

        printWindow.document.write(`
          <html>
            <head>
              <title>Recibo #${orderData.codigoOrder}</title>
              <style>
                body {
                  font-family: 'Courier New', monospace;
                  width: 80mm;
                  margin: 0;
                  padding: 5mm;
                  font-size: 12px;
                }
                .header {
                  text-align: center;
                  margin-bottom: 10px;
                  font-weight: bold;
                }
                .divider {
                  border-top: 1px dashed #000;
                  margin: 10px 0;
                }
                .order-info {
                  margin-bottom: 10px;
                }
                .items {
                  width: 100%;
                }
                .items th {
                  text-align: left;
                }
                .total {
                  text-align: right;
                  font-weight: bold;
                  margin-top: 10px;
                }
                .footer {
                  text-align: center;
                  margin-top: 20px;
                  font-size: 10px;
                }
                @media print {
                  body {
                    width: 80mm;
                  }
                  @page {
                    margin: 0;
                    size: 80mm auto;
                  }
                }
              </style>
            </head>
            <body>
              ${receiptContent}
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() {
                    window.close();
                    window.opener.postMessage('print-completed', '*');
                  }, 500);
                };
              </script>
            </body>
          </html>
        `);

        printWindow.document.close();

        // Escuchar el mensaje de que la impresión ha sido completada
        window.addEventListener("message", function messageHandler(event) {
          if (event.data === "print-completed") {
            window.removeEventListener("message", messageHandler);
            resolve();
          }
        });

        // Por si acaso el mensaje falla, resolver después de un tiempo razonable
        setTimeout(() => {
          resolve();
        }, 3000);
      } catch (error) {
        console.error("Error al imprimir recibo:", error);
        reject(error);
      }
    });
  };

  // Generar el contenido del recibo
  const generateReceiptContent = (orderData) => {
    const fecha = new Date().toLocaleString("es-CO");
    const items = orderData.orderItems
      .map(
        (item) => `
      <tr>
        <td><strong>${item.quantity} x ${item.model.name}</strong></td>
        <td><strong>Talla: ${item.size}</strong></td>
        <td><strong>${
          item.model.color ? `Color: ${item.model.color}` : ""
        }</strong></td>
      </tr>
    `
      )
      .join("");

    return `
      <div class="header">
        <strong>AMV KIDS</strong><br>
        <strong>RECIBO DE PREPARACIÓN</strong>
      </div>
      <div class="divider"></div>
      <div class="order-info">
        <strong>Orden #: ${orderData.codigoOrder}</strong><br>
        <strong>Fecha: ${fecha}</strong><br>
        <strong>Estado: Alistado</strong>
      </div>
      <div class="divider"></div>
      <div class="client-info">
        <strong>Cliente: ${orderData.user.name}</strong><br>
        <strong>Tipo: ${orderData.user.tipoUsuario}</strong><br>
        <strong>Código: ${orderData.user.codigo}</strong><br>
      </div>
      <div class="divider"></div>
      <strong>Productos:</strong><br>
      <table class="items">
        <tbody>
          ${items}
        </tbody>
      </table>
      <div class="divider"></div>
      <div class="total">
        <strong>TOTAL: ${orderData.total.toLocaleString("es-CO")} COP</strong>
      </div>
      ${
        orderData.comments
          ? `
      <div class="divider"></div>
      <div>
        <strong>Comentarios:</strong><br>
        <strong>${orderData.comments}</strong>
      </div>
      `
          : ""
      }
      <div class="divider"></div>
      <div class="footer">
        <strong>Este recibo certifica que la orden ha sido preparada.</strong><br>
        <strong>Gracias por su preferencia!</strong>
      </div>
    `;
  };

  // Función común para actualizar el estado
  const updateOrderStatus = async (shouldPrint) => {
    try {
      const result = await Swal.fire({
        title: "Pedido preparado",
        text: "¿Está seguro que el pedido está listo para ser entregado?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const values = {
          areReady: true,
        };

        const updateResult = await updateOrderState(id, values);

        if (updateResult) {
          // Imprimir el recibo solo si se solicita
          if (shouldPrint) {
            try {
              // Mostrar indicador de carga mientras se imprime
              Swal.fire({
                title: "Imprimiendo recibo...",
                text: "Por favor espere",
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => {
                  Swal.showLoading();
                },
              });

              // Esperar a que se complete la impresión
              await printReceipt(data);

              // Cerrar el indicador de carga y mostrar mensaje de éxito
              Swal.fire({
                icon: "success",
                title: "Orden Actualizada",
                text: "La orden se actualizó correctamente y se ha impreso el recibo",
              });
            } catch (printError) {
              Swal.fire({
                icon: "error",
                title: "Error de impresión",
                text: "No se pudo imprimir el recibo. Verifique la conexión con la impresora.",
              });
            }
          } else {
            Swal.fire({
              icon: "success",
              title: "Orden Actualizada",
              text: "La orden se actualizó correctamente",
            });
          }

          refresh(id);
        }
      }
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar la orden",
      });
    }
  };

  // Actualizar e imprimir
  const handlePedidoEntregadoConImpresion = () => {
    updateOrderStatus(true);
  };

  // Solo actualizar
  const handlePedidoEntregadoSinImpresion = () => {
    updateOrderStatus(false);
  };

  const progresoEnvio = {
    Creada: 1,
    "Pago Enviado": 2,
    "Pago Confirmado": 3,
    "Pedido Entregado": 4,
  };

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-receipt-cutoff"></i> Detalle de la orden #{" "}
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
                  Preparado
                </span>
              ) : (
                <span className="text-lg font-semibold text-orange-700 bg-orange-100 px-4 py-2 rounded-full inline-flex items-center shadow-sm border border-orange-200">
                  <i className="bi bi-clock-history me-1"></i>
                  Alista el pedido!
                </span>
              )}
            </div>
            <Card.Header>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5">
                    Total: {data.total.toLocaleString("es-CO")} COP
                  </span>
                </div>

                <div>
                  {data?.coupon ? (
                    <>
                      {" "}
                      <Badge>
                        <i className="bi bi-tag-fill me-1"></i>
                        Tiene aplicado un cupon de descuento:{" "}
                        {data?.coupon?.code}
                      </Badge>
                      <Badge>
                        <i className="bi bi-tag-fill me-1"></i>
                        descuento aplicado: {data?.coupon?.discount}%
                      </Badge>
                    </>
                  ) : (
                    <></>
                  )}
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
              <Card.Title className="fw-bold">
                Informacion del usuario
              </Card.Title>
              <Card.Text>
                <p>Nombre:{data.user.name}</p>
                <p>
                  Tipo de usuario: <strong>{data.user.tipoUsuario}</strong>
                </p>
                <p>Codigo: {data.user.codigo}</p>
                <p>Numero de multas: {data.user.numeroMultas}</p>
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Title className="fw-bold">Productos</Card.Title>
              <Card.Text>
                {data.orderItems.map((item) => (
                  <div className="d-flex gap-4" key={item.id}>
                    <p>
                      {item.quantity} x {item.model.name} - talla: {item.size}
                      {item.model.color && ` - color: ${item.model.color}`}
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
                  </div>
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
              <p>
                <strong>Alistado: </strong>
                {data.areReady ? "Si" : "No"}
              </p>
              {data.state === "Creada" ? (
                <p>Sin registro de pago</p>
              ) : (
                <p>
                  <a
                    href={data.paymentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-700 hover:cursor-pointer "
                  >
                    Ver comprobante de pago
                  </a>
                </p>
              )}
            </Card.Body>
            <hr />
            <div className="d-flex justify-content-center gap-2 mb-3">
              <ButtonCardStyled onClick={handlePedidoEntregadoConImpresion}>
                <i className="bi bi-printer me-2"></i>
                Marcar listo e imprimir
              </ButtonCardStyled>

              <SecondaryButton onClick={handlePedidoEntregadoSinImpresion}>
                <i className="bi bi-check-circle me-2"></i>
                Solo marcar listo
              </SecondaryButton>
            </div>
          </ShoesCardStyledPayment>
        )}
      </div>
    </div>
  );
};
