import { Row, Col } from "react-bootstrap";
import {
  ContactContainer,
  ContactCard,
  ContactTitle,
  ContactInfo,
  ContactItem,
  WhatsAppButton,
} from "../components/contact/StyledComponents";

export const Contact = () => {
  const whatsappNumber = "573123456789"; // Reemplaza con tu número de WhatsApp
  const whatsappMessage =
    "Hola, me gustaría obtener más información sobre sus productos.";

  return (
    <ContactContainer fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <ContactCard>
            <ContactTitle>Contáctanos</ContactTitle>
            <ContactInfo>
              <ContactItem>
                <i className="bi bi-geo-alt-fill"></i>
                <span>Calle Principal #123, Ciudad</span>
              </ContactItem>
              <ContactItem>
                <i className="bi bi-telephone-fill"></i>
                <a href="tel:+573123456789">+57 312 345 6789</a>
              </ContactItem>
              <ContactItem>
                <i className="bi bi-envelope-fill"></i>
                <a href="mailto:contacto@amvkids.com">contacto@amvkids.com</a>
              </ContactItem>
              <ContactItem>
                <i className="bi bi-clock-fill"></i>
                <span>Lunes a Viernes: 9:00 AM - 6:00 PM</span>
              </ContactItem>
              <ContactItem>
                <i className="bi bi-instagram"></i>
                <a
                  href="https://instagram.com/amvkids"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @amvkids
                </a>
              </ContactItem>
              <ContactItem>
                <i className="bi bi-facebook"></i>
                <a
                  href="https://facebook.com/amvkids"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AMV Kids
                </a>
              </ContactItem>
            </ContactInfo>
            <WhatsAppButton
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-whatsapp"></i>
              Chatea con nosotros por WhatsApp
            </WhatsAppButton>
          </ContactCard>
        </Col>
      </Row>
    </ContactContainer>
  );
};
