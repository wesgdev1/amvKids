/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import { ButtonCardStyled, ShoesCardStyled } from "../StyledComponents";
import { CardDescroptionStyle } from "./StyledComponents";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import styled from "@emotion/styled";

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
`;

const ImageSkeleton = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 5px;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const CardImage = styled(Card.Img)`
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
`;

const CardTitleStyled = styled(Card.Title)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const ShoeCard = ({ model }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

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
        <ImageContainer>
          {!imageLoaded && <ImageSkeleton />}
          <CardImage
            variant="top"
            src={model.images[0]?.url || "https://via.placeholder.com/150"}
            loaded={imageLoaded}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </ImageContainer>
        <Card.Body>
          <CardTitleStyled>{model.name}</CardTitleStyled>
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
