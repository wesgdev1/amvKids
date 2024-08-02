import { Card, Col, Row } from "react-bootstrap";
import { useCart } from "../store";
import { CarCheckout } from "../components/car/CarCheckout";
import { CardElements } from "../components/car/CardElements";

export const CarList = () => {
  const { state, dispatch } = useCart();
  return (
    <section>
      <div className="pt-5 mb-5">
        <Card>
          <Card.Body className="p-4">
            {/* <Continue /> */}
            {/* <Divisor /> */}
            <hr />
            {state.length > 0 ? (
              <div className="flex justify-center flex-wrap gap-5">
                <div className="">
                  {state.map((model) => (
                    <div key={model.id}>
                      <Row className="align-items-center">
                        <Col>
                          <CardElements
                            model={model}
                            // dispatch={dispatch}
                          />
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
                <Col className="col-12 col-lg-4">
                  <CarCheckout
                  // cart={company}
                  // total={company.total}
                  // id_empresa={company.id_empresa}
                  // dispatch={dispatch}
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
