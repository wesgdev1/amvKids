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
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";

export const NavBarComponent = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate("/login");
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
              {user ? (
                <NavDropdown
                  title={
                    <img
                      src={user.image}
                      alt="Nombre de usuario"
                      className=" w-14 h-14 rounded-full border-2 border-gray-300 hover:border-gray-500 cursor-pointer"
                    />
                  }
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/profile/shoppinghistory">
                    Mis compras
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Cerrar sesion
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <ButtonStyled onClick={onHandleClick}>
                  <i className="bi bi-person" /> /{" "}
                  <i className="bi bi-person-fill-add" />
                </ButtonStyled>
              )}
            </Nav>
          </div>
        </Row>
        <Row>
          <div
            className="d-flex justify-center items-center gap-4 d-none d-md-flex
          "
          >
            <NavLinkStyled to="/">Inicio</NavLinkStyled>
            <NavLinkStyled to="/productos">Calzado</NavLinkStyled>
            <NavLinkStyled to="/">Contacto</NavLinkStyled>
          </div>
        </Row>
      </ConteinerNavStyled>
    </>
  );
};
