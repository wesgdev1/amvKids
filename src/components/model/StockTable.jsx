import { useState } from "react";
import { Image, Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { ControlButton } from "../products/StyledComponents";
import { Paginator } from "../paginator/Paginator";

export const StockTable = ({ stocks }) => {
  const [stocksBypage, setStocksByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalStocks = stocks.length;
  const lastIndex = currentPage * stocksBypage;
  const firstIndex = lastIndex - stocksBypage;
  const navigate = useNavigate();

  const viewProduct = (modelo) => {
    // navigate(`/profile/models/${modelo.id}`);
  };
  const editProduct = (producto) => {
    // navigate(`/profile/products/new`, {
    //   state: { producto },
    // });
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
                    <ControlButton onClick={() => viewProduct(stock)}>
                      <i className="bi bi-eye-fill"></i>
                    </ControlButton>
                    <ControlButton onClick={() => editProduct(stock)}>
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
              <strong>Total Tallas: {stocks.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        byPage={stocksBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalStocks}
      />
    </div>
  );
};
