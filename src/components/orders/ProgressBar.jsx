import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ProgressContainer = styled.div`
  width: 100%;
  padding: 1.5rem 0.5rem;
  @media (min-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ProgressTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #390688;
`;

const BarContainer = styled.div`
  height: 0.5rem;
  background-color: #f0f0f0;
  border-radius: 9999px;
  position: relative;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(90deg, #390688 0%, #73ccfd 100%);
  transition: width 0.7s ease;
  box-shadow: 0 0 8px rgba(115, 204, 253, 0.5);
`;

const StepsContainer = styled.ol`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 1rem;
  position: relative;
  padding: 0;
`;

const Step = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  &:before {
    content: "";
    display: block;
    width: ${(props) => (props.active ? "2rem" : "1.5rem")};
    height: ${(props) => (props.active ? "2rem" : "1.5rem")};
    border-radius: 50%;
    background-color: ${(props) => (props.active ? "#390688" : "#e0e0e0")};
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
    border: ${(props) => (props.active ? "2px solid #73ccfd" : "none")};
    box-shadow: ${(props) =>
      props.active ? "0 0 10px rgba(115, 204, 253, 0.5)" : "none"};

    @media (max-width: 576px) {
      width: ${(props) => (props.active ? "1.5rem" : "1rem")};
      height: ${(props) => (props.active ? "1.5rem" : "1rem")};
    }
  }

  &:after {
    content: "";
    position: absolute;
    top: 0.75rem;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: #e0e0e0;
    z-index: -1;

    @media (max-width: 576px) {
      top: 0.5rem;
    }
  }

  &:last-child:after {
    display: none;
  }
`;

const StepLabel = styled.span`
  font-size: 0.875rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? "#390688" : "#666")};
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;

const StepMobileLabel = styled.span`
  display: none;

  @media (max-width: 576px) {
    display: block;
    font-size: 0.65rem;
    font-weight: ${(props) => (props.active ? "600" : "400")};
    color: ${(props) => (props.active ? "#390688" : "#666")};
    margin-top: 0.25rem;
  }
`;

export const ProgressBar = ({ currentStep }) => {
  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, label: "Orden Creada", shortLabel: "Creada" },
    { id: 2, label: "Pago Realizado", shortLabel: "Pagada" },
    { id: 3, label: "Pago Confirmado", shortLabel: "Confirmada" },
    { id: 4, label: "Alistado", shortLabel: "Alistada" },
    { id: 5, label: "Entregado", shortLabel: "Entregada" },
  ];

  return (
    <ProgressContainer>
      <ProgressTitle>Estado de tu orden</ProgressTitle>

      <BarContainer>
        <ProgressFill style={{ width: `${progressPercentage}%` }} />
      </BarContainer>

      <StepsContainer>
        {steps.map((step) => (
          <Step key={step.id} active={currentStep >= step.id}>
            <StepLabel active={currentStep >= step.id}>{step.label}</StepLabel>
            <StepMobileLabel active={currentStep >= step.id}>
              {step.shortLabel}
            </StepMobileLabel>
          </Step>
        ))}
      </StepsContainer>
    </ProgressContainer>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
