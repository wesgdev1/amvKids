import { useState } from "react";
import { Image, Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { ControlButton } from "../products/StyledComponents";
import { Paginator } from "../paginator/Paginator";
import { ModalUpdateStock } from "./ModalUpdateStock";

export const StockTable = ({ stocks, refresh, idModel }) => {
  const [stocksBypage, setStocksByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalStocks = stocks.length;
  const lastIndex = currentPage * stocksBypage;
  const firstIndex = lastIndex - stocksBypage;
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState(null); // Estado para el stock seleccionado
  const [showModal, setShowModal] = useState(false); //

  const editProduct = (stock) => {
    setSelectedStock(stock);
    setShowModal(true);
    console.log(stock);

    // quiero renderizar un componente que es un modal con el stock
  };

  const closeModal = () => {
    setSelectedStock(null); // Limpia el stock seleccionado
    setShowModal(false); // Oculta el modal
  };

  return (
    <div className="pt-4">
      {" "}
      <Table striped bordered hover style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th>Talla</th>
            <th>Cantidad</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {stocks
            .map((stock) => (
              <tr key={stock.id}>
                <td>{stock.size}</td>
                <td>{stock.quantity}</td>

                <td>
                  <div className="flex justify-center gap-2">
                    {/* <ControlButton onClick={() => viewProduct(stock)}>
                      <i className="bi bi-eye-fill"></i>
                    </ControlButton> */}
                    <ControlButton onClick={() => editProduct(stock)}>
                      <i className="bi bi-plus-square-fill"></i>
                      Adicionar cantidad
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
              <strong>Total Tallas: {stocks.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      {showModal && (
        <ModalUpdateStock
          refresh={refresh}
          idModel={idModel}
          show={showModal} // Pasa el estado del modal
          stock={selectedStock} // Pasa el stock seleccionado al modal
          handleClose={closeModal} // Pasa la función para cerrar el modal
        />
      )}
      <Paginator
        byPage={stocksBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalStocks}
      />
    </div>
  );
};
