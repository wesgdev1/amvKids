import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../domain/orders/useOrder";
import { Alert, Card, CloseButton, Spinner } from "react-bootstrap";
import { z } from "zod";

import { useState } from "react";
import Swal from "sweetalert2";

import {
  deleteOrder,
  updateOrder,
  updateOrderItems,
  updateOrderState,
} from "../../api/orders/orders";

import { ButtonCardStyled, ShoesCardStyledPayment } from "../StyledComponents";

const imageRqd = z.any().optional();

export const OrdeDetailAdmin = () => {
  const params = useParams();
  const { id } = params;
  const { data, loading, error, cargarOrder: refresh } = useOrder(id);

  const navigate = useNavigate();

  const [error2, setError2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        // Llamada a la API para eliminar la orden
        const response = await deleteOrder(id);

        // Verificar que la respuesta sea 200 OK
        if (response) {
          // Mostrar mensaje de éxito
          await Swal.fire({
            icon: "success",
            title: "Orden Cancelada",
            text: "La orden se actualizó correctamente",
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
      // Manejar errores de la API o del proceso
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error inesperado al cancelar la orden",
      });
    }
  };

  const handleClickDeleteItem = async (orderId, ItemId) => {
    try {
      // Mostrar alerta de confirmación
      const result = await Swal.fire({
        title: "Eliminar Item",
        text: "¿Estás seguro que deseas eliminar este item de la orden?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      // Si el usuario confirma
      if (result.isConfirmed) {
        // Llamada a la API para eliminar la orden
        const response = await updateOrderItems({
          orderId: orderId,
          itemId: ItemId,
        });

        // Verificar que la respuesta sea 200 OK
        if (response) {
          // Mostrar mensaje de éxito
          await Swal.fire({
            icon: "success",
            title: "Item Eliminado",
            text: "La orden se actualizó correctamente",
          });

          // Redirigir a la página de órdenes después de un pequeño retraso
          setTimeout(() => {
            // navigate("/profile/orders", {
            //   replace: true,
            // });
            refresh(id);
          }, 1000); // Espera 1 segundo antes de redirigir
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error inesperado al cancelar la orden",
      });
    }
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
            <Card.Header>
              <strong> Total: {data.total.toLocaleString("es-CO")} COP</strong>
            </Card.Header>
            <Card.Body>
              <Card.Title className="fw-bold">
                Informacion de revendedor
              </Card.Title>
              <Card.Text>
                <p>Nombre:{data.user.name}</p>
                <p>Codigo: {data.user.codigo}</p>
                <p>Numero de multas: {data.user.numeroMultas}</p>
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Title className="fw-bold">Productos</Card.Title>
              <Card.Text>
                {data.orderItems.map((item) => (
                  <>
                    <div className="d-flex  gap-4">
                      <p key={item.id}>
                        {item.quantity} x {item.model.name} -{" "}
                        {item.model.price.toLocaleString("es-CO")} COP - talla:{" "}
                        {item.size}
                      </p>
                      <CloseButton
                        onClick={() => handleClickDeleteItem(data.id, item.id)}
                      />
                    </div>
                  </>
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
