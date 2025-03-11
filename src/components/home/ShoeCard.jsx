/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import { ButtonCardStyled, ShoesCardStyled } from "../StyledComponents";
import { CardDescroptionStyle } from "./StyledComponents";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";

export const ShoeCard = ({ model }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    // Reviso si esta logueado, si no estra logueado, lo envio a la pagina de login
    if (user) {
      navigate(`/productos/${model.id}`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <>
      <ShoesCardStyled>
        <Card.Img
          variant="top"
          src={model.images[0]?.url || "https://via.placeholder.com/150"}
        />
        <Card.Body>
          <Card.Title>{model.name}</Card.Title>
          <CardDescroptionStyle>{model.description}</CardDescroptionStyle>
          <Card.Text
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            className="text-center"
          >
            {user?.tipoUsuario === "Reventa" &&
              model.price.toLocaleString("es-CO") + " COP"}

            {user?.tipoUsuario === "Tienda Aliada" &&
              model.alliancePrice.toLocaleString("es-CO") + " COP"}

            {user?.tipoUsuario === "Cliente" &&
              model.normalPrice.toLocaleString("es-CO") + " COP"}
            {user?.tipoUsuario === "Preparador" &&
              model.normalPrice.toLocaleString("es-CO") + " COP"}

            {user?.tipoUsuario === "Admin" &&
              model.normalPrice.toLocaleString("es-CO") + " COP"}
            {user?.tipoUsuario === "Whatsapp" &&
              model.normalPrice.toLocaleString("es-CO") + " COP"}

            {/* si no hay user */}
            {!user && model.normalPrice.toLocaleString("es-CO") + " COP"}
            {/* {model.price.toLocaleString("es-CO")} COP */}
          </Card.Text>
          <div className="d-flex justify-center ">
            <ButtonCardStyled onClick={handleClick}>
              Ver Detalle
            </ButtonCardStyled>
          </div>
        </Card.Body>
      </ShoesCardStyled>
    </>
  );
};
