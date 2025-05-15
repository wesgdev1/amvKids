/* eslint-disable react/prop-types */
import { Card, Col, Form } from "react-bootstrap";
import {
  BtnDangerSubmitStyled,
  BtnSubmitStyled,
  ButtonCountStyled,
  CardStoreStyle,
} from "./StyledComponents";
import { useCounter } from "../../hooks/useCounter";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../store";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { useLocation } from "react-router-dom";

export const ControlProduct = ({ data }) => {
  const location = useLocation();
  const isNoAuthRoute = location.pathname.includes("productosNoAuth");
  const { user } = useContext(AuthContext);
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/productos");
  };
  const [size, setSize] = useState(null);
  const [maxValue, setMaxValue] = useState(data.totalStocks);

  const { counter, increment, decrement, reset } = useCounter(1, maxValue);

  const hanldeClickSuccess = () => {
    //si existe el usuario trabaje normal si no mandelo al login

    if (user) {
      if (size === null) {
        Swal.fire({
          icon: "error",
          title: "Seleccione una talla",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
        return;
      }
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          item: data,
          quantity: counter,
          size: size,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Producto agregado al carrito",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
      reset();
    } else {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setSize(e.target.value);
    console.log(e.target.value);
    console.log(data.stocks);
    const stock = data.stocks.find((stock) => stock.size == e.target.value);
    console.log(stock);
    setMaxValue(stock.quantity);
    console.log(maxValue);
    reset();
  };

  return (
    <CardStoreStyle className="d-flex mb-3 px-5  ">
      <Card.Body className="d-flex justify-content-between flex-wrap flex-col ">
        <Card.Title className="text-center">
          {data.name} - {data.color}
        </Card.Title>
        <hr />

        <Col>
          <Card.Text>
            <div className="flex items-center justify-center gap-4">
              <div>
                <div>Precio</div>
                <div className="fs-4">
                  {data.isPromoted && data.pricePromoted > 0 ? (
                    <>${data.pricePromoted.toLocaleString("es-CO")}</>
                  ) : isNoAuthRoute ? (
                    <>${data.normalPrice.toLocaleString("es-CO")}</>
                  ) : (
                    <>${data.price.toLocaleString("es-CO")}</>
                  )}
                </div>
              </div>
              <Form.Select
                size="md"
                onChange={handleChange}
                value={size}
                style={{
                  width: "50%",
                }}
              >
                <option>Talla</option>
                {/* {data.stocks.map((option, index) => (
                  <option key={index} value={option.size}>
                    {option.size}
                  </option>
                ))} */}

                {data.stocks.map((option, index) => {
                  if (option.quantity > 0) {
                    return (
                      <option key={index} value={option.size}>
                        {option.size}
                      </option>
                    );
                  }
                })}
              </Form.Select>
            </div>

            <div>
              <div className="pt-4  d-flex justify-content-center">
                <ButtonCountStyled
                  onClick={() => {
                    decrement(1);
                  }}
                  disabled={size === null}
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
                  disabled={size === null}
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
        {user ? (
          user.tipoUsuario === "Admin" ? null : (
            <BtnSubmitStyled onClick={hanldeClickSuccess} width="100%">
              Agregar al carrito
            </BtnSubmitStyled>
          )
        ) : (
          <BtnSubmitStyled
            onClick={() => {
              navigate("/login");
            }}
            width="100%"
          >
            Iniciar sesion para comprar
          </BtnSubmitStyled>
        )}
        {/* <BtnSubmitStyled onClick={hanldeClickSuccess} width="100%">
          Agregar al carrito
        </BtnSubmitStyled> */}

        <BtnDangerSubmitStyled onClick={handleReturn} width="100%">
          Volver
        </BtnDangerSubmitStyled>
      </div>
    </CardStoreStyle>
  );
};
