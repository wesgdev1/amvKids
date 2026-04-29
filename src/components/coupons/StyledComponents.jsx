import styled from "@emotion/styled";
import { Button } from "react-bootstrap";

export const CouponsPageWrapper = styled.div`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageHeaderStyled = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 800;
    color: #390688;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-family: "Anton", sans-serif;
    letter-spacing: 0.5px;
  }

  p {
    color: #6c757d;
    font-size: 0.9rem;
    margin: 0;
  }
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const CouponStatCard = styled.div`
  background: ${({ $variant }) => {
    if ($variant === "active")
      return "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)";
    if ($variant === "inactive")
      return "linear-gradient(135deg, #4b5563 0%, #6b7280 100%)";
    return "linear-gradient(135deg, #390688 0%, #5e0fb8 100%)";
  }};
  color: white;
  padding: 1.25rem 1rem;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: -30%;
    right: -10%;
    width: 60%;
    height: 80%;
    background: radial-gradient(
      ellipse,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px);
  }

  .stat-value {
    font-size: 2.1rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.35rem;
    position: relative;
    z-index: 1;
  }

  .stat-label {
    font-size: 0.72rem;
    opacity: 0.85;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
  }
`;

export const CreateFormCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow:
    0 2px 8px rgba(57, 6, 136, 0.06),
    0 8px 24px rgba(57, 6, 136, 0.06);
  border: 1px solid rgba(57, 6, 136, 0.1);
  margin-bottom: 2rem;

  .form-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #390688;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(57, 6, 136, 0.08);
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;

  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #390688;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .count-badge {
    font-size: 0.78rem;
    color: #6c757d;
    background: #f3f4f6;
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    font-weight: 600;
    border: 1px solid #e5e7eb;
  }
`;

export const CouponsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.25rem;
`;

/* ─── Coupon card pieces ──────────────────────────────────── */

export const CouponOuter = styled.div`
  border: 2px dashed
    ${({ $active }) => ($active !== false ? "#390688" : "#cbd5e1")};
  border-radius: 14px;
  display: flex;
  align-items: stretch;
  position: relative;
  overflow: visible;
  transition: transform 0.22s ease, filter 0.22s ease;
  filter: drop-shadow(
    0 4px 10px
      rgba(57, 6, 136, ${({ $active }) => ($active !== false ? "0.12" : "0.04")})
  );

  &:hover {
    transform: translateY(-5px) rotate(-0.3deg);
    filter: drop-shadow(
      0 10px 22px
        rgba(
          57,
          6,
          136,
          ${({ $active }) => ($active !== false ? "0.22" : "0.08")}
        )
    );
  }
`;

export const CouponLeft = styled.div`
  background: ${({ $active }) =>
    $active !== false
      ? "linear-gradient(145deg, #390688 0%, #5a0ea3 60%, #6d28d9 100%)"
      : "linear-gradient(145deg, #4b5563 0%, #6b7280 100%)"};
  color: white;
  padding: 1.4rem 1.25rem;
  flex: 0 0 56%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.6rem;
  border-radius: 11px 0 0 11px;

  .coupon-tag {
    font-size: 0.62rem;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    opacity: 0.65;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .coupon-code {
    font-family: "Courier New", Courier, monospace;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 2px;
    background: rgba(255, 255, 255, 0.13);
    padding: 0.4rem 0.75rem;
    border-radius: 7px;
    border: 1px dashed rgba(255, 255, 255, 0.38);
    display: inline-block;
    width: fit-content;
    line-height: 1.3;
  }

  .coupon-date {
    font-size: 0.7rem;
    opacity: 0.6;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.1rem;
  }
`;

export const CouponSeparator = styled.div`
  width: 0;
  flex-shrink: 0;
  position: relative;
  align-self: stretch;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-left: 2px dashed
      ${({ $active }) =>
        $active !== false
          ? "rgba(57, 6, 136, 0.28)"
          : "rgba(100, 116, 139, 0.28)"};
    transform: translateX(-50%);
  }

  .notch {
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    border: 2px dashed
      ${({ $active }) =>
        $active !== false ? "#390688" : "#cbd5e1"};
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;

    &.top {
      top: -11px;
    }

    &.bottom {
      bottom: -11px;
    }
  }
`;

export const CouponRight = styled.div`
  flex: 1;
  background: white;
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  border-radius: 0 11px 11px 0;
`;

export const DiscountCircle = styled.div`
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: ${({ $active }) =>
    $active !== false
      ? "linear-gradient(135deg, #90ff69, #4ade80)"
      : "linear-gradient(135deg, #d1d5db, #9ca3af)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: ${({ $active }) =>
    $active !== false
      ? "0 4px 14px rgba(144, 255, 105, 0.45)"
      : "0 2px 8px rgba(0,0,0,0.08)"};

  .pct-value {
    font-size: 1.15rem;
    font-weight: 800;
    color: ${({ $active }) => ($active !== false ? "#1a0040" : "#374151")};
    line-height: 1;
    letter-spacing: -0.5px;
  }

  .pct-label {
    font-size: 0.52rem;
    font-weight: 700;
    color: ${({ $active }) => ($active !== false ? "#3b0764" : "#4b5563")};
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-top: 2px;
  }
`;

export const StatusBadgeStyled = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.22rem 0.6rem;
  border-radius: 99px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  background: ${({ $active }) => ($active !== false ? "#dcfce7" : "#f1f5f9")};
  color: ${({ $active }) => ($active !== false ? "#15803d" : "#64748b")};
  border: 1px solid
    ${({ $active }) => ($active !== false ? "#bbf7d0" : "#cbd5e1")};
`;

export const OrdersCount = styled.span`
  font-size: 0.7rem;
  color: #9ca3af;
  font-weight: 500;
`;

export const CreateCouponBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme?.colors?.buttonColor || "#90ff69",
  color: theme?.colors?.mainColor || "#390688",
  border: "none",
  fontWeight: 700,
  padding: "0.6rem 1.5rem",
  borderRadius: "8px",
  whiteSpace: "nowrap",
  "&:hover, &:focus": {
    backgroundColor: theme?.colors?.secondaryColor || "#73ccfd",
    color: "white",
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
}));

export const EmptyState = styled.div`
  text-align: center;
  padding: 3.5rem 1rem;
  color: #9ca3af;

  .empty-icon {
    font-size: 3.5rem;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 0.95rem;
    margin: 0;
  }
`;
