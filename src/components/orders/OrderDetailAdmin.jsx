import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useOrder } from "../../domain/orders/useOrder";
import {
  Alert,
  Card,
  Spinner,
  OverlayTrigger,
  Tooltip,
  Modal,
  Form,
  Button,
  Badge,
} from "react-bootstrap";

import Swal from "sweetalert2";

import {
  deleteOrder,
  updateOrderItems,
  updateOrderState,
  updateTotalDiscount,
} from "../../api/orders/orders";

import { ButtonCardStyled, ShoesCardStyledPayment } from "../StyledComponents";
import { ProgressBar } from "./ProgressBar";

export const OrdeDetailAdmin = () => {
  const params = useParams();
  const { id } = params;
  const { data, loading, error, cargarOrder: refresh } = useOrder(id);

  const navigate = useNavigate();

  // Estados para el modal de descuento
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [montoDescuento, setMontoDescuento] = useState("");
  const [discountError, setDiscountError] = useState("");

  const handleCloseDiscountModal = () => {
    setShowDiscountModal(false);
    setMontoDescuento("");
    setDiscountError("");
  };
  const handleShowDiscountModal = () => setShowDiscountModal(true);

  const handleApplyDiscount = async () => {
    const discountAmount = parseFloat(montoDescuento);

    if (isNaN(discountAmount) || discountAmount <= 0) {
      setDiscountError("Por favor, ingresa un monto válido mayor a cero.");
      return;
    }
    if (data && discountAmount > data.total) {
      setDiscountError(
        `El descuento no puede ser mayor al total de la orden: ${data.total.toLocaleString(
          "es-CO"
        )} COP.`
      );
      return;
    }
    setDiscountError("");

    Swal.fire({
      title: "Aplicando descuento...",
      text: "Por favor espera.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      console.log("Aplicando descuento...");
      console.log("Order ID:", id);
      console.log("Monto de Descuento:", discountAmount);

      const result = await updateTotalDiscount({
        orderId: id,
        porcentajeDescuento: discountAmount,
      });

      Swal.close();

      if (result) {
        await Swal.fire({
          icon: "success",
          title: "Descuento Aplicado",
          text: `El descuento de ${discountAmount.toLocaleString(
            "es-CO"
          )} COP se aplicó correctamente a la orden.`,
        });
        refresh(id);
        handleCloseDiscountModal();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error al Aplicar Descuento",
          text: "No se pudo aplicar el descuento. La respuesta de la API no fue la esperada o indicó un fallo.",
        });
        handleCloseDiscountModal();
      }
    } catch (error) {
      Swal.close();
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.message ||
          "Ocurrió un error inesperado al aplicar el descuento.",
      });
      handleCloseDiscountModal();
    }
  };

  const handlePaymentConfirm = () => {
    try {
      Swal.fire({
        title: "Confirmar Pago",
        text: "¿Estas seguro de confirmar el pago?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          const values = {
            state: "Pago Confirmado",
          };
          const result = updateOrderState(id, values);
          if (result) {
            Swal.fire({
              icon: "success",
              title: "Orden Actualizada",
              text: "La orden se actualizo correctamente",
            });
            refresh(id);
          }
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo confirmar el pago",
      });
    }
  };

  const progresoEnvio = {
    Creada: 1,
    "Pago Enviado": 2,
    "Pago Confirmado": 3,
    "Pedido Entregado": 4,
  };

  const handlePedidoEntregado = () => {
    try {
      Swal.fire({
        title: "Pedido Entregado",
        text: "¿Estas seguro de confirmar la entrega del pedido?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          const values = {
            state: "Pedido Entregado",
            areReady: true,
          };
          const result = updateOrderState(id, values);
          if (result) {
            Swal.fire({
              icon: "success",
              title: "Orden Actualizada",
              text: "La orden se actualizo correctamente",
            });
            refresh(id);
          }
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo confirmar la entrega del pedido",
      });
    }
  };

  const handlePaymentCancel = () => {
    try {
      Swal.fire({
        title: "Cancelar Pago",
        text: "¿Estas seguro de cancelar el pago?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          const values = {
            state: "Creada",
            pagoBold: false,
            idTransaction: null,
          };
          const result = updateOrderState(id, values);
          if (result) {
            Swal.fire({
              icon: "success",
              title: "Orden Actualizada",
              text: "La orden se actualizo correctamente",
            });
            refresh(id);
          }
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cancelar el pago",
      });
    }
  };

  const handlePaymentCancelAll = async () => {
    try {
      const result = await Swal.fire({
        title: "Cancelar Orden",
        text: "¿Estás seguro de cancelar la orden?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancelando orden...",
          text: "Por favor espera.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await deleteOrder(id);

        Swal.close();

        if (response !== undefined && response !== null) {
          await Swal.fire({
            icon: "success",
            title: "Orden Cancelada",
            text: "La orden se canceló correctamente.",
          });

          setTimeout(() => {
            navigate("/profile/orders", {
              replace: true,
            });
          }, 1000);
        }
      }
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.message || "Ocurrió un error inesperado al cancelar la orden",
      });
    }
  };

  const calculateNewTotalAfterItemRemoval = (order, itemIdToRemove) => {
    if (!order || !order.orderItems || !order.user) {
      console.error("Datos de orden incompletos para calcular nuevo total.");
      return order?.total;
    }

    const itemToRemove = order.orderItems.find(
      (item) => item.id === itemIdToRemove
    );

    if (!itemToRemove || !itemToRemove.model) {
      console.error("Item a eliminar no encontrado o modelo inválido.");
      return order.total;
    }

    const userType = order.user.tipoUsuario;
    let priceField;

    switch (userType) {
      case "Reventa":
        priceField = "price";
        break;
      case "Cliente":
        priceField = "NormalPrice";
        break;
      case "Tienda Aliada":
        priceField = "alliancePrice";
        break;
      default:
        console.warn(
          `Tipo de usuario desconocido: ${userType}. Usando 'price' por defecto.`
        );
        priceField = "price";
    }

    const price = itemToRemove.model[priceField];

    if (typeof price !== "number") {
      console.error(
        `Precio inválido o no encontrado para el campo ${priceField}`
      );
      return order.total;
    }

    const itemValue = price * itemToRemove.quantity;
    const newTotal = order.total - itemValue;

    return Math.max(0, newTotal);
  };

  const handleClickDeleteItem = async (orderId, ItemId) => {
    if (data && data.orderItems.length === 1) {
      const result = await Swal.fire({
        title: "Último Item en la Orden",
        text: "Al eliminar el último item, se cancelará la orden completa. ¿Deseas continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, cancelar orden",
        cancelButtonText: "No, mantener orden",
      });

      if (result.isConfirmed) {
        await handlePaymentCancelAll();
      }
      return;
    } else {
      const potentialNewTotal = calculateNewTotalAfterItemRemoval(data, ItemId);
      console.log(
        "El nuevo total si se elimina el item sería:",
        potentialNewTotal
      );

      await proceedToDeleteItem(orderId, ItemId, potentialNewTotal);
    }
  };

  const proceedToDeleteItem = async (orderId, ItemId, potentialNewTotal) => {
    try {
      const result = await Swal.fire({
        title: "Eliminar Item",
        text: "¿Estás seguro que deseas eliminar este item específico de la orden?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar item",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const response = await updateOrderItems({
          orderId: orderId,
          itemId: ItemId,
          potentialNewTotal,
        });

        if (response) {
          await Swal.fire({
            icon: "success",
            title: "Item Eliminado",
            text: "La orden se actualizó correctamente",
          });
          setTimeout(() => {
            refresh(id);
          }, 1000);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error inesperado al eliminar el item",
      });
    }
  };

  const printReceipt = (orderData) => {
    return new Promise((resolve, reject) => {
      try {
        const receiptContent = generateReceiptContent(orderData);

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

        window.addEventListener("message", function messageHandler(event) {
          if (event.data === "print-completed") {
            window.removeEventListener("message", messageHandler);
            resolve();
          }
        });

        setTimeout(() => {
          resolve();
        }, 3000);
      } catch (error) {
        console.error("Error al imprimir recibo:", error);
        reject(error);
      }
    });
  };
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

  const handlePrint = async () => {
    Swal.fire({
      title: "Imprimiendo recibo...",
      text: "Por favor espere",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await printReceipt(data);
    Swal.close();
    Swal.fire({
      icon: "success",
      title: "Recibo Impreso",
      text: "El recibo se ha impreso correctamente.",
    });
  };

  return (
    <div className="pt-5 px-4">
      <h4 className="pb-3">
        <i className="bi bi-receipt-cutoff"></i> Detalle de la orden #{" "}
        {data?.codigoOrder} - Tipo de orden: {data?.typeOrder}
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
                  Orden Lista para Enviar
                </span>
              ) : (
                <span className="text-lg font-semibold text-orange-700 bg-orange-100 px-4 py-2 rounded-full inline-flex items-center shadow-sm border border-orange-200">
                  <i className="bi bi-clock-history me-1"></i>
                  Pendiente por Alistar
                </span>
              )}
            </div>

            {data.pagoBold && (
              <div className="text-center mb-4">
                <span className="text-md font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full inline-flex items-center shadow-sm border border-blue-200">
                  <i className="bi bi-credit-card-2-front-fill me-2"></i> Pago
                  realizado con Bold
                </span>
                {data.idTransaction && (
                  <p className="text-muted small mt-2 mb-0">
                    ID Transacción Bold: {data.idTransaction}
                  </p>
                )}
              </div>
            )}

            <Card.Header>
              <strong> Total: {data.total.toLocaleString("es-CO")} COP</strong>
            </Card.Header>
            <Badge>
              <strong>
                Descuento aplicado:{" "}
                {data.discount?.toLocaleString("es-CO") || 0} COP
              </strong>
            </Badge>
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
                  <div
                    key={item.id}
                    className="d-flex align-items-center gap-3 mb-2"
                  >
                    <span>
                      {item.quantity} x {item.model.name} - talla: {item.size}
                      {item.model.color && ` - color: ${item.model.color}`}
                    </span>

                    {data?.typeOrder === "Curva" ? null : (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-delete-item-${item.id}`}>
                            Cuidado, esto eliminará el total de productos de
                            esta referencia.
                          </Tooltip>
                        }
                      >
                        <span
                          onClick={() =>
                            handleClickDeleteItem(data.id, item.id)
                          }
                          className="text-danger fw-bold cursor-pointer"
                          style={{ fontSize: "1.1rem" }}
                          aria-label="Eliminar item"
                        >
                          <i className="bi bi-x-circle-fill"></i>
                        </span>
                      </OverlayTrigger>
                    )}
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
              {data.state === "Creada" ? (
                <p>Sin registro de pago</p>
              ) : data.pagoBold ? (
                <p>PAGO REALIZADO POR BOLD</p>
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
            <div className="flex flex-wrap gap-4 justify-center">
              {data.state === "Pedido Entregado" ? null : (
                <>
                  <ButtonCardStyled
                    onClick={() => {
                      handlePaymentConfirm();
                    }}
                  >
                    Admin Confirma Pago
                  </ButtonCardStyled>
                  {data.state === "Creada" ||
                  data.state === "Pago Confirmado" ? null : (
                    <>
                      <ButtonCardStyled
                        onClick={() => {
                          handlePaymentCancel();
                        }}
                      >
                        Pago Invalido
                      </ButtonCardStyled>
                      <ButtonCardStyled
                        onClick={() => {
                          handlePaymentConfirm();
                        }}
                      >
                        Pago Confirmado del cliente
                      </ButtonCardStyled>
                    </>
                  )}

                  <ButtonCardStyled
                    onClick={() => {
                      handlePaymentCancelAll();
                    }}
                  >
                    Cancelar Orden
                  </ButtonCardStyled>
                  <ButtonCardStyled
                    onClick={() => {
                      handlePedidoEntregado();
                    }}
                  >
                    Pedido Entregado
                  </ButtonCardStyled>
                </>
              )}

              <ButtonCardStyled
                onClick={() => {
                  handlePrint();
                }}
                className="bg-white text-black border border-gray-300 hover:bg-gray-100"
              >
                <i className="bi bi-printer me-2"></i>
                Re-imprimir
              </ButtonCardStyled>
              <ButtonCardStyled
                onClick={handleShowDiscountModal}
                className="bg-white text-black border border-gray-300 hover:bg-gray-100"
              >
                <i className="bi bi-tag-fill me-2"></i>
                Aplicar Descuento
              </ButtonCardStyled>
            </div>
          </ShoesCardStyledPayment>
        )}
      </div>

      <Modal
        show={showDiscountModal}
        onHide={handleCloseDiscountModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Aplicar Descuento a la Orden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formPorcentajeDescuento">
              <Form.Label>Cantidad a descontar</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa un valor en pesos sin puntos ni comas"
                value={montoDescuento}
                onChange={(e) => setMontoDescuento(e.target.value)}
                isInvalid={!!discountError}
              />
              <Form.Control.Feedback type="invalid">
                {discountError}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDiscountModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleApplyDiscount}>
            Aplicar Descuento
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
