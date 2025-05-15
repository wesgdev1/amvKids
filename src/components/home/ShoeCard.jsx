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

// Nuevo componente estilizado para la etiqueta "AGOTADO"
const SoldOutSash = styled.div`
  position: absolute;
  top: 0px; // Ajusta según el borde/padding de ImageContainer
  left: 0px;
  width: 150px;
  height: 150px;
  overflow: hidden;
  pointer-events: none; // Para no interferir con clics en la tarjeta
  z-index: 3; // Para estar sobre la imagen

  span {
    position: absolute;
    display: block;
    width: 200px; // Ancho de la cinta
    padding: 8px 0;
    background-color: rgba(220, 53, 69, 0.85); // Rojo con algo de transparencia
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    transform: rotate(-45deg);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    // Ajuste de posición para la esquina superior izquierda
    left: -60px;
    top: 35px;
  }
`;

// Nuevo componente estilizado para la etiqueta "EN PROMOCIÓN"
const PromotionSash = styled.div`
  position: absolute;
  top: 8px; // Ajuste para no superponerse completamente con la esquina
  right: -35px; // Ligeramente fuera para efecto de cinta
  width: 120px; // Más pequeña
  height: auto;
  overflow: visible; // Permitir que la cinta exceda un poco si es necesario
  pointer-events: none;
  z-index: 2; // Debajo de SoldOutSash si ambas estuvieran (caso raro)
  transform: rotate(45deg);

  span {
    display: block;
    width: 100%;
    padding: 4px 0; // Menos padding vertical
    background-color: rgba(255, 193, 7, 0.9); // Amarillo con transparencia
    color: #333; // Texto oscuro para contraste
    font-size: 10px; // Más pequeño
    font-weight: bold;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

// Nuevo Badge para la oferta en el precio
const OfferBadgeStyled = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: #ffc107; // Amarillo
  color: #343a40; // Texto oscuro
  padding: 2px 6px;
  font-size: 0.65em;
  font-weight: bold;
  border-radius: 0.2rem;
  line-height: 1;
  z-index: 1;
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
      navigate(`/productosNoAuth/${model.id}`);
    }
  };

  const getEffectiveStock = (productModel) => {
    if (!productModel) return 0;
    // Escenario 1: model.stock es un valor numérico directo
    if (typeof productModel.stocks === "number") {
      return productModel.stocks;
    }
    // Escenario 2: model.stock es un array de objetos de stock
    if (Array.isArray(productModel.stocks)) {
      if (productModel.stocks.length === 0) return 0; // Array vacío significa sin stock
      return productModel.stocks.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0),
        0
      );
    }
    // Fallback: si model.stock no está en el formato esperado, asumir 0 stock
    return 0;
  };

  const totalStock = getEffectiveStock(model);
  const isSoldOut = totalStock === 0;
  const isInPromotion =
    model?.isPromoted === true &&
    typeof model?.pricePromoted === "number" &&
    model.pricePromoted > 0;

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatPrice = (price) => {
    if (typeof price !== "number" || isNaN(price))
      return "Precio no disponible";
    return price.toLocaleString("es-CO") + " COP";
  };

  const getDisplayPriceString = () => {
    if (isInPromotion) {
      return formatPrice(model.pricePromoted);
    }
    if (user?.tipoUsuario === "Reventa") return formatPrice(model.price);
    if (user?.tipoUsuario === "Tienda Aliada")
      return formatPrice(model.alliancePrice);
    // Cliente, Preparador, Admin, Whatsapp y !user usan normalPrice
    return formatPrice(model.normalPrice);
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
          {isSoldOut && (
            <SoldOutSash>
              <span>AGOTADO</span>
            </SoldOutSash>
          )}
          {!isSoldOut && isInPromotion && (
            <PromotionSash>
              <span>PROMO</span>
            </PromotionSash>
          )}
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
              color: "white",
              padding: "0.5em",
              borderRadius: "4px",
              position: "relative",
              minHeight: "2.5em",
            }}
            className="text-center"
          >
            {getDisplayPriceString()}
            {isInPromotion && !isSoldOut && (
              <OfferBadgeStyled>OFERTA</OfferBadgeStyled>
            )}
          </Card.Text>
        </Card.Body>
      </ShoesCardStyled>
    </>
  );
};
