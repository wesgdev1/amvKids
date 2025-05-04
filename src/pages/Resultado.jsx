import { useLocation, Link } from "react-router-dom";
import { useOrder } from "../domain/orders/useOrder";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";

export const Resultado = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const boldTxStatus = searchParams.get("bold-tx-status");

  const { data, loading, error } = useOrder(orderId);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Cargando resultado de la orden...</p>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="danger">
          <Alert.Heading>Error al cargar la orden</Alert.Heading>
          <p>
            {error.message || "No se pudo obtener la información de la orden."}
          </p>
        </Alert>
      );
    }

    if (!data) {
      return (
        <Alert variant="warning">
          <Alert.Heading>Orden no encontrada</Alert.Heading>
          <p>No se encontró una orden con el ID proporcionado.</p>
        </Alert>
      );
    }

    if (data.pagoBold === true) {
      return (
        <Card className="text-center shadow-sm border-success">
          <Card.Body>
            <i className="bi bi-check-circle-fill text-success display-3 mb-3"></i>
            <Card.Title as="h2">¡Pago Exitoso!</Card.Title>
            <Card.Text className="mb-4">
              Gracias por tu compra. Tu pago para la orden{" "}
              <strong>#{data.codigoOrder}</strong> fue confirmado correctamente.
            </Card.Text>
            <Button
              as={Link}
              to={`/profile/myorders/${orderId}`}
              variant="success"
            >
              Ver Detalles de mi Orden
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            ID Transacción Bold: {searchParams.get("bold-order-id") || "N/A"}
          </Card.Footer>
        </Card>
      );
    } else {
      let title = "Estado del Pago Pendiente";
      let message =
        "Tu pago está siendo procesado o no se completó. Puedes verificar el estado actual de tu orden.";
      let iconClass = "bi bi-hourglass text-warning display-3 mb-3";
      let variant = "warning";

      if (boldTxStatus === "rejected") {
        title = "Pago Rechazado";
        message = `El pago para tu orden <strong>#${data.codigoOrder}</strong> fue rechazado. Por favor, intenta con otro método o contacta a soporte.`;
        iconClass = "bi bi-x-octagon-fill text-danger display-3 mb-3";
        variant = "danger";
      } else if (boldTxStatus === "pending") {
        title = "Pago Pendiente";
        message = `El pago para tu orden <strong>#${data.codigoOrder}</strong> aún está pendiente de confirmación por parte del proveedor.`;
      } else if (boldTxStatus === "approved") {
        title = "Pago Aprobado - Actualizando Orden";
        message = `Bold aprobó el pago para la orden <strong>#${data.codigoOrder}</strong>. Estamos actualizando el estado en nuestro sistema, por favor revisa en unos momentos.`;
        iconClass = "bi bi-check-circle-fill text-success display-3 mb-3";
        variant = "info";
      }

      return (
        <Card className={`text-center shadow-sm border-${variant}`}>
          <Card.Body>
            <i className={iconClass}></i>
            <Card.Title as="h2">{title}</Card.Title>
            <Card.Text
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: message }}
            />
            <Button
              as={Link}
              to={`/profile/myorders/${orderId}`}
              variant={`outline-${variant}`}
            >
              Ver Estado de mi Orden
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            ID Transacción Bold: {searchParams.get("bold-order-id") || "N/A"}
          </Card.Footer>
        </Card>
      );
    }
  };

  if (!orderId) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>No se proporcionó un ID de orden en la URL.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      className="py-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>{renderContent()}</div>
    </Container>
  );
};
