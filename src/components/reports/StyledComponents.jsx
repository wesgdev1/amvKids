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

export const StatsContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

export const StatCardStyled = styled.div`
  background: linear-gradient(145deg, #2563eb 0%, #60a5fa 100%);
  color: white;
  padding: 1.75rem 1.5rem;
  border-radius: 18px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 6px 20px rgba(0, 0, 0, 0.1),
    0 16px 40px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 168px;
  position: relative;
  overflow: hidden;
  cursor: default;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 8%;
    right: 8%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.55),
      transparent
    );
  }

  &::after {
    content: "";
    position: absolute;
    top: -35%;
    left: -15%;
    width: 65%;
    height: 75%;
    background: radial-gradient(
      ellipse,
      rgba(255, 255, 255, 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 12px 32px rgba(0, 0, 0, 0.15),
      0 24px 56px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }

  .stat-icon {
    font-size: 1.8rem;
    margin-bottom: 0.7rem;
    opacity: 0.86;
    position: relative;
    z-index: 1;
  }

  .stat-value {
    font-size: 2.1rem;
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.5px;
    position: relative;
    z-index: 1;
  }

  .stat-label {
    font-size: 0.71rem;
    margin-top: 0.45rem;
    opacity: 0.72;
    font-weight: 500;
    letter-spacing: 0.3px;
    line-height: 1.5;
    position: relative;
    z-index: 1;
  }
`;

export const StatCardGraficos = styled.div`
  background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.07),
    0 12px 40px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 12%;
    right: 12%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(99, 179, 237, 0.5),
      transparent
    );
  }

  .grafico-header {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    i {
      font-size: 1.6rem;
      color: #60a5fa;
    }

    h5 {
      margin: 0;
      font-size: 1.15rem;
      font-weight: 700;
      color: #e2e8f0;
      letter-spacing: -0.3px;
    }
  }

  .grafico-container {
    flex: 1;
    min-height: 70vh;
    position: relative;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    padding: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.04);
  }

  .loading-container,
  .no-data-container,
  .error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 0.875rem;

    i {
      font-size: 2.5rem;
      opacity: 0.5;
    }
  }
`;
