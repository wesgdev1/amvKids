import { useState } from "react";
import {
  Badge,
  Image,
  Table,
  Modal,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ControlButton } from "../products/StyledComponents";
import { Paginator } from "../paginator/Paginator";
import { ButtonCardStyled } from "../StyledComponents";
import {
  StyledModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  StockList,
  StockItem,
  SizeBadge,
  QuantityBadge,
} from "./StyledComponents";
import PropTypes from "prop-types";

export const ModelsTable = ({ modelos }) => {
  const [show, setShow] = useState(false);
  const [lowStockSizes, setLowStockSizes] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (stocks) => {
    const lowStock = stocks.filter((stock) => stock.quantity < 10);
    setLowStockSizes(lowStock);
    setShow(true);
  };

  const [modelosBypage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalModelos = modelos.length;
  const lastIndex = currentPage * modelosBypage;
  const firstIndex = lastIndex - modelosBypage;
  const navigate = useNavigate();

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
              .map((modelo) => {
                const principalImage =
                  modelo.images.find((img) => img.isPrimary === true) ||
                  modelo.images[0];

                // Popover grande con scroll horizontal para imágenes grandes
                const imagePopover = (
                  <Popover
                    id={`popover-scroll-${modelo.id}`}
                    style={{
                      maxWidth: "500px", // Ancho del popover
                      border: "none",
                      boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                      // Eliminar padding por defecto del popover si es necesario
                      // padding: 0
                    }}
                  >
                    <Popover.Body
                      style={{
                        padding: 0 /* Quitar padding para que el div ocupe todo */,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          overflowX: "auto", // Habilitar scroll horizontal
                          gap: "10px", // Espacio entre imágenes
                          padding: "10px", // Padding interno para el contenedor de scroll
                          alignItems: "center", // Centrar verticalmente si las alturas varían un poco
                        }}
                      >
                        {modelo.images.length > 0 ? (
                          modelo.images.map((img, idx) => (
                            <Image
                              key={img.id || idx}
                              src={img.url}
                              alt={`Imagen ${idx + 1}`}
                              style={{
                                height: "180px", // Altura fija y grande
                                width: "auto", // Ancho automático para mantener proporción
                                objectFit: "contain", // Asegurar que la imagen se vea completa
                                borderRadius: "4px", // Bordes redondeados leves
                                flexShrink: 0, // Evitar que las imágenes se encojan
                              }}
                            />
                          ))
                        ) : (
                          <div className="text-muted p-3">No hay imágenes</div>
                        )}
                      </div>
                    </Popover.Body>
                  </Popover>
                );

                return (
                  <tr key={modelo.id}>
                    <td>{modelo.color}</td>
                    <td>
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={imagePopover}
                      >
                        <Image
                          src={principalImage?.url}
                          alt={modelo.name}
                          width={30}
                          height={30}
                          roundedCircle
                          style={{ cursor: "pointer" }}
                        />
                      </OverlayTrigger>
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
                      {modelo.stocks.some((stock) => stock.quantity < 10) && (
                        <Badge
                          bg="warning"
                          text="dark"
                          onClick={() => {
                            handleShow(modelo.stocks);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Info: Stock bajo
                        </Badge>
                      )}
                      {modelo.stocks.length === 0 ? (
                        <Badge bg="danger" text="light">
                          No hay stock registrado
                        </Badge>
                      ) : (
                        modelo.stocks.every(
                          (stock) => stock.quantity >= 10
                        ) && (
                          <Badge bg="success" text="dark">
                            Info: Stock normal
                          </Badge>
                        )
                      )}
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
                );
              })
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

      <StyledModal show={show} onHide={handleClose} centered>
        <ModalHeader closeButton>
          <Modal.Title>
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Alertas de inventario
          </Modal.Title>
        </ModalHeader>
        <ModalBody>
          {lowStockSizes.length > 0 ? (
            <>
              <p className="text-muted mb-3">
                Las siguientes tallas tienen un inventario por debajo de 10
                unidades:
              </p>
              <StockList>
                {lowStockSizes.map((stock, index) => (
                  <StockItem key={index} isLow={stock.quantity < 5}>
                    <div>
                      <SizeBadge isLow={stock.quantity < 5}>
                        Talla {stock.size}
                      </SizeBadge>
                    </div>
                    <div>
                      <QuantityBadge isLow={stock.quantity < 5}>
                        {stock.quantity}{" "}
                        {stock.quantity === 1 ? "unidad" : "unidades"}
                      </QuantityBadge>
                    </div>
                  </StockItem>
                ))}
              </StockList>
              <div className="alert alert-warning mt-3">
                <i className="bi bi-info-circle-fill me-2"></i>
                Se recomienda reabastecer las tallas con menos de 5 unidades.
              </div>
            </>
          ) : (
            <div className="alert alert-success">
              <i className="bi bi-check-circle-fill me-2"></i>
              No hay tallas con bajo inventario.
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonCardStyled onClick={handleClose}>
            <i className="bi bi-check-lg me-2"></i>
            Entendido
          </ButtonCardStyled>
        </ModalFooter>
      </StyledModal>

      <Paginator
        byPage={modelosBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalModelos}
      />
    </div>
  );
};

ModelsTable.propTypes = {
  modelos: PropTypes.array.isRequired,
};
