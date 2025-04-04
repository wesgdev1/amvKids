import { useState } from "react";
import { Badge, Button, Image, Modal, Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { ControlButton } from "../products/StyledComponents";
import { Paginator } from "../paginator/Paginator";
import { Formik } from "formik";
import { z } from "zod";
import { ButtonCardStyled } from "../StyledComponents";

const sizeRqd = z.number({
  required_error: "El tamaño es requerido",
});

const quantityRqd = z.number({
  required_error: "La cantidad es requerida",
});

const stockSchema = z.object({
  size: sizeRqd,
  quantity: quantityRqd,
});

export const ModelsTable = ({ modelos }) => {
  const [show, setShow] = useState(false);
  const [lowStockSizes, setLowStockSizes] = useState([]); // Estado para tallas con bajo inventario

  const handleClose = () => setShow(false);
  const handleShow = (stocks) => {
    const lowStock = stocks.filter((stock) => stock.quantity < 10);
    setLowStockSizes(lowStock); // Guardar las tallas en el estado
    setShow(true); // Mostrar el modal
  };
  const [modelosBypage, setModelosByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalModelos = modelos.length;
  const lastIndex = currentPage * modelosBypage;
  const firstIndex = lastIndex - modelosBypage;
  const navigate = useNavigate();
  const initialValues = {
    size: "",
    quantity: "",
  };

  const viewProduct = (modelo) => {
    navigate(`/profile/models/${modelo.id}`);
  };
  const editProduct = (modelo) => {
    navigate(`/profile/products/${modelo.productId}/models/new`, {
      state: { modelo },
    });
  };

  const calculateStock = (stocks) => {
    return stocks.reduce((acc, stock) => acc + stock.quantity, 0);
  };
  return (
    <div className="pt-4 ">
      <div className="table-responsive ">
        <Table striped bordered hover style={{ fontSize: "0.8rem" }}>
          <thead>
            <tr>
              <th>Color</th>
              <th>Imagen</th>
              <th>Nombre del modelo</th>
              <th>Precio </th>
              <th>Precio reventa </th>
              <th>Precio aliado </th>
              <th>Total unidades</th>
              <th>Alertas</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {modelos
              .map((modelo) => (
                <tr key={modelo.id}>
                  <td>{modelo.color}</td>
                  <td>
                    <Image
                      src={modelo.images[0]?.url}
                      alt={"amv_kid_shoe"}
                      width={30}
                      height={30}
                      roundedCircle
                    />
                  </td>
                  <td>{modelo.name}</td>
                  <td>
                    {modelo.normalPrice?.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                  <td>
                    {modelo.price?.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                  <td>
                    {modelo.alliancePrice?.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>

                  <td>{calculateStock(modelo.stocks)}</td>
                  <td>
                    <td>
                      {modelo.stocks.some((stock) => stock.quantity < 10) && (
                        <Badge
                          bg="warning"
                          text="dark"
                          onClick={() => {
                            handleShow(modelo.stocks);
                          }}
                        >
                          Info: Stock bajo
                        </Badge>
                      )}
                      {modelo.stocks.every((stock) => stock.quantity >= 10) && (
                        <Badge bg="success" text="dark">
                          Info: Stock normal
                        </Badge>
                      )}
                    </td>
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <ControlButton onClick={() => viewProduct(modelo)}>
                        <i className="bi bi-eye-fill"></i>
                      </ControlButton>
                      <ControlButton onClick={() => editProduct(modelo)}>
                        <i className="bi bi-pencil-fill"></i>
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
                <strong>Total Modelos: {modelos.length}</strong>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alertas de inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {lowStockSizes.length > 0 ? (
            <ul>
              {lowStockSizes.map((stock, index) => (
                <li key={index}>
                  Talla: {stock.size} - Cantidad: {stock.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay tallas con bajo inventario.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <ButtonCardStyled variant="primary" onClick={handleClose}>
            Entendido
          </ButtonCardStyled>
        </Modal.Footer>
      </Modal>
      <Paginator
        byPage={modelosBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalModelos}
      />
    </div>
  );
};
