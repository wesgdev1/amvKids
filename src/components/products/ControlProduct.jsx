import { Card, Col } from "react-bootstrap";
import {
  BtnDangerSubmitStyled,
  BtnSubmitStyled,
  ButtonCountStyled,
  CardStoreStyle,
} from "./StyledComponents";
import { useCounter } from "../../hooks/useCounter";
import { useNavigate } from "react-router-dom";

export const ControlProduct = ({ data }) => {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/productos");
  };
  const { counter, increment, decrement } = useCounter(1, data.totalStocks);
  return (
    <CardStoreStyle className="d-flex mb-3 px-5 ">
      <Card.Body className="d-flex justify-content-between flex-wrap ">
        <Card.Title>{data.name}</Card.Title>

        <Col className="col-7 col-md-12 col-xl-6">
          <Card.Text>
            <div className="d-flex align-items-center gap-2">
              <div>
                <div>Precio por Unidad.</div>
                <div className="fs-4">
                  ${data.price.toLocaleString("es-CO")}
                </div>
              </div>

              <div className="  d-flex justify-content-center">
                <ButtonCountStyled
                  onClick={() => {
                    decrement(1);
                  }}
                  className="border px-3"
                  variant="light"
                >
                  -
                </ButtonCountStyled>
                <div className="px-3 pt-2">{counter}</div>
                <ButtonCountStyled
                  onClick={() => {
                    increment(1);
                  }}
                  className=" border px-3"
                  variant="light"
                >
                  +
                </ButtonCountStyled>
              </div>
            </div>
          </Card.Text>
        </Col>
      </Card.Body>
      <div className="d-flex gap-3 ">
        <BtnSubmitStyled onClick={console.log("")} width="100%">
          Agregar al carrito
        </BtnSubmitStyled>

        <BtnDangerSubmitStyled onClick={handleReturn} width="100%">
          Volver
        </BtnDangerSubmitStyled>
      </div>
    </CardStoreStyle>
  );
};
