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
import { useNavigate } from "react-router-dom";
import { NavLogo } from "./NavLogo";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { SideMeny } from "./SideMeny";

export const NavBarComponent = () => {
  const { user } = useContext(AuthContext);

  const [modalProfile, setModalProfile] = useState(false);

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
                <div className="flex items-center justify-center flex-col gap-2">
                  <div>
                    <i className="bi bi-cart-check-fill"></i>
                  </div>
                  <img
                    src={
                      user.urlFoto ||
                      "https://res.cloudinary.com/dppqkypts/image/upload/v1700685111/david_sanchez_oigkwg.png"
                    }
                    alt="Nombre de usuario"
                    className=" w-16 h-16 rounded-full border-2 border-gray-300 hover:border-gray-500 cursor-pointer"
                    onClick={() => setModalProfile(!modalProfile)}
                  />
                </div>
              ) : (
                <ButtonStyled onClick={onHandleClick}>
                  <i className="bi bi-person" /> /{" "}
                  <i className="bi bi-person-fill-add" />
                </ButtonStyled>
              )}
            </Nav>

            {modalProfile && <SideMeny />}
          </div>
        </Row>
        <Row>
          <div
            className="d-flex justify-center items-center gap-4 d-none d-md-flex
          "
          >
            <NavLinkStyled to="/">Inicio</NavLinkStyled>
            <NavLinkStyled to="/productos">Calzado</NavLinkStyled>
            <NavLinkStyled to="/contact">Contacto</NavLinkStyled>
          </div>
        </Row>
      </ConteinerNavStyled>
    </>
  );
};
