/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import { ShoesCardStyled } from "../StyledComponents";
import { CardDescroptionStyle } from "./StyledComponents";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
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

const ColorTag = styled.span`
  display: inline-block;
  background-color: white;
  color: #000000;
  padding: 0.2em 0.5em;
  border-radius: 5px;
  font-size: 0.8em;
  margin-top: 0.5em;
  text-transform: capitalize;
`;

const ProductTag = styled.span`
  display: inline-block;
  background-color: #a7f3d0;
  color: #047857;
  padding: 0.2em 0.5em;
  border-radius: 5px;
  font-size: 0.8em;
  margin-top: 0.5em;
  margin-left: 0.5em;
  font-weight: 500;
`;

export const ShoeCard = ({ model }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const handleClick = () => {
    if (user) {
      navigate(`/productos/${model.id}`);
    } else {
      navigate(`/login`);
    }
  };

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <ShoesCardStyled ref={containerRef} onClick={handleClick}>
        <ImageContainer>
          {!imageLoaded && <ImageSkeleton />}
          <CardImage
            variant="top"
            src={
              isVisible
                ? model.images.find((img) => img.isPrimary)?.url ||
                  model.images[0]?.url ||
                  "https://via.placeholder.com/150"
                : ""
            }
            loaded={imageLoaded}
            onLoad={() => setImageLoaded(true)}
          />
        </ImageContainer>
        <Card.Body>
          <CardTitleStyled>{model.name}</CardTitleStyled>
          <div>
            {model.color && <ColorTag>{model.color}</ColorTag>}
            {model.product?.name && (
              <ProductTag>{capitalizeWords(model.product.name)}</ProductTag>
            )}
          </div>
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

            {!user && model.normalPrice.toLocaleString("es-CO") + " COP"}
          </Card.Text>
        </Card.Body>
      </ShoesCardStyled>
    </>
  );
};
