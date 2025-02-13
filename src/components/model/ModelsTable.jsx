import { useState } from "react";
import { Image, Table } from "react-bootstrap";

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

  const viewProduct = (modelo) => {
    navigate(`/profile/models/${modelo.id}`);
  };
  const editProduct = (producto) => {
    navigate(`/profile/products/new`, {
      state: { producto },
    });
  };

  const calculateStock = (stocks) => {
    return stocks.reduce((acc, stock) => acc + stock.quantity, 0);
  };
  return (
    <div className="pt-4">
      {" "}
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
