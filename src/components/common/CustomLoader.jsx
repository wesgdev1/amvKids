import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// Definir la animación de giro
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Contenedor para centrar el loader
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem; // Añadir algo de espacio alrededor
  min-height: 150px; // Asegurar que tenga algo de altura
`;

// Imagen del logo con la animación
const LogoImage = styled.img`
  width: 60px; // Ajusta el tamaño según necesites
  height: 60px;
  animation: ${spin} 1.5s linear infinite; // Aplicar animación
`;

export const CustomLoader = () => {
  return (
    <LoaderContainer>
      <LogoImage
        src="https://res.cloudinary.com/dppqkypts/image/upload/v1706219895/AMV_LOGO_w8oxo5.png"
        alt="Cargando..."
      />
    </LoaderContainer>
  );
};
