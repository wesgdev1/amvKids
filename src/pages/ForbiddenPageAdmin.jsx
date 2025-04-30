import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ForbiddenPageAdmin = () => {
  const navigate = useNavigate();

  return (
    <Container className=" pt-4 pb-2">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="text-center bg-white p-5 rounded shadow">
          <Image
            src="https://res.cloudinary.com/dppqkypts/image/upload/v1745960679/ChatGPT_Image_29_abr_2025_04_04_25_p.m._a6krjj.png"
            alt="Acceso Denegado"
            fluid // Hace la imagen responsive
            style={{ maxHeight: "200px", marginBottom: "2rem" }}
          />
          <h1 className="display-4 fw-bold text-danger mb-3">
            ¡Acceso Restringido!
          </h1>
          {/* <h2>Acceso Denegado</h2> */}
          <p className="lead mb-4 text-muted">
            Solo los administradores pueden ver esta página.
          </p>
          <p className="mb-4">
            Si crees que esto es un error, comunícate con Welinton Quiuw.
          </p>
          <Button
            variant="outline-primary"
            onClick={() => navigate("/")}
            className="me-2"
          >
            <i className="bi bi-house-door me-1"></i> Volver al Inicio
          </Button>
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-1"></i> Ir Atrás
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
