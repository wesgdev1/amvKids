import { useState } from "react";
import { Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { Paginator } from "../paginator/Paginator";
import { ControlButton } from "./StyledComponents";

export const ProductsTable = ({ productos }) => {
  const [productosBypage, setProductosByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalProductos = productos.length;
  const lastIndex = currentPage * productosBypage;
  const firstIndex = lastIndex - productosBypage;
  const navigate = useNavigate();

  const viewProduct = (producto) => {
    navigate(`/profile/products/${producto.id}/models`);
  };
  const editProduct = (producto) => {
    navigate(`/profile/products/new`, {
      state: { producto },
    });
  };
  return (
    <div className="pt-4">
      {" "}
      <Table striped bordered hover style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th>Nombre del producto</th>
            <th>Numero de modelos</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {productos
            .map((producto) => (
              <tr key={producto.id}>
                <td>{producto.name}</td>
                <td>{producto.models.length}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <ControlButton onClick={() => viewProduct(producto)}>
                      <i className="bi bi-eye-fill"></i>
                    </ControlButton>
                    <ControlButton onClick={() => editProduct(producto)}>
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
              <strong>Total Producto: {productos.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        byPage={productosBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalProductos}
      />
    </div>
  );
};
