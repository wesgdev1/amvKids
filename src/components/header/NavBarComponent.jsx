import {
  Badge,
  Button,
  Container,
  Form,
  Image,
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
import { ContainerIcon } from "./StyledComponents";
import { useCart } from "../../store";

export const NavBarComponent = () => {
  const { user } = useContext(AuthContext);
  const { state } = useCart();

  const [modalProfile, setModalProfile] = useState(false);

  const total = state.reduce((acc, item) => acc + item.quantity, 0);

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
                <div className="flex justify-center items-center gap-3">
                  <ContainerIcon
                    onClick={() => navigate("/verCarritoDeCompras")}
                  >
                    <i className="bi bi-cart4"></i>
                    <Badge
                      bg="danger"
                      className="position-absolute"
                      style={{ marginLeft: "26px", marginTop: "-30px" }}
                      hidden={total === 0}
                    >
                      {total}
                    </Badge>
                  </ContainerIcon>

                  <div className="flex items-center justify-center flex-col gap-2">
                    <Image
                      src={
                        user.urlFoto ||
                        "https://res.cloudinary.com/dppqkypts/image/upload/v1700685111/david_sanchez_oigkwg.png"
                      }
                      alt="Nombre de usuario"
                      className=" w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-gray-300 hover:border-gray-500 cursor-pointer"
                      onClick={() => setModalProfile(!modalProfile)}
                    />
                  </div>
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
            <NavLinkStyled to="/">Contacto</NavLinkStyled>
          </div>
        </Row>
      </ConteinerNavStyled>
    </>
  );
};
