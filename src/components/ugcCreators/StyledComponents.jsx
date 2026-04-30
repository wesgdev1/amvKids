import styled from "@emotion/styled";
import { Button } from "react-bootstrap";

export const CreatorsPageWrapper = styled.div`
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

export const StatCard = styled.div`
  background: ${({ $variant }) => {
    if ($variant === "active")
      return "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)";
    if ($variant === "coupon")
      return "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)";
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

export const CreatorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
`;

export const CreatorCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.4rem;
  border: 1px solid rgba(57, 6, 136, 0.1);
  box-shadow: 0 2px 8px rgba(57, 6, 136, 0.06);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-height: 170px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(57, 6, 136, 0.14);
  }
`;

export const CreatorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #390688 0%, #6d28d9 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  font-weight: 800;
  font-family: "Anton", sans-serif;
  flex-shrink: 0;
`;

export const CreatorMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #6c757d;

  i {
    color: #390688;
    opacity: 0.65;
    font-size: 0.82rem;
  }
`;

export const CouponCountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  font-weight: 700;
  background: linear-gradient(135deg, #390688, #6d28d9);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
`;

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

export const CreateBtn = styled(Button)(({ theme }) => ({
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

/* ─── Detail page ─────────────────────────────────────────── */

export const DetailWrapper = styled.div`
  padding: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export const BackBtn = styled(Button)`
  font-size: 0.85rem;
  font-weight: 600;
  color: #390688 !important;
  background: transparent !important;
  border: 1px solid rgba(57, 6, 136, 0.25) !important;
  border-radius: 8px;
  padding: 0.4rem 1rem;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  &:hover {
    background: rgba(57, 6, 136, 0.06) !important;
    border-color: #390688 !important;
  }
`;

export const CreatorInfoBanner = styled.div`
  background: linear-gradient(135deg, #390688 0%, #6d28d9 100%);
  color: white;
  border-radius: 16px;
  padding: 1.75rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .creator-name {
    font-size: 1.5rem;
    font-weight: 800;
    font-family: "Anton", sans-serif;
    letter-spacing: 0.5px;
    margin-bottom: 0.3rem;
  }

  .creator-contact {
    font-size: 0.85rem;
    opacity: 0.82;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    span {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
  }
`;

export const BannerAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 800;
  font-family: "Anton", sans-serif;
  flex-shrink: 0;
`;
