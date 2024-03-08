import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import {
  ButtonStyled,
  ConteinerNavStyled,
  NavLinkStyled,
} from "../StyledComponents";
import { NavLink, useNavigate } from "react-router-dom";
import { NavLogo } from "./NavLogo";

export const NavBarComponent = () => {
  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate("/productos");
  };
  return (
    <>
      <ConteinerNavStyled fluid>
        <Row>
          <div className="d-flex justify-around items-center gap-2">
            <NavLogo />
            <div className="d-flex flex-col  " style={{ width: "65%" }}>
              <Form.Control
                type="text"
                placeholder="Que calzado estas buscando?"
              />
            </div>

            <Nav className="d-flex  gap-3 items-center ">
              <ButtonStyled onClick={onHandleClick}>
                <i className="bi bi-person" /> /{" "}
                <i className="bi bi-person-fill-add" />
              </ButtonStyled>
            </Nav>
          </div>
        </Row>
        <Row>
          <div
            className="d-flex justify-center items-center gap-4 d-none d-md-flex
          "
          >
            <NavLinkStyled to="/login">Inicio</NavLinkStyled>
            <NavLinkStyled to="/blogs">Calzado</NavLinkStyled>
            <NavLinkStyled to="/contacto">Contacto</NavLinkStyled>
          </div>
        </Row>
      </ConteinerNavStyled>
    </>
  );
};
