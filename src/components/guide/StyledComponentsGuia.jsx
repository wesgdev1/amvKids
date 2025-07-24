import styled from "@emotion/styled";
export const SizeGuideContainer = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 16px;
  padding: 2.5rem;
  margin: 3rem auto;
  max-width: 1000px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(226, 232, 240, 0.8);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 15% 25%,
        rgba(148, 163, 184, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 85% 75%,
        rgba(71, 85, 105, 0.02) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

export const SizeGuideTitle = styled.h4`
  color: #1e293b;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 1.75rem;
  letter-spacing: -0.025em;
  position: relative;
  z-index: 1;

  i {
    margin-right: 0.75rem;
    color: #64748b;
    font-size: 1.5rem;
  }
`;

export const SizeTable = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  position: relative;
  z-index: 1;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: linear-gradient(135deg, #475569 0%, #334155 100%);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
  letter-spacing: 0.025em;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }

  div {
    padding: 1rem 0.75rem;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    @media (max-width: 768px) {
      padding: 0.875rem 0.5rem;
      gap: 0.25rem;
    }

    @media (max-width: 480px) {
      padding: 0.75rem 0.25rem;
      flex-direction: column;
      gap: 0.125rem;
    }

    &:last-child {
      border-right: none;
    }

    i {
      color: #cbd5e1;
      font-size: 0.875rem;

      @media (max-width: 768px) {
        font-size: 0.75rem;
      }

      @media (max-width: 480px) {
        font-size: 0.7rem;
      }
    }
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    box-shadow: inset 0 0 0 1px #e2e8f0;
  }

  &:last-child {
    border-bottom: none;
  }

  div {
    padding: 0.875rem 0.75rem;
    text-align: center;
    font-weight: 500;
    color: #475569;
    border-right: 1px solid #f1f5f9;
    font-size: 0.875rem;

    @media (max-width: 768px) {
      padding: 0.75rem 0.5rem;
      font-size: 0.8rem;
    }

    @media (max-width: 480px) {
      padding: 0.625rem 0.25rem;
      font-size: 0.75rem;
    }

    &:last-child {
      border-right: none;
    }

    &:first-of-type {
      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
      font-weight: 700;
      color: #1e293b;
      border-right: 1px solid #d1d5db;
    }
  }
`;

export const CategorySection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CategoryTitle = styled.div`
  background: #f8fafc;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;

  i {
    margin-right: 0.5rem;
    color: #6b7280;
  }
`;

export const SizeNote = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 4px solid #64748b;
  position: relative;
  z-index: 1;

  p {
    margin: 0;
    color: #475569;
    font-size: 0.875rem;
    line-height: 1.6;

    strong {
      color: #1e293b;
    }

    i {
      color: #64748b;
      margin-right: 0.5rem;
    }
  }
`;
