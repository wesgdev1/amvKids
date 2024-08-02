import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { ButtonCrash, CardElementStyle } from "./StyledComponent";

export const CardElements = ({ model }) => {
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
          <Col>cantidad: {model.quantity}</Col>
          <Col>Talla: {model.size}</Col>
          <Col>
            <strong>${model.price.toLocaleString("es-CO")}</strong>
          </Col>
          <Col>
            <ButtonCrash
            // onClick={() => {
            //   deleteElement(carElement);
            // }}
            >
              <i className="bi bi-trash-fill" />
            </ButtonCrash>
          </Col>
        </Row>
      </Card.Body>
    </CardElementStyle>
  );
};
