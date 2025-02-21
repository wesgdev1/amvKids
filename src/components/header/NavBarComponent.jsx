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
import {
  ContainerIcon,
  OffcanvasBS,
  OffcanvasHbs,
  OffcanvasS,
  OffcanvasTitleS,
} from "./StyledComponents";
import { useCart } from "../../store";
import Offcanvas from "react-bootstrap/Offcanvas";

export const NavBarComponent = () => {
  const { state } = useCart();
  const { user, logout } = useContext(AuthContext);

  const cerrarsesion = () => {
    logout();
  };

  const [modalProfile, setModalProfile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const total = state.reduce((acc, item) => acc + item.quantity, 0);

  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate("/login");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate(`/productos/search/${searchValue}`);
      setSearchValue("");
      window.location.reload();
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
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
                value={searchValue}
                onChange={handleInputChange}
                onKeyUp={handleKeyPress}
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
                      // onClick={() => setModalProfile(!modalProfile)}
                      onClick={handleShow}
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

            {/* {modalProfile && <SideMeny />} */}
            <OffcanvasS
              show={show}
              onHide={handleClose}
              placement="end"
              style={{ width: "300px " }}
            >
              <OffcanvasHbs
                closeButton
                style={{
                  backgroundColor: "white",
                }}
              >
                <OffcanvasTitleS>Menu</OffcanvasTitleS>
              </OffcanvasHbs>
              <OffcanvasBS>
                {user && (
                  <div className="text-white bg-slate-500 p-10 rounded-lg  w-[275px] shadow-2xl ">
                    <div className="flex flex-col justify-center items-center gap-3 mb-10">
                      <img
                        src={
                          user?.urlFoto ||
                          "https://res.cloudinary.com/dppqkypts/image/upload/v1700685111/david_sanchez_oigkwg.png"
                        }
                        alt="Nombre de usuario"
                        className=" w-16 h-16 rounded-full border-2 border-gray-300 hover:border-gray-500 cursor-pointer"
                      />
                      <span className="text-2xl">{user.name}</span>

                      {/* <ButtonCardStyled>Gestionar Perfil </ButtonCardStyled> */}
                    </div>
                    <hr />
                    {/* <span
                      onClick={() => {
                        navigate("/profile");
                      }}
                      className="cursor-pointer hover:text-blue-800 hover:text-xl"
                    >
                      Mi perfil
                    </span>
                    <hr /> */}

                    <ul className="w-80 p-0 items-start flex flex-column   gap-4 ">
                      {user?.tipoUsuario === "Admin" ? (
                        <>
                          <li className="">
                            <NavLinkStyled to={"/profile/"}>
                              <i className="bi bi-person-circle"></i>
                              <span> Mi perfil</span>
                            </NavLinkStyled>
                          </li>
                          <li className="">
                            <NavLinkStyled to={"/profile/reports"}>
                              <i className="bi bi-info-circle"></i>
                              <span> Informes</span>
                            </NavLinkStyled>
                          </li>
                          <li className="">
                            <NavLinkStyled to={"/profile/orders"}>
                              <i className="bi bi-border-width"></i>
                              <span> Ordenes</span>
                            </NavLinkStyled>
                          </li>
                          <li>
                            <NavLinkStyled to={"/profile/products"}>
                              <i className="bi bi-box"></i>
                              <span> Calzados</span>
                            </NavLinkStyled>
                          </li>
                          <li>
                            <NavLinkStyled to={"/profile/users"}>
                              <i className="bi bi-person-circle"></i>
                              <span> Usuarios</span>
                            </NavLinkStyled>
                          </li>
                          <li>
                            <NavLinkStyled to={"/profile/scan"}>
                              <i className="bi bi-upc-scan"></i>
                              <span> Escanear Codigo</span>
                            </NavLinkStyled>
                          </li>

                          <li>
                            <NavLinkStyled to={"/login"}>
                              <i className="bi bi-box-arrow-left"></i>
                              <span> Cerrar sesion</span>
                            </NavLinkStyled>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <NavLinkStyled to={"/profile"}>
                              <i className="bi bi-person-circle"></i>
                              <span> Mis perfil</span>
                            </NavLinkStyled>
                          </li>
                          <li>
                            <NavLinkStyled to={"/productos"}>
                              <i className="bi bi-person-circle"></i>
                              <span> Productos</span>
                            </NavLinkStyled>
                          </li>

                          <li>
                            <NavLinkStyled to={"/profile/myOrders"}>
                              <i className="bi bi-search"></i>
                              <span> Mis pedidos</span>
                            </NavLinkStyled>
                          </li>
                          <li>
                            <NavLinkStyled to={"/profile/scan"}>
                              <i className="bi bi-upc-scan"></i>
                              <span> Escanear Codigo</span>
                            </NavLinkStyled>
                          </li>

                          <li>
                            <NavLinkStyled>
                              <i className="bi bi-binoculars"></i>
                              <span> Cerrar sesion</span>
                            </NavLinkStyled>
                          </li>
                        </>
                      )}
                    </ul>
                    <hr />

                    <span
                      className="cursor-pointer hover:text-blue-800 hover:text-xl bg-red-500 p-2 rounded-lg"
                      onClick={() => {
                        cerrarsesion();
                      }}
                    >
                      Cerrar sesion
                    </span>
                  </div>
                )}
              </OffcanvasBS>
            </OffcanvasS>
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
