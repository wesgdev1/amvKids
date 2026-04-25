import { useState } from "react";
import { Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { Paginator } from "../paginator/Paginator";
import { ControlButton } from "./StyledComponents";
import { InitialsAvatar } from "../common/InitialsAvatar";

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
            <th>
              <i className="bi bi-tag-fill me-1"></i>Nombre del producto
            </th>
            <th>
              <i className="bi bi-check-circle-fill me-1"></i>Modelos Activos
            </th>
            <th>
              <i className="bi bi-archive-fill me-1"></i>Modelos Archivados
            </th>
            <th>
              <i className="bi bi-gear-fill me-1"></i>Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {productos
            .map((producto) => (
              <tr key={producto.id}>
                <td>
                  <InitialsAvatar name={producto.name.toUpperCase()} />
                </td>
                <td>{producto.models.length}</td>
                <td>{0}</td>
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
              <strong>Total Productos o categorias: {productos.length}</strong>
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
