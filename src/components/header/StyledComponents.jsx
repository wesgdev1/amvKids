import styled from "@emotion/styled";
import { Offcanvas } from "react-bootstrap";
import { keyframes } from "@emotion/react";

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
  color: theme.colors.mainColor,
}));

export const OffcanvasS = styled(Offcanvas)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  opacity: "94%",
  color: "white",
}));

// Animación para el fondo degradado
const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const OffcanvasBS = styled(Offcanvas.Body)(({ theme }) => ({
  // Combinar mainColor con un tono ligeramente más claro o secondaryColor si existe
  // Aquí asumimos un tono un poco más claro, ajustar si es necesario
  background: `linear-gradient(-45deg, ${theme.colors.mainColor}, #4e54c8, ${theme.colors.mainColor}, #9c8bff)`,
  backgroundSize: "400% 400%", // Tamaño más grande para la animación
  animation: `${animatedGradient} 15s ease infinite`, // Aplicar la animación
  color: "white", // Mantener el color de texto o ajustarlo si es necesario
}));

export const OffcanvasHbs = styled(Offcanvas.Header)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  // imagen de fondo

  color: "white",
}));

export const OffcanvasBSfilter = styled(Offcanvas.Body)(({ theme }) => ({
  backgroundColor: "white",
  background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
  backgroundSize: "cover",
  color: "white",
  opacity: "100%",
}));
