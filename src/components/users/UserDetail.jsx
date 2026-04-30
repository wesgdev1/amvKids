import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Badge, Button, Form, Spinner, Image } from "react-bootstrap";
import styled from "@emotion/styled";
import { getUserById, editUser, editPasswordAdmin } from "../../api/users/users";

/* ── Constants ───────────────────────────────────────────────── */

const TIPO_OPTIONS = ["Reventa", "Cliente", "Tienda Aliada"];

const TIPO_ICONS = {
  Admin: "bi-person-check-fill",
  Reventa: "bi-person-badge-fill",
  Cliente: "bi-person-fill",
  "Tienda Aliada": "bi-shop",
  Whatsapp: "bi-whatsapp",
};

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
  "linear-gradient(135deg, #0fd850 0%, #f9f047 100%)",
];

const getGradient = (name = "") =>
  AVATAR_GRADIENTS[name.charCodeAt(0) % AVATAR_GRADIENTS.length];

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/* ── Styled ──────────────────────────────────────────────────── */

const PageWrapper = styled.div`
  padding: 1.5rem;
  max-width: 900px;
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

const UserBanner = styled.div`
  background: linear-gradient(135deg, #390688 0%, #5a0ea3 60%, #6d28d9 100%);
  border-radius: 18px;
  padding: 2rem 2.25rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  flex-wrap: wrap;

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

const AvatarLg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $gradient }) => $gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
  border: 3px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const BannerInfo = styled.div`
  flex: 1;
  min-width: 0;

  .user-name {
    font-size: 1.5rem;
    font-weight: 800;
    font-family: "Anton", sans-serif;
    letter-spacing: 0.5px;
    margin-bottom: 0.45rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 1.1rem;
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

const StatePill = styled.div`
  align-self: flex-start;
  background: ${({ $active }) =>
    $active ? "rgba(144,255,105,0.2)" : "rgba(255,80,80,0.2)"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(144,255,105,0.5)" : "rgba(255,80,80,0.45)"};
  color: ${({ $active }) => ($active ? "#90ff69" : "#ff9999")};
  border-radius: 99px;
  padding: 0.3rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
  position: relative;
  z-index: 1;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.85rem;
  margin-bottom: 2rem;
`;

const InfoChip = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem 1.1rem;
  border: 1px solid rgba(57, 6, 136, 0.1);
  box-shadow: 0 2px 8px rgba(57, 6, 136, 0.04);

  .ic-label {
    font-size: 0.65rem;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 0.4rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .ic-value {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1f2937;
  }

  .ic-value-sm {
    font-size: 0.85rem;
    font-weight: 600;
    color: #374151;
  }
`;

const EditCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow:
    0 2px 8px rgba(57, 6, 136, 0.06),
    0 8px 24px rgba(57, 6, 136, 0.04);
  border: 1px solid rgba(57, 6, 136, 0.1);

  .card-title {
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

const SaveBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme?.colors?.buttonColor || "#90ff69",
  color: theme?.colors?.mainColor || "#390688",
  border: "none",
  fontWeight: 700,
  padding: "0.6rem 1.75rem",
  borderRadius: "8px",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  "&:hover, &:focus": {
    backgroundColor: theme?.colors?.secondaryColor || "#73ccfd",
    color: "white",
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
}));

const ResetCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow:
    0 2px 8px rgba(220, 38, 38, 0.06),
    0 8px 24px rgba(220, 38, 38, 0.04);
  border: 1px solid rgba(220, 38, 38, 0.2);
  margin-top: 1.5rem;

  .card-title {
    font-size: 1rem;
    font-weight: 700;
    color: #dc2626;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(220, 38, 38, 0.1);
  }
`;

const PasswordPreview = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #fef2f2;
  border: 1px dashed rgba(220, 38, 38, 0.4);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-family: "Courier New", monospace;
  font-size: 0.95rem;
  font-weight: 700;
  color: #dc2626;
  letter-spacing: 1px;
`;

