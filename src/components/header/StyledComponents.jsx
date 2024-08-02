import styled from "@emotion/styled";

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
