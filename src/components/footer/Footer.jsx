import { Container } from "react-bootstrap";
import { ContaynerFooterStyled } from "../StyledComponents";

export const Footer = () => {
  return (
    <>
      <div className="pt-10">
        <div
          style={{
            height: "70px",
            width: "100%",
            backgroundImage:
              "url('https://res.cloudinary.com/dppqkypts/image/upload/v1709176003/Dise%C3%B1o_sin_t%C3%ADtulo_31_vtsmze.png')",
          }}
        ></div>
        <ContaynerFooterStyled fluid>
          <div className="d-flex justify-content-around gap-3 pt-10 align-items-center">
            <div>
              <h4>AMV_KIDS</h4>
              <p>¡Pequeños pasos, grandes aventuras! 👟</p>
            </div>
            <div>
              <h4>Redes Sociales</h4>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-center">
            <span>Created by @Wesg 2024</span>
          </div>
        </ContaynerFooterStyled>
      </div>
    </>
  );
};
