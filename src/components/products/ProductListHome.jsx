import { useContext, useState } from "react";
import { Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { Paginator } from "../paginator/Paginator";
import { ShoeCard } from "../home/ShoeCard";
import { AuthContext } from "../../auth/context/AuthContext";

export const ProductListHome = ({ models }) => {
  const { user, logout } = useContext(AuthContext);
  const [productosBypage, setProductosByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalProductos = models.length;
  const lastIndex = currentPage * productosBypage;
  const firstIndex = lastIndex - productosBypage;
  const navigate = useNavigate();

  const viewProduct = (producto) => {
    // navigate(`/profile/products/${producto.id}/models`);
  };
  const editProduct = (producto) => {
    // navigate(`/profile/products/new`, {
    //   state: { producto },
    // });
    // data.map((model) => <ShoeCard key={model.id} model={model} />)
  };
  return (
    <div>
      <div className="d-flex gap-3 flex-wrap justify-content-center aligns-items-center ">
        {models.map((model) => (
          <ShoeCard key={model.id} model={model} />
        ))}
      </div>

      <Paginator
        byPage={productosBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalProductos}
      />
    </div>
  );
};
