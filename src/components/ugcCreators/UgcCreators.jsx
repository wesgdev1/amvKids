import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useInfluencers } from "../../domain/influencers/useInfluencers";
import {
  CreatorsPageWrapper,
  PageHeaderStyled,
  StatsRow,
  StatCard,
  CreateFormCard,
  SectionHeader,
  CreatorsGrid,
  CreatorCard,
  CreatorAvatar,
  CreatorMeta,
  CouponCountBadge,
  EmptyState,
  CreateBtn,
} from "./StyledComponents";

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const InfluencerCard = ({ influencer, onClick }) => {
  const couponCount = influencer.coupons?.length ?? 0;

  return (
    <CreatorCard onClick={onClick}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <CreatorAvatar>{getInitials(influencer.name)}</CreatorAvatar>
        <div>
          <div style={{ fontWeight: 700, fontSize: "1rem", color: "#1f2937", marginBottom: "0.3rem" }}>
            {influencer.name}
          </div>
          <CouponCountBadge>
            <i className="bi bi-ticket-perforated" />
            {couponCount} cupón{couponCount !== 1 ? "es" : ""}
          </CouponCountBadge>
        </div>
      </div>

      {influencer.email && (
        <CreatorMeta>
          <i className="bi bi-envelope" />
          {influencer.email}
        </CreatorMeta>
      )}
      {influencer.celular && (
        <CreatorMeta>
          <i className="bi bi-telephone" />
          {influencer.celular}
        </CreatorMeta>
      )}

      <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
        <Button
          size="sm"
          style={{
            background: "linear-gradient(135deg, #390688, #6d28d9)",
            border: "none",
            fontWeight: 600,
            fontSize: "0.8rem",
            borderRadius: "8px",
            width: "100%",
          }}
        >
          Ver detalle →
        </Button>
      </div>
    </CreatorCard>
  );
};

InfluencerCard.propTypes = {
  influencer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    celular: PropTypes.string,
    coupons: PropTypes.array,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export const UgcCreators = () => {
  const { influencers, loading, error, addInfluencer } = useInfluencers();
  const navigate = useNavigate();

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCelular, setFormCelular] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const totalCoupons = influencers.reduce(
    (acc, inf) => acc + (inf.coupons?.length ?? 0),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formName.trim()) return;
    setFormLoading(true);
    setFormError("");
    setFormSuccess("");
    try {
      await addInfluencer({
        name: formName.trim(),
        email: formEmail.trim() || undefined,
        celular: formCelular.trim() || undefined,
      });
      setFormSuccess(`Creador "${formName.trim()}" registrado exitosamente.`);
      setFormName("");
      setFormEmail("");
      setFormCelular("");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al registrar el creador.";
      setFormError(msg);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <CreatorsPageWrapper>
      <PageHeaderStyled>
        <h2>🎬 Creadores UGC</h2>
        <p>Gestiona los creadores de contenido aliados con AMV Kids</p>
      </PageHeaderStyled>

      <StatsRow>
        <StatCard>
          <div className="stat-value">{influencers.length}</div>
          <div className="stat-label">Creadores</div>
        </StatCard>
        <StatCard $variant="coupon">
          <div className="stat-value">{totalCoupons}</div>
          <div className="stat-label">Cupones asignados</div>
        </StatCard>
      </StatsRow>

      <CreateFormCard>
        <div className="form-title">
          <i className="bi bi-person-plus-fill" />
          Registrar nuevo creador
        </div>

        {formSuccess && (
          <Alert variant="success" onClose={() => setFormSuccess("")} dismissible>
            {formSuccess}
          </Alert>
        )}
        {formError && (
          <Alert variant="danger" onClose={() => setFormError("")} dismissible>
            {formError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr auto",
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
                Nombre *
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Laura García"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
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
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="laura@ejemplo.com"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
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
                Celular
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="3001234567"
                value={formCelular}
                onChange={(e) => setFormCelular(e.target.value)}
              />
            </Form.Group>

            <CreateBtn type="submit" disabled={formLoading}>
              {formLoading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Guardando...
                </>
              ) : (
                "Registrar"
              )}
            </CreateBtn>
          </div>
        </Form>
      </CreateFormCard>

      <SectionHeader>
        <h4>
          <i className="bi bi-people-fill" />
          Creadores aliados
        </h4>
        {influencers.length > 0 && (
          <span className="count-badge">
            {influencers.length} creador{influencers.length !== 1 ? "es" : ""}
          </span>
        )}
      </SectionHeader>

      {loading && (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <Spinner style={{ color: "#390688" }} />
        </div>
      )}

      {error && !loading && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && influencers.length === 0 && (
        <EmptyState>
          <div className="empty-icon">🎬</div>
          <p>No hay creadores UGC registrados todavía.</p>
        </EmptyState>
      )}

      {!loading && influencers.length > 0 && (
        <CreatorsGrid>
          {influencers.map((inf) => (
            <InfluencerCard
              key={inf.id}
              influencer={inf}
              onClick={() => navigate(`/profile/creators/${inf.id}`)}
            />
          ))}
        </CreatorsGrid>
      )}
    </CreatorsPageWrapper>
  );
};
