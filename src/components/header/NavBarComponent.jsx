import { Nav, Row } from "react-bootstrap";
import { ConteinerNavStyled, NavLinkStyled } from "../StyledComponents";
import { NavLink } from "react-router-dom";
import { NavLogo } from "./NavLogo";

export const NavBarComponent = () => {
  return (
    <>
      <ConteinerNavStyled fluid className="pt-3 pb-4">
        <Row>
          <div className="d-flex justify-around items-center">
            <NavLogo />
            <Nav className="d-flex justify-content-center gap-4">
              <NavLinkStyled to="/login">Inicio</NavLinkStyled>
              <NavLinkStyled to="/blogs">Calzado</NavLinkStyled>
              <NavLinkStyled to="/contacto">Contacto</NavLinkStyled>
            </Nav>

            <div className="d-flex  gap-3 items-center">
              <NavLinkStyled to="/login">Iniciar sesion</NavLinkStyled>
              <NavLinkStyled to="/blogs">Registarse</NavLinkStyled>
            </div>
          </div>
        </Row>
      </ConteinerNavStyled>
    </>
  );
};
