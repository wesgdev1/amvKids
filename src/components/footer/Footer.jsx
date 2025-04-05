import { Image } from "react-bootstrap";
import { ContaynerFooterStyled, FooterContainer } from "../StyledComponents";

export const Footer = () => {
  return (
    <FooterContainer>
      <div
        className="footer-wave"
        style={{
          height: "70px",
          width: "100%",
          backgroundImage:
            "url('https://res.cloudinary.com/dppqkypts/image/upload/v1709176003/Dise%C3%B1o_sin_t%C3%ADtulo_31_vtsmze.png')",
        }}
      ></div>
      <ContaynerFooterStyled fluid>
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">AMV_KIDS</h4>
            <p className="footer-description">
              ¡Pequeños pasos, grandes aventuras! 👟
            </p>
            <p className="footer-text">
              Somos tu tienda de confianza para calzado infantil de calidad.
              Ofrecemos los mejores diseños y comodidad para los más pequeños.
            </p>
          </div>

          <div className="footer-logo">
            <Image
              src="https://res.cloudinary.com/dppqkypts/image/upload/v1709156443/AMV_LOGO_1_nx3ofa.png"
              alt="AMV_KIDS"
              width="120"
              height="120"
              className="logo-image"
            />
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contáctanos</h4>
            <div className="social-links">
              <a
                href="https://facebook.com/amv_kids"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="bi bi-facebook"></i> Facebook
              </a>
              <a
                href="https://instagram.com/amv_kids"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="bi bi-instagram"></i> Instagram
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="bi bi-whatsapp"></i> WhatsApp
              </a>
              <a href="mailto:info@amvkids.com" className="social-link">
                <i className="bi bi-envelope"></i> Email
              </a>
            </div>
            <div className="contact-info">
              <p>
                <i className="bi bi-geo-alt"></i> Dirección: Calle Principal
                #123
              </p>
              <p>
                <i className="bi bi-telephone"></i> Teléfono: (123) 456-7890
              </p>
              <p>
                <i className="bi bi-clock"></i> Horario: Lunes a Sábado 9:00 -
                18:00
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2024 AMV_KIDS - Todos los derechos reservados</span>
          <span>Created by @Wesg</span>
        </div>
      </ContaynerFooterStyled>
    </FooterContainer>
  );
};
