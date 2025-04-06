import Swal from "sweetalert2";
import { ButtonPayment, CardChekoutStyle } from "./StyledComponent";
import { Card, Spinner } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { createOrder } from "../../api/orders/orders";
import { set } from "zod";
import AddiWidget from "../payments/AddiWidget";

export const CarCheckout = ({ calcularTotal, dispatch, state }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const payload = {
        total: calcularTotal(),
        comments,
        items: state.map((element) => {
          return {
            modelId: element.id,
            // pasar a number el size
            size: Number(element.size),

            quantity: element.quantity,
          };
        }),
      };

      let response = await createOrder(payload);
      console.log("envie la orden", response);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Compra exitosa",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      }
      setLoading(false);

      dispatch({
        type: "DELETE_ALL",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Error al realizar la compra, ${error.message}`,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
    }
  };
  return (
    <CardChekoutStyle>
      <Card.Body>
        <Card.Text>Cuenta </Card.Text>
        <div className="d-flex justify-content-between">
          <p className="mb-2">Subtotal</p>
          <p className="mb-2">${calcularTotal().toLocaleString("es-CO")}</p>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <p className="mb-2">Descuento</p>

          <p className="mb-2">${0}</p>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <p className="mb-2">Total</p>

          <p className="mb-2">${calcularTotal().toLocaleString("es-CO")}</p>
        </div>
        <Card.Text>Comentarios</Card.Text>
        <textarea
          className="w-100 text-black px-2"
          rows="3"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>
        <ButtonPayment onClick={handleCheckout}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Realizar pedido"
          )}
        </ButtonPayment>

        <AddiWidget price={String(calcularTotal())} allySlug="sandbox" />
        {/* <AddiWidget price={"100000"} allySlug="sandbox" /> */}
      </Card.Body>
    </CardChekoutStyle>
  );
};
