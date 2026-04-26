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
  border-radius: 6px;
`;

const ImageSkeleton = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #2a0560 25%, #3d0880 50%, #2a0560 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 6px;

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
  transition: transform 0.4s ease, opacity 0.3s ease-in-out;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;

  &:hover {
    transform: scale(1.06);
  }
`;

const CardTitleStyled = styled(Card.Title)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
`;

const ColorTag = styled.span`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 0.15em 0.5em;
  border-radius: 4px;
  font-size: 0.72em;
  text-transform: capitalize;
  backdrop-filter: blur(4px);
`;

const ProductTag = styled.span`
  display: inline-block;
  background-color: #90ff69;
  color: #1a1a1a;
  padding: 0.15em 0.5em;
  border-radius: 4px;
  font-size: 0.72em;
  font-weight: 700;
  text-transform: capitalize;
`;

const SoldOutOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  border-radius: 6px;
`;

const SoldOutBadge = styled.div`
  background: rgba(220, 53, 69, 0.92);
  color: white;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
  padding: 6px 16px;
  border-radius: 20px;
  text-transform: uppercase;
`;

const PromoBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: #1a1a1a;
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 3px 9px;
  border-radius: 12px;
  text-transform: uppercase;
  z-index: 3;
  box-shadow: 0 2px 6px rgba(255, 152, 0, 0.5);
`;

const PriceBox = styled(Card.Text)`
  background: rgba(0, 0, 0, 0.55);
  color: white;
  padding: 0.4em 0.6em;
  border-radius: 6px;
  position: relative;
  min-height: 2.2em;
  font-size: 0.82rem;
  font-weight: 700;
  text-align: center;
  margin-top: 6px;
  margin-bottom: 0;
`;

const OfferBadgeStyled = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: #ffc107;
  color: #343a40;
  padding: 2px 6px;
  font-size: 0.6em;
  font-weight: 800;
  border-radius: 4px;
  line-height: 1;
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
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (observer) observer.disconnect();
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
    if (typeof productModel.stocks === "number") return productModel.stocks;
    if (Array.isArray(productModel.stocks)) {
      if (productModel.stocks.length === 0) return 0;
      return productModel.stocks.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0),
        0
      );
    }
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
    if (isInPromotion) return formatPrice(model.pricePromoted);
    if (user?.tipoUsuario === "Reventa") return formatPrice(model.price);
    if (user?.tipoUsuario === "Tienda Aliada")
      return formatPrice(model.alliancePrice);
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
            <SoldOutOverlay>
              <SoldOutBadge>Agotado</SoldOutBadge>
            </SoldOutOverlay>
          )}
          {!isSoldOut && isInPromotion && <PromoBadge>Promo</PromoBadge>}
        </ImageContainer>
        <Card.Body style={{ padding: "10px 6px 6px" }}>
          <CardTitleStyled>{model.name}</CardTitleStyled>
          <TagsRow>
            {model.color && <ColorTag>{model.color}</ColorTag>}
            {model.product?.name && (
              <ProductTag>{capitalizeWords(model.product.name)}</ProductTag>
            )}
          </TagsRow>
          <CardDescroptionStyle>{model.description}</CardDescroptionStyle>
          <PriceBox>
            {getDisplayPriceString()}
            {isInPromotion && !isSoldOut && (
              <OfferBadgeStyled>OFERTA</OfferBadgeStyled>
            )}
          </PriceBox>
        </Card.Body>
      </ShoesCardStyled>
    </>
  );
};
