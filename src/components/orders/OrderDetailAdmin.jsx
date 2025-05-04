import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../domain/orders/useOrder";
import { Alert, Card, Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";

import Swal from "sweetalert2";

import {
  deleteOrder,
  updateOrderItems,
  updateOrderState,
} from "../../api/orders/orders";

import { ButtonCardStyled, ShoesCardStyledPayment } from "../StyledComponents";
import { ProgressBar } from "./ProgressBar";

export const OrdeDetailAdmin = () => {
  const params = useParams();
  const { id } = params;
  const { data, loading, error, cargarOrder: refresh } = useOrder(id);

  const navigate = useNavigate();

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
      // Mostrar alerta de confirmación
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

      // Si el usuario confirma
      if (result.isConfirmed) {
        // Mostrar Swal de carga
        Swal.fire({
          title: "Cancelando orden...",
          text: "Por favor espera.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Llamada a la API para eliminar la orden
        const response = await deleteOrder(id);

        Swal.close(); // Cerrar Swal de carga antes de mostrar el resultado

        // Verificar que la respuesta sea 200 OK (o como sea que tu API indique éxito)
        if (response !== undefined && response !== null) {
          // Mostrar mensaje de éxito
          await Swal.fire({
            icon: "success",
            title: "Orden Cancelada",
            text: "La orden se canceló correctamente.", // Mensaje ajustado
          });

          // Redirigir a la página de órdenes después de un pequeño retraso
          setTimeout(() => {
            navigate("/profile/orders", {
              replace: true,
            });
          }, 1000); // Espera 1 segundo antes de redirigir
        }
      }
    } catch (error) {
      Swal.close(); // Asegurarse de cerrar el loading Swal si hay un error
      // Manejar errores de la API o del proceso
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.message || "Ocurrió un error inesperado al cancelar la orden", // Mostrar mensaje de error de la API si existe
      });
    }
  };

  // Función para calcular el nuevo total si se elimina un item
  const calculateNewTotalAfterItemRemoval = (order, itemIdToRemove) => {
    if (!order || !order.orderItems || !order.user) {
      console.error("Datos de orden incompletos para calcular nuevo total.");
      return order?.total; // Devolver el total actual si hay error
    }

    const itemToRemove = order.orderItems.find(
      (item) => item.id === itemIdToRemove
    );

    if (!itemToRemove || !itemToRemove.model) {
      console.error("Item a eliminar no encontrado o modelo inválido.");
      return order.total; // Devolver el total actual si hay error
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
        // Asumir un precio por defecto o manejar como error si es necesario
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
      // Decide cómo manejar esto: devolver total actual, 0, o lanzar error?
      // Por ahora, devolvemos el total actual para evitar romper el flujo.
      return order.total;
    }

    const itemValue = price * itemToRemove.quantity;
    const newTotal = order.total - itemValue;

    // Asegurarse de que el total no sea negativo
    return Math.max(0, newTotal);
  };

  const handleClickDeleteItem = async (orderId, ItemId) => {
    // Verificar si es el último item
    if (data && data.orderItems.length === 1) {
      // Si es el último item, confirmar la cancelación de la ORDEN COMPLETA
      const result = await Swal.fire({
        title: "Último Item en la Orden",
        text: "Al eliminar el último item, se cancelará la orden completa. ¿Deseas continuar?",
        icon: "warning",
        showCancelButton: true, // Para permitir al usuario arrepentirse
        confirmButtonColor: "#d33", // Rojo para acción destructiva
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, cancelar orden",
        cancelButtonText: "No, mantener orden", // Cambiado para claridad
      });

      // Si confirma cancelar la orden completa
      if (result.isConfirmed) {
        await handlePaymentCancelAll();
      }
      // Si presiona "No, mantener orden", no se hace nada.
      return; // Salir, ya que se manejó el caso del último item
    } else {
      // Si hay más de un item, proceder con la lógica de eliminar solo el item

      // --- Inicio: Calcular el nuevo total potencial ---
      const potentialNewTotal = calculateNewTotalAfterItemRemoval(data, ItemId);
      console.log(
        "El nuevo total si se elimina el item sería:",
        potentialNewTotal
      );
      // Nota: Este es solo el cálculo. El total real de la orden
      // se actualizará en el backend al confirmar la eliminación.
      // Puedes usar 'potentialNewTotal' si quieres mostrarlo en el Swal de confirmación.
      // --- Fin: Calcular el nuevo total potencial ---

      await proceedToDeleteItem(orderId, ItemId, potentialNewTotal);
    }
  };

  // Extraer la lógica de eliminación de item a una función separada para reutilizarla
  const proceedToDeleteItem = async (orderId, ItemId, potentialNewTotal) => {
    try {
      const result = await Swal.fire({
        title: "Eliminar Item",
        text: "¿Estás seguro que deseas eliminar este item específico de la orden?", // Texto ajustado para claridad
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

            {/* Indicador de Estado "areReady" */}
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

            {/* Nuevo: Indicador de Pago Bold y ID Transacción */}
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
              <strong> Total: {data.total.toLocaleString("es-CO")} COP</strong>
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
                  <div
                    key={item.id}
                    className="d-flex align-items-center gap-3 mb-2"
                  >
                    <span>
                      {item.quantity} x {item.model.name} - talla: {item.size}
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
                        Pago Confirmado
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
            </div>
          </ShoesCardStyledPayment>
        )}
      </div>
    </div>
  );
};
