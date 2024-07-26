import { useState } from "react";
import { Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { ControlButton } from "../products/StyledComponents";
import { Paginator } from "../paginator/Paginator";

export const ModelsTable = ({ modelos }) => {
  const [modelosBypage, setModelosByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalModelos = modelos.length;
  const lastIndex = currentPage * modelosBypage;
  const firstIndex = lastIndex - modelosBypage;
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
            <th>Referencia</th>
            <th>Imagen</th>
            <th>Nombre del modelo</th>
            <th>Precio del modelo</th>
            <th>Total unidades</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {modelos
            .map((modelo) => (
              <tr key={modelo.id}>
                <td>{modelo.reference}</td>
                <td>{modelo.image}</td>
                <td>{modelo.name}</td>
                <td>{modelo.price}</td>
                <td>{50}</td>
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
      <Paginator
        byPage={modelosBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalModelos}
      />
    </div>
  );
};
