import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Alert, Badge, Table, Button } from "react-bootstrap";
import styled from "@emotion/styled";
import { getCouponById } from "../../api/orders/orders";

/* ── Helpers ─────────────────────────────────────────────────── */

const formatCOP = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value || 0);

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateShort = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const STATE_BADGE = {
  "Pedido Entregado": "success",
  "Pago Confirmado": "primary",
  "Pago Enviado": "info",
  Alistada: "warning",
  Creada: "secondary",
  CanceladaAdmin: "danger",
};

/* ── Styled ──────────────────────────────────────────────────── */

const PageWrapper = styled.div`
  padding: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const BackBtn = styled(Button)`
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

const CouponBanner = styled.div`
  background: linear-gradient(135deg, #390688 0%, #5a0ea3 60%, #6d28d9 100%);
  border-radius: 18px;
  padding: 2rem 2.25rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: -40%;
    right: -5%;
    width: 40%;
    height: 180%;
    background: radial-gradient(
      ellipse,
      rgba(255, 255, 255, 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const DiscountCircleLg = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #90ff69, #4ade80);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 6px 20px rgba(144, 255, 105, 0.5);

  .pct {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1a0040;
    line-height: 1;
    letter-spacing: -0.5px;
  }

  .off {
    font-size: 0.55rem;
    font-weight: 700;
    color: #3b0764;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 2px;
  }
`;

const BannerInfo = styled.div`
  flex: 1;

  .coupon-code {
    font-family: "Courier New", monospace;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 3px;
    background: rgba(255, 255, 255, 0.14);
    padding: 0.35rem 1rem;
    border-radius: 10px;
    border: 1px dashed rgba(255, 255, 255, 0.35);
    display: inline-block;
    margin-bottom: 0.6rem;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
    font-size: 0.82rem;
    opacity: 0.82;

    span {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
  }
`;

const StatusPill = styled.div`
  align-self: flex-start;
  background: ${({ $active }) =>
    $active ? "rgba(144,255,105,0.2)" : "rgba(255,255,255,0.12)"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(144,255,105,0.5)" : "rgba(255,255,255,0.25)"};
  color: ${({ $active }) => ($active ? "#90ff69" : "rgba(255,255,255,0.6)")};
  border-radius: 99px;
  padding: 0.3rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${({ $variant }) => {
    if ($variant === "revenue")
      return "linear-gradient(135deg, #16a34a, #22c55e)";
    if ($variant === "discount")
      return "linear-gradient(135deg, #dc2626, #ef4444)";
    if ($variant === "gross")
      return "linear-gradient(135deg, #d97706, #f59e0b)";
    return "linear-gradient(135deg, #390688, #6d28d9)";
  }};
  color: white;
  padding: 1.5rem 1.25rem;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    top: -30%;
    right: -10%;
    width: 60%;
    height: 80%;
    background: radial-gradient(
      ellipse,
      rgba(255, 255, 255, 0.12) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px);
  }

  .sc-icon {
    font-size: 1.5rem;
    opacity: 0.7;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;
  }

  .sc-value {
    font-size: 1.65rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.3rem;
    position: relative;
    z-index: 1;
    letter-spacing: -0.5px;
  }

  .sc-label {
    font-size: 0.72rem;
    opacity: 0.82;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
  }

  .sc-sub {
    font-size: 0.68rem;
    opacity: 0.65;
    margin-top: 0.2rem;
    position: relative;
    z-index: 1;
  }
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow:
    0 2px 8px rgba(57, 6, 136, 0.06),
    0 8px 24px rgba(57, 6, 136, 0.04);
  border: 1px solid rgba(57, 6, 136, 0.08);

  .section-title {
    font-size: 1rem;
    font-weight: 700;
    color: #390688;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(57, 6, 136, 0.08);
  }
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #9ca3af;

  .icon {
    font-size: 3rem;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 0.92rem;
    margin: 0;
  }
`;

/* ── Component ───────────────────────────────────────────────── */

