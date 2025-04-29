import { Card, Col, Row, Button, Image } from "react-bootstrap";
import { useCart } from "../store";
import { CarCheckout } from "../components/car/CarCheckout";
import { CardElements } from "../components/car/CardElements";
import { Continue } from "../components/car/Continue";
import { useNavigate } from "react-router-dom";

export const CarList = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

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
                    Tienes ({calcularTotalCarrito()}) productos en tu carrito de
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
              <div className="text-center py-5 d-flex flex-column align-items-center">
                <Image
                  src="https://res.cloudinary.com/dppqkypts/image/upload/v1745961207/ChatGPT_Image_29_abr_2025_04_13_10_p.m._uoefiq.png"
                  alt="Carrito Vacío"
                  fluid
                  style={{ maxWidth: "250px", marginBottom: "2rem" }}
                />
                <h4 className="text-muted mb-3">Tu carrito está vacío</h4>
                <p className="text-secondary mb-4">
                  Parece que aún no has añadido ningún producto.
                </p>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/productos")}
                  className="btn-lg"
                >
                  <i className="bi bi-box-seam me-2"></i> Ver Productos
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};
