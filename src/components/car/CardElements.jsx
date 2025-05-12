import { Card, Col, Image, Row } from "react-bootstrap";
import { ButtonCrash, CardElementStyle } from "./StyledComponent";

export const CardElements = ({ model, dispatch }) => {
  const deleteElement = (aux) => {
    console.log(aux);
    dispatch({
      type: "DELETE",
      payload: { aux },
    });
  };
  return (
    <CardElementStyle className="mb-3 element-list">
      <Card.Body>
        <Row className="align-items-center">
          <Col>
            <Image
              src={model.images[0].url}
              alt="Imagen del producto"
              width="60"
              height="60"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                boxShadow: "0 0 10px rgba(0,0,0,1)",
              }}
            />
          </Col>
          <Col>{model.name}</Col>
          <Col>({model.quantity})</Col>
          <Col>
            <ButtonCrash
              onClick={() => {
                dispatch({
                  type: "DELETE_ONE",
                  payload: { aux: model },
                });
              }}
            >
              <i className="bi bi-dash-circle-fill" />
            </ButtonCrash>
          </Col>
          <Col>Talla: {model.size}</Col>
          <Col>
            {model.isPromoted && model.pricePromoted > 0 ? (
              <>${model.pricePromoted.toLocaleString("es-CO")}</>
            ) : (
              <>${model.price.toLocaleString("es-CO")}</>
            )}
          </Col>
          <Col>
            <ButtonCrash
              onClick={() => {
                deleteElement(model);
              }}
            >
              <i className="bi bi-trash-fill" />
            </ButtonCrash>
          </Col>
        </Row>
      </Card.Body>
    </CardElementStyle>
  );
};
