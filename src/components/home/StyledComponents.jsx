import styled from "@emotion/styled";
import { Button, Card } from "react-bootstrap";

export const CardDescroptionStyle = styled(Card.Text)(() => ({
  height: "70px",
  overflow: "hidden",
  whiteSpace: "normal",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  borderRadius: "5px",
}));

export const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
`;

export const ImageSkeleton = styled.div`
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

export const CardImage = styled.img`
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
`;

export const IconStyled = styled("a")(() => ({
  backgroundColor: "green",
  color: "white",
  borderRadius: "50%",
  width: "70px",
  lineHeight: "70px",
  position: "fixed",
  bottom: "15%",
  right: "5%",
  textAlign: "center",

  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  zIndex: 100,
  "&:hover": {
    textDecoration: "none",
    color: "green",
    backgroundColor: "white",
  },
}));

export const IconStyled2 = styled("a")(() => ({
  backgroundColor: "green",
  color: "white",
  borderRadius: "50%",
  width: "70px",
  lineHeight: "70px",
  position: "fixed",
  bottom: "5%",
  right: "5%",
  textAlign: "center",

  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  zIndex: 100,
  "&:hover": {
    width: "75px",
    textDecoration: "none",
    color: "green",
    backgroundColor: "white",
    boxShadow: "0px 0px 10px 0px rgba(1,1,1,0.75)",
  },
}));

export const ContainerMov = styled("div")(() => ({
  opacity: 0,
  transform: "rotateY(90deg)",
  animation: "flipIn 1s ease-out forwards",
  "@keyframes flipIn": {
    "0%": {
      opacity: 0,
      transform: "rotateY(90deg)",
    },
    "100%": {
      opacity: 1,
      transform: "rotateY(0deg)",
    },
  },
}));

export const ButtonAction = styled(Button)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  bottom: "2rem",
  transform: "translateX(-50%)",
  width: "auto",
  minWidth: "150px",
  maxWidth: "calc(100% - 2rem)",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  fontWeight: "bold",
  color: theme.colors.mainColor,
  backgroundColor: theme.colors.buttonColor,
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  transition:
    "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",

  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
    transform: "translateX(-50%) scale(1.03)",
  },

  "@media (max-width: 576px)": {
    minWidth: "120px",
    fontSize: "0.9rem",
    padding: "0.6rem 1.2rem",
    bottom: "2rem",
  },
}));
