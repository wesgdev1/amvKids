import styled from "@emotion/styled";
import { Offcanvas } from "react-bootstrap";

export const ContainerIcon = styled("div")(({ theme }) => ({
  display: "flex", // Cambiar a flex para permitir centrado flexible
  justifyContent: "center", // Centrar contenido horizontalmente
  alignItems: "center",
  width: "30px", // Establecer un ancho fijo
  height: "30px", // Establecer un alto fijo para hacer el elemento cuadrado
  borderRadius: "50%", // Hacer el borde completamente redondo
  padding: "0.2rem",
  margin: "0.2rem",
  color: theme.colors.mainColor, // Establecer el color del icono
  backgroundColor: theme.colors.buttonColor,

  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
  },
}));

export const OffcanvasTitleS = styled(Offcanvas.Title)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  color: "white",
}));

export const OffcanvasS = styled(Offcanvas)(({ theme }) => ({
  backgroundColor: "white",
  opacity: "85%",
  color: "white",
}));

export const OffcanvasBS = styled(Offcanvas.Body)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  color: "white",
}));

export const OffcanvasHbs = styled(Offcanvas.Header)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  color: "white",
}));
