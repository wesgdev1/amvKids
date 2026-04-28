import { useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const ArchivedButton = styled.button`
  background: none;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 2px 10px;
  font-size: 0.7rem;
  color: #666;
  cursor: pointer;
  margin-left: 8px;
  transition:
    border-color 0.2s,
    color 0.2s;

  &:hover {
    border-color: #390688;
    color: #390688;
  }
`;

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
  const viewProductArchived = (producto) => {
    navigate(`/profile/products/${producto.id}/modelsArchived`);
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
                <td>
                  {producto.models?.filter((m) => m.isActive).length || 0}
                </td>
                <td>
                  {producto.models?.filter((m) => !m.isActive).length || 0}
                  <ArchivedButton onClick={() => viewProductArchived(producto)}>
                    ver archivados
                  </ArchivedButton>
                </td>
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
