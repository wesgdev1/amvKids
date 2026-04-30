import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useInfluencer } from "../../domain/influencers/useInfluencer";
import {
  DetailWrapper,
  BackBtn,
  CreatorInfoBanner,
  BannerAvatar,
  StatsRow,
  StatCard,
  CreateFormCard,
  SectionHeader,
  EmptyState,
  CreateBtn,
} from "./StyledComponents";
import {
  CouponsGrid,
  CouponOuter,
  CouponLeft,
  CouponSeparator,
  CouponRight,
  DiscountCircle,
  StatusBadgeStyled,
  OrdersCount,
} from "../coupons/StyledComponents";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const CouponCard = ({ coupon, onToggle, toggling }) => {
  const isActive = coupon.state !== false;
  const usesCount = coupon.orders?.length ?? 0;

  return (
    <CouponOuter $active={isActive}>
      <CouponLeft $active={isActive}>
        <span className="coupon-tag">✂ cupón de descuento</span>
        <div className="coupon-code">{coupon.code}</div>
        <span className="coupon-date">
          <i className="bi bi-calendar3" />
          {formatDate(coupon.createdAt)}
        </span>
      </CouponLeft>

      <CouponSeparator $active={isActive}>
        <div className="notch top" />
        <div className="notch bottom" />
      </CouponSeparator>

      <CouponRight>
        <DiscountCircle $active={isActive}>
          <span className="pct-value">-{coupon.discount}%</span>
          <span className="pct-label">off</span>
        </DiscountCircle>

        <StatusBadgeStyled $active={isActive}>
          {isActive ? "● activo" : "○ inactivo"}
        </StatusBadgeStyled>

        {usesCount > 0 && (
          <OrdersCount>
            {usesCount} uso{usesCount !== 1 ? "s" : ""}
          </OrdersCount>
        )}

        <Button
          size="sm"
          variant={isActive ? "outline-danger" : "outline-success"}
          disabled={toggling}
          onClick={() => onToggle(coupon.id, isActive)}
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            borderRadius: "6px",
            padding: "0.25rem 0.75rem",
            marginTop: "0.25rem",
          }}
        >
          {toggling ? (
            <Spinner size="sm" />
          ) : isActive ? (
            "Desactivar"
          ) : (
            "Activar"
          )}
        </Button>
      </CouponRight>
    </CouponOuter>
  );
};

CouponCard.propTypes = {
  coupon: PropTypes.shape({
    id: PropTypes.string.isRequired,
    state: PropTypes.bool,
    orders: PropTypes.array,
    code: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    discount: PropTypes.number.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  toggling: PropTypes.bool.isRequired,
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const InfluencerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { influencer, loading, error, addCoupon, toggleCouponState } =
    useInfluencer(id);

  const [formCode, setFormCode] = useState("");
  const [formDiscount, setFormDiscount] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [togglingId, setTogglingId] = useState(null);

  const coupons = influencer?.coupons ?? [];
  const activeCoupons = coupons.filter((c) => c.state !== false);
  const totalUses = coupons.reduce(
    (acc, c) => acc + (c.orders?.length ?? 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formCode.trim() || !formDiscount) return;
    setFormLoading(true);
    setFormError("");
    setFormSuccess("");
    try {
      await addCoupon({
        code: formCode.trim().toUpperCase(),
        discount: Number(formDiscount),
      });
      setFormSuccess(
        `Cupón "${formCode.trim().toUpperCase()}" asignado a ${influencer.name}.`
      );
      setFormCode("");
      setFormDiscount("");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al crear el cupón.";
      setFormError(msg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggle = async (couponId, currentState) => {
    setTogglingId(couponId);
    try {
      await toggleCouponState(couponId, currentState);
    } catch {
      // silently ignore — list stays unchanged
    } finally {
      setTogglingId(null);
    }
  };

  if (loading) {
    return (
      <DetailWrapper>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <Spinner style={{ color: "#390688" }} />
        </div>
      </DetailWrapper>
    );
  }

  if (error || !influencer) {
    return (
      <DetailWrapper>
        <BackBtn onClick={() => navigate("/profile/creators")}>
          <i className="bi bi-arrow-left" /> Volver
        </BackBtn>
        <Alert variant="danger">{error || "Creador no encontrado."}</Alert>
      </DetailWrapper>
    );
  }

  return (
    <DetailWrapper>
      <BackBtn onClick={() => navigate("/profile/creators")}>
        <i className="bi bi-arrow-left" /> Volver a creadores
      </BackBtn>

      <CreatorInfoBanner>
        <BannerAvatar>{getInitials(influencer.name)}</BannerAvatar>
        <div>
          <div className="creator-name">{influencer.name}</div>
          <div className="creator-contact">
            {influencer.email && (
              <span>
                <i className="bi bi-envelope" /> {influencer.email}
              </span>
            )}
            {influencer.celular && (
              <span>
                <i className="bi bi-telephone" /> {influencer.celular}
              </span>
            )}
          </div>
        </div>
      </CreatorInfoBanner>

      <StatsRow>
        <StatCard>
          <div className="stat-value">{coupons.length}</div>
          <div className="stat-label">Total cupones</div>
        </StatCard>
        <StatCard $variant="active">
          <div className="stat-value">{activeCoupons.length}</div>
          <div className="stat-label">Activos</div>
        </StatCard>
        <StatCard $variant="coupon">
          <div className="stat-value">{totalUses}</div>
          <div className="stat-label">Usos totales</div>
        </StatCard>
      </StatsRow>

      <CreateFormCard>
        <div className="form-title">
          <i className="bi bi-ticket-perforated-fill" />
          Asignar cupón a {influencer.name}
        </div>

        {formSuccess && (
          <Alert
            variant="success"
            onClose={() => setFormSuccess("")}
            dismissible
          >
            {formSuccess}
          </Alert>
        )}
        {formError && (
          <Alert
            variant="danger"
            onClose={() => setFormError("")}
            dismissible
          >
            {formError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr auto",
              gap: "1rem",
              alignItems: "end",
            }}
          >
            <Form.Group>
              <Form.Label
                style={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#4b5563",
                  marginBottom: "0.4rem",
                }}
              >
                Código del cupón
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: LAURA20"
                value={formCode}
                onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                required
                style={{ fontFamily: "Courier New, monospace", letterSpacing: "1px" }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                style={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#4b5563",
                  marginBottom: "0.4rem",
                }}
              >
                Descuento (%)
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 15"
                value={formDiscount}
                onChange={(e) => setFormDiscount(e.target.value)}
                min={1}
                max={100}
                required
              />
            </Form.Group>

            <CreateBtn type="submit" disabled={formLoading}>
              {formLoading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Asignando...
                </>
              ) : (
                "Asignar cupón"
              )}
            </CreateBtn>
          </div>
        </Form>
      </CreateFormCard>

      <SectionHeader>
        <h4>
          <i className="bi bi-ticket-perforated-fill" />
          Cupones de {influencer.name}
        </h4>
        {coupons.length > 0 && (
          <span className="count-badge">
            {coupons.length} cupón{coupons.length !== 1 ? "es" : ""}
          </span>
        )}
      </SectionHeader>

      {coupons.length === 0 && (
        <EmptyState>
          <div className="empty-icon">🎫</div>
          <p>Este creador aún no tiene cupones asignados.</p>
        </EmptyState>
      )}

      {coupons.length > 0 && (
        <CouponsGrid>
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onToggle={handleToggle}
              toggling={togglingId === coupon.id}
            />
          ))}
        </CouponsGrid>
      )}
    </DetailWrapper>
  );
};
