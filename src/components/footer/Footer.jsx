import { Container, Image } from "react-bootstrap";
import { ContaynerFooterStyled } from "../StyledComponents";

export const Footer = () => {
  return (
    <>
      <div className="">
        <div
          style={{
            height: "70px",
            width: "100%",
            backgroundImage:
              "url('https://res.cloudinary.com/dppqkypts/image/upload/v1709176003/Dise%C3%B1o_sin_t%C3%ADtulo_31_vtsmze.png')",
          }}
        ></div>
        <ContaynerFooterStyled fluid>
          <div className="d-flex justify-content-around  pt-10 align-items-center">
            <div>
              <h4>AMV_KIDS</h4>
              <p>¡Pequeños pasos, grandes aventuras! 👟</p>
            </div>
            <div>
              <Image
                src="https://res.cloudinary.com/dppqkypts/image/upload/v1709156443/AMV_LOGO_1_nx3ofa.png"
                alt="AMV_KIDS"
                width="100"
                height="100"
              />
            </div>
            <div>
              <h4>Redes Sociales y Contacto</h4>
              <div>
                <ul>
                  <li>
                    <i className="bi bi-facebook"> amv_kids</i>
                  </li>
                  <li>
                    <i className="bi bi-instagram"> amv_kids</i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center pt-3 pb-3">
            <span>Created by @Wesg 2024</span>
          </div>
        </ContaynerFooterStyled>
      </div>
    </>
  );
};
