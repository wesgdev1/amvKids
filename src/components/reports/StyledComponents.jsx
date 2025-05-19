import styled from "@emotion/styled";
import { Button } from "react-bootstrap";

export const ButtonPayment = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.buttonColor,
  width: "100%",
  color: theme.colors.mainColor,
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
  },
}));

// Contenedor para las estadísticas
export const StatsContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(180px, 1fr)
  ); // Columnas adaptables
  gap: 1.5rem; // Espacio entre tarjetas
  margin-bottom: 2rem; // Espacio antes del <hr />
`;

// Tarjeta individual de estadística
export const StatCardStyled = styled.div`
  background: linear-gradient(
    135deg,
    #6a11cb 0%,
    #2575fc 100%
  ); // Nuevo gradiente Púrpura -> Azul
  // background: ${({ theme }) =>
    theme.colors.gradientPrimary ||
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}; // Con fallback a theme
  color: white;
  // color: ${({ theme }) => theme.colors.white || "white"};
  padding: 1.5rem 1rem;
  border-radius: 15px; // Bordes más redondeados
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px; // Altura mínima para consistencia

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .stat-icon {
    font-size: 2.5rem; // Icono grande
    margin-bottom: 0.75rem;
    opacity: 0.8;
  }

  .stat-value {
    font-size: 2rem; // Valor grande y bold
    font-weight: 700;
    line-height: 1.2;
  }

  .stat-label {
    font-size: 0.9rem;
    margin-top: 0.25rem;
    opacity: 0.9;
  }
`;

// Tarjeta para gráficos de utilidades
export const StatCardGraficos = styled.div`
  background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%);
  border-radius: 15px;
  padding: 2rem;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  margin: 2rem 0;
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;

  .grafico-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    i {
      font-size: 2.5rem;
      margin-right: 1rem;
      opacity: 0.8;
    }

    h5 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: bold;
    }
  }

  .grafico-container {
    flex: 1;
    min-height: 70vh;
    position: relative;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 1rem;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    i {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      opacity: 0.8;
    }
  }

  .no-data-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    i {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
  }
`;
