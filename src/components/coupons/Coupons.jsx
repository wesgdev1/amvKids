import { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useCoupons } from "../../domain/coupons/useCoupons";
import {
  CouponsPageWrapper,
  PageHeaderStyled,
  StatsRow,
  CouponStatCard,
  CreateFormCard,
  SectionHeader,
  CouponsGrid,
  CouponOuter,
  CouponLeft,
  CouponSeparator,
  CouponRight,
  DiscountCircle,
  StatusBadgeStyled,
  OrdersCount,
  CreateCouponBtn,
  EmptyState,
} from "./StyledComponents";

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
  const isInfluencer = coupon.influencerId != null;

  const handleVerInfluencer = () => {
    console.log("Ver influencer:", coupon.influencer ?? { id: coupon.influencerId });
  };

  return (
    <CouponOuter $active={isActive}>
      <CouponLeft $active={isActive}>
        <span className="coupon-tag">✂ cupón de descuento</span>
        <div className="coupon-code">{coupon.code}</div>
        <span className="coupon-date">
          <i className="bi bi-calendar3" />
          {formatDate(coupon.createdAt)}
        </span>

        {isInfluencer ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}>
            <span style={{
              fontSize: "0.65rem",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "99px",
              padding: "0.15rem 0.5rem",
              fontWeight: 600,
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}>
              <i className="bi bi-person-fill" />
              {coupon.influencer?.name ?? "Influencer"}
            </span>
            <Button
              size="sm"
              variant="link"
              onClick={handleVerInfluencer}
              style={{
                fontSize: "0.62rem",
                color: "#90ff69",
                padding: 0,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              ver →
            </Button>
          </div>
        ) : (
          <span style={{
            fontSize: "0.65rem",
            background: "rgba(144,255,105,0.18)",
            border: "1px solid rgba(144,255,105,0.4)",
            borderRadius: "99px",
            padding: "0.15rem 0.5rem",
            fontWeight: 700,
            letterSpacing: "0.5px",
            color: "#90ff69",
            marginTop: "0.2rem",
            display: "inline-block",
          }}>
            ★ AMV
          </span>
        )}
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
    influencerId: PropTypes.string,
    influencer: PropTypes.shape({ name: PropTypes.string }),
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  toggling: PropTypes.bool.isRequired,
};

export const Coupons = () => {
  const { coupons, loading, error, addCoupon, toggleCouponState } =
    useCoupons();

  const [formCode, setFormCode] = useState("");
  const [formDiscount, setFormDiscount] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [togglingId, setTogglingId] = useState(null);

  const activeCoupons = coupons.filter((c) => c.state !== false);
  const inactiveCoupons = coupons.filter((c) => c.state === false);

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
        `Cupón "${formCode.trim().toUpperCase()}" creado exitosamente.`
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

  const handleToggle = async (id, currentState) => {
    setTogglingId(id);
    try {
      await toggleCouponState(id, currentState);
    } catch {
      // silently ignore — the list will remain unchanged
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <CouponsPageWrapper>
      <PageHeaderStyled>
        <h2>🎫 Gestión de Cupones</h2>
        <p>Crea y administra cupones de descuento para tus clientes</p>
      </PageHeaderStyled>

      {/* Stats */}
      <StatsRow>
        <CouponStatCard>
          <div className="stat-value">{coupons.length}</div>
          <div className="stat-label">Total</div>
        </CouponStatCard>
        <CouponStatCard $variant="active">
          <div className="stat-value">{activeCoupons.length}</div>
          <div className="stat-label">Activos</div>
        </CouponStatCard>
        <CouponStatCard $variant="inactive">
          <div className="stat-value">{inactiveCoupons.length}</div>
          <div className="stat-label">Inactivos</div>
        </CouponStatCard>
      </StatsRow>

      {/* Create form */}
      <CreateFormCard>
        <div className="form-title">
          <i className="bi bi-plus-circle-fill" />
          Crear nuevo cupón
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
                placeholder="Ej: VERANO20"
                value={formCode}
                onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                required
                style={{
                  fontFamily: "Courier New, monospace",
                  letterSpacing: "1px",
                }}
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
                placeholder="Ej: 20"
                value={formDiscount}
                onChange={(e) => setFormDiscount(e.target.value)}
                min={1}
                max={100}
                required
              />
            </Form.Group>

            <CreateCouponBtn type="submit" disabled={formLoading}>
              {formLoading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Creando...
                </>
              ) : (
                "Crear cupón"
              )}
            </CreateCouponBtn>
          </div>
        </Form>
      </CreateFormCard>

      {/* Coupons list */}
      <SectionHeader>
        <h4>
          <i className="bi bi-ticket-perforated-fill" />
          Cupones actuales
        </h4>
        {coupons.length > 0 && (
          <span className="count-badge">
            {coupons.length} cupón{coupons.length !== 1 ? "es" : ""}
          </span>
        )}
      </SectionHeader>

      {loading && (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <Spinner style={{ color: "#390688" }} />
        </div>
      )}

      {error && !loading && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && coupons.length === 0 && (
        <EmptyState>
          <div className="empty-icon">🎫</div>
          <p>No hay cupones registrados todavía.</p>
        </EmptyState>
      )}

      {!loading && coupons.length > 0 && (
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
    </CouponsPageWrapper>
  );
};
