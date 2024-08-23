import { Card, Col, Row } from "react-bootstrap";
import { useCart } from "../store";
import { CarCheckout } from "../components/car/CarCheckout";
import { CardElements } from "../components/car/CardElements";
import { Continue } from "../components/car/Continue";

export const CarList = () => {
  const { state, dispatch } = useCart();

  const calcularTotalCarrito = () => {
    let total = 0;
    state.forEach((element) => {
      total += element.quantity;
    });
    return total;
  };

  const calcularTotal = () => {
    let total = 0;
    state.forEach((element) => {
      total += element.price * element.quantity;
    });
    return total;
  };
  return (
    <section>
      <div className="pt-5 mb-5">
        <Card className="mx-3">
          <Card.Body className="p-4">
            <Continue />

            <hr className="pb-4" />
            {state.length > 0 ? (
              <div className="flex justify-center flex-wrap gap-5">
                <div className="">
                  <p>
                    Tienes {calcularTotalCarrito()} productos en tu carrito de
                    compras
                  </p>
                  {state.map((model, index) => (
                    <div key={index}>
                      <Row className="align-items-center">
                        <Col>
                          <CardElements model={model} dispatch={dispatch} />
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
                <Col className="col-12 col-lg-4">
                  <CarCheckout
                    state={state}
                    calcularTotal={calcularTotal}
                    dispatch={dispatch}
                  />
                </Col>
              </div>
            ) : (
              <p>No hay productos en el carrito</p>
            )}
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};
