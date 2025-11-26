import { useState } from "react";
import { Badge, Image, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ControlButton } from "../products/StyledComponents";
import { Paginator } from "../paginator/Paginator";
import { format } from "date-fns";

export const OrdersTable = ({ orders }) => {
  const [ordersBypage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalOrders = orders.length;
  const lastIndex = currentPage * ordersBypage;
  const firstIndex = lastIndex - ordersBypage;
  const navigate = useNavigate();

  const viewOrder = (order) => {
    navigate(`/profile/myorders/${order.id}/`);
  };

  const [show, setShow] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const iconMap = {
    Creada: "bi bi-exclamation-octagon bg-yellow-300 rounded-full ",
    "Pago Enviado": "bi bi-hourglass-split rounded-full bg-orange-500",
    "Pago Confirmado": "bi bi-check-circle rounded-full bg-green-500",
    "Pedido Entregado": "bi bi-box-seam rounded-full bg-green-500",
    CanceladaAdmin: "bi bi-x-circle",
  };

  const renderTipoEnvio = (formaOrder) => {
    switch (formaOrder) {
      case "pagoAnticipado":
        return (
          <div className="d-flex flex-column">
            <span className="badge bg-info mb-1">
              <i className="bi bi-credit-card me-1"></i>
              Pago Anticipado
            </span>
            <small className="text-danger fw-bold">
              <i className="bi bi-exclamation-triangle me-1"></i>
              ¡Debes pagar inmediatamente!
            </small>
          </div>
        );

      case "tienda":
        return (
          <div className="d-flex flex-column">
            <span className="badge bg-success mb-1">
              <i className="bi bi-shop me-1"></i>
              Recoger en Tienda
            </span>
            <small className="text-info">
              <i className="bi bi-clock me-1"></i>
              Te esperamos en nuestra tienda
            </small>
          </div>
        );

      case "contraentrega":
        return (
          <div className="d-flex flex-column">
            <span className="badge bg-warning mb-1">
              <i className="bi bi-cash-coin me-1"></i>
              Contraentrega
            </span>
            <small className="text-muted">
              <i className="bi bi-truck me-1"></i>
              Pago al recibir el pedido
            </small>
          </div>
        );

      default:
        return (
          <span className="badge bg-secondary">
            {formaOrder || "No especificado"}
          </span>
        );
    }
  };

  return (
    <div className="pt-4 ">
      {" "}
      <Table responsive="sm" bordered hover style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th># Orden</th>
            <th>Cupon</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Tipo de Envío</th>
            <th>
              <i className="bi bi-receipt-cutoff"></i>
            </th>
            <th className="text-center">
              <i className="bi bi-search me-1"></i>
              Detalle
            </th>
          </tr>
        </thead>
        <tbody>
          {orders
            .map((order) => (
              <tr key={order.id}>
                <td>{order.codigoOrder}</td>
                <td>
                  {order.coupon ? (
                    <Badge
                      bg="success"
                      style={{
                        fontSize: "0.7rem",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "12px",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                        boxShadow: "0 2px 4px rgba(40, 167, 69, 0.2)",
                      }}
                    >
                      <i className="bi bi-tag-fill me-1"></i>
                      {order.coupon.code}
                    </Badge>
                  ) : (
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Sin cupón
                    </span>
                  )}
                </td>
                <td>{format(new Date(order.createdAt), "MM/dd/yyyy")}</td>
                <td>$ {order.total.toLocaleString("es-CO")}</td>
                <td>
                  <span className="me-2">
                    {order.state} <i className={`${iconMap[order.state]}`}></i>
                  </span>

                  {order.areReady ? (
                    <span className="text-green-600 whitespace-nowrap">
                      <i className="bi bi-check-circle-fill me-1"></i>
                      (Tu orden esta Lista)
                    </span>
                  ) : (
                    <span className="text-orange-500 whitespace-nowrap">
                      <i className="bi bi-clock-history me-1"></i>
                      (En proceso de alistado)
                    </span>
                  )}
                </td>
                <td className="text-center">
                  {renderTipoEnvio(order.formaOrder)}
                </td>
                <td>
                  {order.paymentUrl ? (
                    <span
                      onClick={() => {
                        handleShow();
                        setPaymentUrl(order.paymentUrl);
                      }}
                      className="underline text-blue-700 hover:cursor-pointer "
                    >
                      {" "}
                      Ver{" "}
                    </span>
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <ControlButton
                      onClick={() => viewOrder(order)}
                      className="btn-sm btn-outline-info d-flex align-items-center"
                      title={`Ver todos los detalles de la orden #${order.codigoOrder}`}
                      style={{
                        fontSize: "0.8rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <i className="bi bi-file-text me-1"></i>
                      <span className="d-none d-md-inline">Ver Detalle</span>
                      <span className="d-md-none">Detalle</span>
                    </ControlButton>
                  </div>
                </td>
              </tr>
            ))
            .slice(firstIndex, lastIndex)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8">
              <strong>Total Órdenes: {orders.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Comprobante de pago</Modal.Title>
        </Modal.Header>

        <Modal.Body className="flex justify-center">
          <Image
            src={
              paymentUrl ||
              "https://res.cloudinary.com/djlmqpd2n/image/upload/v1631862391/amv_kid_payment.png"
            }
            alt={"amv_kid_payment"}
            width={200}
            height={100}
          />
        </Modal.Body>
      </Modal>
      <Paginator
        byPage={ordersBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalOrders}
      />
    </div>
  );
};