export const CouponDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    setCoupon(null);
    getCouponById(id)
      .then((res) => setCoupon(res.data))
      .catch(() => setError("No se pudo cargar el detalle del cupón."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PageWrapper>
        <div style={{ textAlign: "center", padding: "5rem" }}>
          <Spinner style={{ color: "#390688" }} />
        </div>
      </PageWrapper>
    );
  }

  if (error || (!loading && !coupon)) {
    return (
      <PageWrapper>
        <BackBtn onClick={() => navigate("/profile/coupons")}>
          <i className="bi bi-arrow-left" /> Volver
        </BackBtn>
        <Alert variant="danger">{error || "Cupón no encontrado."}</Alert>
      </PageWrapper>
    );
  }

  if (!coupon) return null;

  const orders = coupon.orders ?? [];
  const isActive = coupon.state !== false;
  const totalOrders = orders.length;
  const totalFacturado = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalDescuento = orders.reduce(
    (acc, o) => acc + (o.discountCoupon || 0),
    0
  );
  const ventasBrutas = totalFacturado + totalDescuento;
  const costoPromedio =
    totalOrders > 0 ? Math.round(totalDescuento / totalOrders) : 0;

  return (
    <PageWrapper>
      <BackBtn onClick={() => navigate("/profile/coupons")}>
        <i className="bi bi-arrow-left" /> Volver a cupones
      </BackBtn>

      {/* ── Banner ── */}
      <CouponBanner>
        <DiscountCircleLg>
          <span className="pct">-{coupon.discount}%</span>
          <span className="off">off</span>
        </DiscountCircleLg>

        <BannerInfo>
          <div className="coupon-code">{coupon.code}</div>
          <div className="meta-row">
            {coupon.influencer && (
              <span>
                <i className="bi bi-person-fill" />
                {coupon.influencer.name}
              </span>
            )}
            <span>
              <i className="bi bi-calendar3" />
              Creado el {formatDate(coupon.createdAt)}
            </span>
            <span>
              <i className="bi bi-bar-chart-line" />
              {totalOrders} uso{totalOrders !== 1 ? "s" : ""}
            </span>
          </div>
        </BannerInfo>

        <StatusPill $active={isActive}>
          {isActive ? "● Activo" : "○ Inactivo"}
        </StatusPill>
      </CouponBanner>

      {/* ── Stats ── */}
      <StatsGrid>
        <StatCard>
          <div className="sc-icon">📦</div>
          <div className="sc-value">{totalOrders}</div>
          <div className="sc-label">Órdenes con cupón</div>
          <div className="sc-sub">Total de compras que usaron el código</div>
        </StatCard>

        <StatCard $variant="gross">
          <div className="sc-icon">💰</div>
          <div className="sc-value" style={{ fontSize: "1.25rem" }}>
            {formatCOP(ventasBrutas)}
          </div>
          <div className="sc-label">Ventas brutas</div>
          <div className="sc-sub">Sin aplicar el descuento</div>
        </StatCard>

        <StatCard $variant="discount">
          <div className="sc-icon">🏷️</div>
          <div className="sc-value" style={{ fontSize: "1.25rem" }}>
            {formatCOP(totalDescuento)}
          </div>
          <div className="sc-label">Descuento total dado</div>
          <div className="sc-sub">
            ~{formatCOP(costoPromedio)} por orden en promedio
          </div>
        </StatCard>

        <StatCard $variant="revenue">
          <div className="sc-icon">✅</div>
          <div className="sc-value" style={{ fontSize: "1.25rem" }}>
            {formatCOP(totalFacturado)}
          </div>
          <div className="sc-label">Neto cobrado</div>
          <div className="sc-sub">Lo que realmente ingresó a caja</div>
        </StatCard>
      </StatsGrid>

      {/* ── Orders table ── */}
      <SectionCard>
        <div className="section-title">
          <i className="bi bi-list-ul" />
          Órdenes con este cupón
          {totalOrders > 0 && (
            <span
              style={{
                marginLeft: "auto",
                fontSize: "0.75rem",
                color: "#6c757d",
                background: "#f3f4f6",
                padding: "0.2rem 0.65rem",
                borderRadius: "99px",
                fontWeight: 600,
                border: "1px solid #e5e7eb",
              }}
            >
              {totalOrders} orden{totalOrders !== 1 ? "es" : ""}
            </span>
          )}
        </div>

        {orders.length === 0 ? (
          <EmptyOrders>
            <div className="icon">📦</div>
            <p>Ninguna orden ha usado este cupón todavía.</p>
          </EmptyOrders>
        ) : (
          <Table responsive hover style={{ fontSize: "0.84rem", marginBottom: 0 }}>
            <thead>
              <tr style={{ background: "rgba(57,6,136,0.04)" }}>
                <th style={{ fontWeight: 700, color: "#390688", paddingLeft: "1rem" }}>
                  # Orden
                </th>
                <th style={{ fontWeight: 700, color: "#390688" }}>Fecha</th>
                <th style={{ fontWeight: 700, color: "#390688" }}>Estado</th>
                <th style={{ fontWeight: 700, color: "#390688" }}>Cliente</th>
                <th
                  className="text-end"
                  style={{ fontWeight: 700, color: "#390688" }}
                >
                  Bruto
                </th>
                <th
                  className="text-end"
                  style={{ fontWeight: 700, color: "#390688" }}
                >
                  Descuento
                </th>
                <th
                  className="text-end"
                  style={{ fontWeight: 700, color: "#390688", paddingRight: "1rem" }}
                >
                  Neto cobrado
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td
                    style={{
                      fontWeight: 700,
                      color: "#390688",
                      paddingLeft: "1rem",
                    }}
                  >
                    #{order.codigoOrder ?? "—"}
                  </td>
                  <td style={{ color: "#6c757d" }}>
                    {formatDateShort(order.createdAt)}
                  </td>
                  <td>
                    <Badge
                      bg={STATE_BADGE[order.state] ?? "secondary"}
                      style={{ fontSize: "0.68rem" }}
                    >
                      {order.state ?? "—"}
                    </Badge>
                  </td>
                  <td style={{ color: "#374151" }}>
                    {order.user?.name ??
                      order.user?.email ??
                      order.telefonoContacto ??
                      "—"}
                  </td>
                  <td className="text-end" style={{ color: "#6c757d" }}>
                    {formatCOP(
                      (order.total || 0) + (order.discountCoupon || 0)
                    )}
                  </td>
                  <td
                    className="text-end"
                    style={{ color: "#dc2626", fontWeight: 600 }}
                  >
                    -{formatCOP(order.discountCoupon || 0)}
                  </td>
                  <td
                    className="text-end"
                    style={{
                      fontWeight: 700,
                      color: "#16a34a",
                      paddingRight: "1rem",
                    }}
                  >
                    {formatCOP(order.total || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr
                style={{
                  borderTop: "2px solid rgba(57,6,136,0.12)",
                  background: "rgba(57,6,136,0.03)",
                }}
              >
                <td
                  colSpan={4}
                  style={{
                    fontWeight: 700,
                    color: "#390688",
                    paddingLeft: "1rem",
                    paddingTop: "0.75rem",
                    paddingBottom: "0.75rem",
                  }}
                >
                  Totales
                </td>
                <td
                  className="text-end"
                  style={{ fontWeight: 700, color: "#6c757d" }}
                >
                  {formatCOP(ventasBrutas)}
                </td>
                <td
                  className="text-end"
                  style={{ fontWeight: 700, color: "#dc2626" }}
                >
                  -{formatCOP(totalDescuento)}
                </td>
                <td
                  className="text-end"
                  style={{
                    fontWeight: 700,
                    color: "#16a34a",
                    paddingRight: "1rem",
                  }}
                >
                  {formatCOP(totalFacturado)}
                </td>
              </tr>
            </tfoot>
          </Table>
        )}
      </SectionCard>
    </PageWrapper>
  );
};
