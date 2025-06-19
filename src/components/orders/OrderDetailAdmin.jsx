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
  updateOrderItemsUnity,
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

    let price = 0;
    // si esta en decuento
    if (itemToRemove.isPromoted) {
      price = itemToRemove.pricePromoted;
    } else {
      // si no esta en descuento, y no tiene precio historico
      if (itemToRemove.price === null) {
        price = itemToRemove.model[priceField];
      } else {
        // si hay historico
        price = itemToRemove[priceField] || itemToRemove.price;
      }
    }

    //const price = itemToRemove.model[priceField];

    if (typeof price !== "number") {
      console.error(
        `Precio ${price} o no encontrado para el campos ${priceField} ${itemToRemove.model.name}
         
        `
      );
      return order.total;
    }

    const itemValue = price * itemToRemove.quantity;
    const newTotal = order.total - itemValue;

    return Math.max(0, newTotal);
  };

  const calculateNewTotalAfterItemRemovalUnity = (order, itemIdToRemove) => {
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

    // voy a preguntar si hay datos precio historico en el item si no que tome el precio del modelo segun type
    let price = 0;
    // si esta en decuento
    if (itemToRemove.isPromoted) {
      price = itemToRemove.pricePromoted;
    } else {
      // si no esta en descuento, y no tiene precio historico
      if (itemToRemove.price === null) {
        price = itemToRemove.model[priceField];
      } else {
        // si hay historico
        price = itemToRemove[priceField] || itemToRemove.price;
      }
    }

    // si no esta en descuento, pero no tiene precio historico

    //price = itemToRemove.model[priceField];

    if (typeof price !== "number") {
      console.error(
        `Precio inválido o no encontrado para el campo ${priceField}`
      );
      return order.total;
    }

    const itemValue = price;
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

  const handleClickDeleteItemUnity = async (orderId, ItemId) => {
    try {
      const result = await Swal.fire({
        title: "Eliminar Item",
        text: "¿Estás seguro que deseas eliminar 1 unidad de este item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar item",
        cancelButtonText: "No",
      });

      const potentialNewTotal = calculateNewTotalAfterItemRemovalUnity(
        data,
        ItemId
      );

      if (result.isConfirmed) {
        const response = await updateOrderItemsUnity({
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

  const handlePedidoEntregadoConImpresion = () => {
    updateOrderStatus(true);
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
                          <i className="bi bi-x-circle-fill">
                            Eliminar todas las unidades
                          </i>
                        </span>
                      </OverlayTrigger>
                    )}

                    {data?.typeOrder === "Curva"
                      ? null
                      : item.quantity > 1 && (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-delete-item-${item.id}`}>
                                Cuidado, esto eliminará solo 1 unidad de este
                                Item
                              </Tooltip>
                            }
                          >
                            <span
                              onClick={() =>
                                handleClickDeleteItemUnity(data.id, item.id)
                              }
                              className="text-danger fw-bold cursor-pointer"
                              style={{ fontSize: "1.1rem" }}
                              aria-label="Eliminar item"
                            >
                              <i className="bi bi-dash-circle-fill ">
                                {" "}
                                Eliminar solo 1 unidad
                              </i>
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
              <ButtonCardStyled onClick={handlePedidoEntregadoConImpresion}>
                <i className="bi bi-printer me-2"></i>
                Marcar listo e imprimir
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
