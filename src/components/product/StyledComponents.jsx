import styled from "@emotion/styled";
import { Button, Accordion } from "react-bootstrap";

export const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  color: theme.colors.white,
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "all 0.3s",
}));

// Nuevos estilos para los filtros
export const FilterAccordion = styled(Accordion)`
  .accordion-item {
    border: none;
    margin-bottom: 1rem;
    border-radius: 12px !important;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .accordion-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  }

  .accordion-button {
    font-weight: 600;
    color: #2c3e50;
    padding: 1rem 1.5rem;
    &:not(.collapsed) {
      background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
      color: #2c3e50;
    }
    &:focus {
      box-shadow: none;
      border-color: rgba(0, 0, 0, 0.125);
    }
  }

  .accordion-body {
    background-color: white;
    padding: 1.5rem;
  }
`;

export const FilterCheckbox = styled.div`
  .form-check {
    padding-left: 2rem;
    margin-bottom: 0.75rem;

    .form-check-input {
      width: 1.2em;
      height: 1.2em;
      margin-top: 0.2em;
      border: 2px solid #dee2e6;
      cursor: pointer;
      transition: all 0.2s ease;

      &:checked {
        background-color: #007bff;
        border-color: #007bff;
      }

      &:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }
    }

    .form-check-label {
      font-size: 0.95rem;
      color: #495057;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: #007bff;
      }
    }
  }
`;

export const FilterContainer = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const FilterBadge = styled.span`
  position: absolute;
  top: -9px;
  right: -30px;
  background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
  color: #343a40;
  padding: 4px 8px;
  font-size: 0.7em;
  font-weight: 600;
  border-radius: 12px;
  line-height: 1;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
