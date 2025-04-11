import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    setCurrentPage(1);
  }, [models]);
  return (
    <div>
      <div className="d-flex gap-3 flex-wrap justify-content-center aligns-items-center ">
        {models
          .map((model) => <ShoeCard key={model.id} model={model} />)
          .slice(firstIndex, lastIndex)}
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
