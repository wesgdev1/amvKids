import { useState } from "react";
import { Image, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ControlButton } from "../products/StyledComponents";
import { Paginator } from "../paginator/Paginator";
import { format } from "date-fns";

export const OrdersTableAdmin = ({ orders }) => {
  const [ordersBypage, setOrdersByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalOrders = orders.length;
  const lastIndex = currentPage * ordersBypage;
  const firstIndex = lastIndex - ordersBypage;
  const navigate = useNavigate();

  const viewOrder = (order) => {
    navigate(`/profile/order/${order.id}/`);
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

  return (
    <div className="pt-4 ">
      {" "}
      <Table responsive="sm" bordered hover style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th># Orden</th>
            <th>codigo</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>
              <i className="bi bi-receipt-cutoff"></i>
            </th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .map((order) => (
              <tr key={order.id}>
                <td>{order.codigoOrder}</td>
                <td>{order.user.codigo}</td>
                <td>{order.user.name}</td>

                <td>{format(new Date(order.createdAt), "MM/dd/yyyy")}</td>
                <td>$ {order.total.toLocaleString("es-CO")}</td>
                <td>
                  {order.state} <i className={`${iconMap[order.state]}`}></i>
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
                  <div className="flex justify-center gap-2">
                    <ControlButton onClick={() => viewOrder(order)}>
                      <i className="bi bi-eye-fill"></i>
                    </ControlButton>
                  </div>
                </td>
              </tr>
            ))
            .slice(firstIndex, lastIndex)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Total Producto: {orders.length}</strong>
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