const ResetBtn = styled(Button)`
  background: linear-gradient(135deg, #dc2626, #ef4444) !important;
  border: none !important;
  font-weight: 700;
  padding: 0.6rem 1.75rem;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  &:hover,
  &:focus {
    background: linear-gradient(135deg, #b91c1c, #dc2626) !important;
    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.35) !important;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const RESET_PASSWORD = "Amv-kids-2026*";

/* ── Component ───────────────────────────────────────────────── */

export const UserDetail = () => {
  const { idUser } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCelular, setFormCelular] = useState("");
  const [formTipo, setFormTipo] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  const loadUser = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getUserById(idUser);
      const u = res.data;
      setUser(u);
      setFormName(u.name ?? "");
      setFormEmail(u.email ?? "");
      setFormCelular(u.celular ?? "");
      setFormTipo(u.tipoUsuario ?? "");
    } catch {
      setError("No se pudo cargar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idUser) loadUser();
  }, [idUser]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    setSaveSuccess("");
    try {
      await editUser(idUser, {
        name: formName.trim(),
        email: formEmail.trim(),
        celular: formCelular.trim() || null,
        tipoUsuario: formTipo,
      });
      setSaveSuccess("Usuario actualizado correctamente.");
      await loadUser();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al guardar los cambios.";
      setSaveError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async () => {
    setResetting(true);
    setResetError("");
    setResetSuccess("");
    try {
      await editPasswordAdmin(idUser, { newPassword: RESET_PASSWORD });
      setResetSuccess("Contraseña restablecida correctamente.");
      setResetConfirm(false);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Error al restablecer la contraseña.";
      setResetError(msg);
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div style={{ textAlign: "center", padding: "5rem" }}>
          <Spinner style={{ color: "#390688" }} />
        </div>
      </PageWrapper>
    );
  }

  if (error || (!loading && !user)) {
    return (
      <PageWrapper>
        <BackBtn onClick={() => navigate("/profile/users")}>
          <i className="bi bi-arrow-left" /> Volver
        </BackBtn>
        <Alert variant="danger">{error || "Usuario no encontrado."}</Alert>
      </PageWrapper>
    );
  }

  if (!user) return null;

  return (
    <PageWrapper>
      <BackBtn onClick={() => navigate("/profile/users")}>
        <i className="bi bi-arrow-left" /> Volver a usuarios
      </BackBtn>

      {/* ── Banner ── */}
      <UserBanner>
        <AvatarLg $gradient={getGradient(user.name)}>
          {user.urlFoto ? (
            <Image
              src={user.urlFoto}
              alt={user.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            user.name?.charAt(0).toUpperCase() ?? "?"
          )}
        </AvatarLg>

        <BannerInfo>
          <div className="user-name">{user.name}</div>
          <div className="meta-row">
            <span>
              <i
                className={`bi ${TIPO_ICONS[user.tipoUsuario] ?? "bi-person"}`}
              />
              {user.tipoUsuario ?? "Sin tipo"}
            </span>
            <span>
              <i className="bi bi-envelope" />
              {user.email}
            </span>
            {user.celular && (
              <span>
                <i className="bi bi-telephone" />
                {user.celular}
              </span>
            )}
            <span>
              <i className="bi bi-calendar3" />
              Desde {formatDate(user.createdAt)}
            </span>
          </div>
        </BannerInfo>

        <StatePill $active={user.state}>
          {user.state ? "● Activo" : "● Bloqueado"}
        </StatePill>
      </UserBanner>

      {/* ── Info chips ── */}
      <InfoGrid>
        <InfoChip>
          <div className="ic-label">
            <i className="bi bi-hash" /> Código
          </div>
          <div className="ic-value">#{user.codigo ?? "—"}</div>
        </InfoChip>

        <InfoChip>
          <div className="ic-label">
            <i className="bi bi-person-badge" /> Tipo
          </div>
          <div
            className="ic-value-sm"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <i
              className={`bi ${TIPO_ICONS[user.tipoUsuario] ?? "bi-person"}`}
              style={{ color: "#390688" }}
            />
            {user.tipoUsuario ?? "—"}
          </div>
        </InfoChip>

        <InfoChip>
          <div className="ic-label">
            <i className="bi bi-exclamation-triangle" /> Multas
          </div>
          <div
            className="ic-value"
            style={{ color: user.numeroMultas > 0 ? "#dc2626" : "#16a34a" }}
          >
            {user.numeroMultas ?? 0}
          </div>
        </InfoChip>

        <InfoChip>
          <div className="ic-label">
            <i className="bi bi-shield-check" /> Estado
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Badge
              bg={user.state ? "success" : "danger"}
              style={{ fontSize: "0.75rem" }}
            >
              {user.state ? "Activo" : "Bloqueado"}
            </Badge>
          </div>
        </InfoChip>

        <InfoChip>
          <div className="ic-label">
            <i className="bi bi-calendar-event" /> Registro
          </div>
          <div className="ic-value-sm">{formatDate(user.createdAt)}</div>
        </InfoChip>
      </InfoGrid>

      {/* ── Edit form ── */}
      <EditCard>
        <div className="card-title">
          <i className="bi bi-pencil-square" />
          Editar información
        </div>

        {saveSuccess && (
          <Alert
            variant="success"
            onClose={() => setSaveSuccess("")}
            dismissible
          >
            {saveSuccess}
          </Alert>
        )}
        {saveError && (
          <Alert
            variant="danger"
            onClose={() => setSaveError("")}
            dismissible
          >
            {saveError}
          </Alert>
        )}

        <Form onSubmit={handleSave}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1.25rem",
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
                Nombre
              </Form.Label>
              <Form.Control
                type="text"
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
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
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
                Teléfono
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="3001234567"
                value={formCelular}
                onChange={(e) => setFormCelular(e.target.value)}
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
                Tipo de usuario
              </Form.Label>
              <Form.Select
                value={formTipo}
                onChange={(e) => setFormTipo(e.target.value)}
                required
              >
                <option value="">Seleccionar tipo...</option>
                {TIPO_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <SaveBtn type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Spinner size="sm" />
                  Guardando...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg" />
                  Guardar cambios
                </>
              )}
            </SaveBtn>
          </div>
        </Form>
      </EditCard>
      {/* ── Reset password ── */}
      <ResetCard>
        <div className="card-title">
          <i className="bi bi-shield-lock-fill" />
          Restablecer contraseña
        </div>

        <p style={{ fontSize: "0.88rem", color: "#6c757d", marginBottom: "1rem" }}>
          Esto reemplazará la contraseña actual del usuario por la contraseña
          estándar de reseteo. El usuario deberá cambiarla al iniciar sesión.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.82rem", color: "#6c757d", fontWeight: 600 }}>
            Nueva contraseña:
          </span>
          <PasswordPreview>
            <i className="bi bi-lock-fill" />
            {RESET_PASSWORD}
          </PasswordPreview>
        </div>

        {resetSuccess && (
          <Alert variant="success" onClose={() => setResetSuccess("")} dismissible>
            {resetSuccess}
          </Alert>
        )}
        {resetError && (
          <Alert variant="danger" onClose={() => setResetError("")} dismissible>
            {resetError}
          </Alert>
        )}

        {!resetConfirm ? (
          <ResetBtn onClick={() => setResetConfirm(true)}>
            <i className="bi bi-arrow-counterclockwise" />
            Resetear contraseña
          </ResetBtn>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#dc2626" }}>
              ¿Confirmas el reseteo de contraseña para {user.name}?
            </span>
            <ResetBtn onClick={handleResetPassword} disabled={resetting}>
              {resetting ? (
                <><Spinner size="sm" /> Procesando...</>
              ) : (
                <><i className="bi bi-check-lg" /> Sí, resetear</>
              )}
            </ResetBtn>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setResetConfirm(false)}
              disabled={resetting}
              style={{ borderRadius: "8px", fontWeight: 600 }}
            >
              Cancelar
            </Button>
          </div>
        )}
      </ResetCard>
    </PageWrapper>
  );
};
