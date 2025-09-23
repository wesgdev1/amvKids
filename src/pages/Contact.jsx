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
                <span>
                  Centro Comercial Plaza Los Andes. Local 117 2do Piso
                </span>
              </ContactItem>
              <ContactItem>
                <i className="bi bi-telephone-fill"></i>
                <a href="tel:+573123456789">+57 311 2728811</a>
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
                  @amv__kids
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
              href="https://api.whatsapp.com/send?phone=573123460008&text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20https%3A%2F%2Famvkids.com.co%2F%20y%20me%20gustar%C3%ADa%20saber%20informaci%C3%B3n%20de%20sus%20productos."
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
