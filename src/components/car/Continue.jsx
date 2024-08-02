import { Link } from "react-router-dom";

export const Continue = () => {
  return (
    <h5 className="mb-3">
      <Link to="/productos">
        <i className="bi bi-arrow-left"> </i>
        Continuar comprando
      </Link>
    </h5>
  );
};
