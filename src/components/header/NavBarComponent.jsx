import { Badge, Image, Nav, Row } from "react-bootstrap";
import {
  ButtonStyled,
  ButtonStyledNew,
  ConteinerNavStyled,
  NavLinkStyled,
} from "../StyledComponents";
import { useNavigate } from "react-router-dom";
import { NavLogo } from "./NavLogo";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import {
  ContainerIcon,
  OffcanvasBS,
  OffcanvasHbs,
  OffcanvasS,
  OffcanvasTitleS,
} from "./StyledComponents";
import { useCart } from "../../store";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useModelWithColors } from "../../domain/models/useModels";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";
import { useCartCurvas } from "../../store/curvas";

// Definir la animación de "shake"
const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
`;

// Crear un componente Badge estilizado
const AnimatedBadge = styled(Badge)`
  /* Aplicar la animación solo cuando el badge NO está oculto */
  ${(props) =>
    !props.hidden &&
    css`
      animation: ${shakeAnimation} 2s ease-in-out infinite;
    `}
  /* Ajustes de posición (pueden variar según tu diseño exacto) */
  position: absolute;
  margin-left: 26px; /* Mantener tu estilo original */
  margin-top: -30px; /* Mantener tu estilo original */
`;

// Función de filtrado personalizado para búsqueda por palabras en cualquier orden
const filterByCallback = (option, props) => {
  // Ahora 'option' será un objeto { id, name, color, displayLabel }
  const label = option.displayLabel;
  if (!label || !props.text) {
    return false;
  }

  const text = props.text.toLowerCase().trim();
  const labelLower = label.toLowerCase();

  // Dividir el texto de búsqueda en palabras, ignorando espacios extra
  const searchWords = text.split(/\s+/).filter(Boolean);

  // Si no hay palabras de búsqueda, no filtrar (o podrías decidir devolver false)
  if (searchWords.length === 0) {
    return true; // Muestra todo si no hay texto
  }

  // Verificar que TODAS las palabras de búsqueda estén contenidas en la etiqueta de la opción
  return searchWords.every((word) => labelLower.includes(word));
};

export const NavBarComponent = () => {
  const { state } = useCart();
  const { state: stateCartCruvas } = useCartCurvas();
  const { user, logout } = useContext(AuthContext);
  // Obtener los datos de modelos con colores
  const { data: modelsData, loading, error } = useModelWithColors();

  const cerrarsesion = () => {
    logout();
  };

  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const total = state.reduce((acc, item) => acc + item.quantity, 0);
  const totalCurvas = stateCartCruvas.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate("/login");
  };

  // Transformar los datos del hook para Typeahead
  const typeaheadOptions = modelsData
    ? modelsData.map((model) => ({
        id: model.id, // Conservar id si es útil
        name: model.name,
        color: model.color,
        // Crear una etiqueta combinada para mostrar y buscar
        displayLabel: `${model.name} (${model.color})`,
      }))
    : []; // Array vacío si no hay datos

  const handleKeyPress = (event) => {
    // Navegar al presionar Enter directamente en el input
    // También capturar otros eventos que pueden ocurrir en móviles
    if (
      (event.key === "Enter" || event.key === "Go" || event.key === "Search") &&
      searchValue.trim() !== ""
    ) {
      event.preventDefault(); // Prevenir cualquier comportamiento por defecto
      executeSearch();
    }
  };

  const executeSearch = () => {
    if (searchValue.trim() !== "") {
      navigate(`/productos/search/${searchValue.trim()}`);
      setSearchValue(""); // Limpiar después de buscar
    }
  };

  const handleInputChange = (text) => {
    setSearchValue(text);
  };

  const handleSelection = (selected) => {
    if (selected.length > 0) {
      // Extraer el 'name' (o 'displayLabel' si prefieres) del objeto seleccionado para la búsqueda
      const selectedObject = selected[0];
      // Reemplazar '/' en el color por un espacio antes de formar el término de búsqueda
      const formattedColor = selectedObject.color.replace(/\//g, " "); // Reemplaza todas las '/' globalmente
      const searchTerm = `${selectedObject.name} ${formattedColor}`; // Usar plantilla de string para claridad

      // 1. Actualizar estado (opcional, podrías limpiar directamente)
      setSearchValue(searchTerm); // Actualizar con el término formateado

      // 2. Navegar a la página de búsqueda con el término extraído
      navigate(`/productos/search/${searchTerm.trim()}`);

      // 3. Limpiar después de navegar (si aún es necesario)
      setSearchValue("");

      // 4. Recarga eliminada, asumiendo que el componente de resultados maneja los cambios
    }
  };

  const routesConfig = {
    Admin: [
      { path: "/profile/", icon: "bi bi-person-circle", label: "Mi perfil" },
      {
        path: "/profile/reports",
        icon: "bi bi-info-circle",
        label: "Informes Ventas",
      },
      {
        path: "/profile/alerts",
        icon: "bi bi-info-circle",
        label: "Alertas Inventario",
      },
      { path: "/profile/orders", icon: "bi bi-border-width", label: "Ordenes" },
      { path: "/profile/products", icon: "bi bi-box", label: "Calzados" },
      // { path: "/profile/products", icon: "bi bi-box", label: "Curvas" },
      {
        path: "/profile/users",
        icon: "bi bi-person-circle",
        label: "Usuarios",
      },
      {
        path: "/profile/creators",
        icon: "bi bi-people-fill",
        label: "Creadores UGC",
      },
      {
        path: "/profile/coupons",
        icon: "bi bi-ticket-perforated-fill",
        label: "Cupones",
      },
      {
        path: "/profile/scan",
        icon: "bi bi-upc-scan",
        label: "Escanear Código",
      },

      // { path: "/login", icon: "bi bi-box-arrow-left", label: "Cerrar sesión" },
    ],
    Reventa: [
      { path: "/profile", icon: "bi bi-person-circle", label: "Mi perfil" },
      // {
      //   path: "/verCarritoDeComprasCurvas",
      //   icon: "bi bi-person-circle",
      //   label: "Mi carrito de Curvas",
      // },
      { path: "/productos", icon: "bi bi-person-circle", label: "Productos" },
      // { path: "/curvas", icon: "bi bi-diagram-2", label: "Curvas" },
      { path: "/profile/myOrders", icon: "bi bi-search", label: "Mis pedidos" },
      {
        path: "/profile/scan",
        icon: "bi bi-upc-scan",
        label: "Escanear Código",
      },
      // { path: "/login", icon: "bi bi-box-arrow-left", label: "Cerrar sesión" },
    ],
    "Tienda Aliada": [
      { path: "/profile", icon: "bi bi-person-circle", label: "Mi perfil" },
      // {
      //   path: "/verCarritoDeComprasCurvas",
      //   icon: "bi bi-person-circle",
      //   label: "Mi carrito de Curvas",
      // },
      { path: "/productos", icon: "bi bi-person-circle", label: "Productos" },
      // { path: "/curvas", icon: "bi bi-diagram-2", label: "Curvas" },
      { path: "/profile/myOrders", icon: "bi bi-search", label: "Mis pedidos" },
      {
        path: "/profile/scan",
        icon: "bi bi-upc-scan",
        label: "Escanear Código",
      },
      // { path: "/login", icon: "bi bi-box-arrow-left", label: "Cerrar sesión" },
    ],

    Preparador: [
      { path: "/profile", icon: "bi bi-person-circle", label: "Mi perfil" },
      {
        path: "/profile/prepareOrders",
        icon: "bi bi-search",
        label: "Ordenes",
      },
      {
        path: "/profile/scan",
        icon: "bi bi-upc-scan",
        label: "Escanear Código",
      },
      // { path: "/login", icon: "bi bi-box-arrow-left", label: "Cerrar sesión" },
    ],
    Cliente: [
      { path: "/profile", icon: "bi bi-person-circle", label: "Mi perfil" },
      // {
      //   path: "/verCarritoDeComprasCurvas",
      //   icon: "bi bi-person-circle",
      //   label: "Mi carrito de Curvas",
      // },
      { path: "/productos", icon: "bi bi-person-circle", label: "Productos" },
      // { path: "/curvas", icon: "bi bi-diagram-2", label: "Curvas" },
      { path: "/profile/myOrders", icon: "bi bi-search", label: "Mis pedidos" },
    ],
  };

  const userType = user?.tipoUsuario || "Nadie"; // Si no hay usuario, asume que es un usuario normal
  const routes = routesConfig[userType] || [];
  return (
    <>
      <ConteinerNavStyled fluid>
        <Row>
          <div className="d-flex justify-around items-center gap-2">
            <NavLogo />
            <div className="d-flex flex-col  " style={{ width: "65%" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  executeSearch();
                }}
              >
                <Typeahead
                  id="product-search-typeahead"
                  options={typeaheadOptions}
                  labelKey="displayLabel"
                  minLength={1}
                  maxResults={10}
                  filterBy={filterByCallback}
                  placeholder={
                    loading
                      ? "Cargando modelos..."
                      : "Qué calzado estás buscando?"
                  }
                  disabled={loading || !!error}
                  onInputChange={handleInputChange}
                  onChange={handleSelection}
                  onKeyDown={handleKeyPress}
                  inputValue={searchValue}
                  inputProps={{
                    inputMode: "search",
                    enterKeyHint: "search",
                  }}
                />
              </form>
              {error && (
                <small className="text-danger">Error al cargar modelos</small>
              )}
            </div>

            <Nav className="d-flex  gap-3 items-center ">
              {user ? (
                <div className="flex justify-center items-center gap-3">
                  {user?.tipoUsuario === "Cliente" ||
                  user?.tipoUsuario == "Reventa" ||
                  user?.tipoUsuario == "Tienda Aliada" ? (
                    <>
                      <ContainerIcon
                        onClick={() => navigate("/verCarritoDeCompras")}
                      >
                        <i className="bi bi-cart4"></i>
                        <AnimatedBadge bg="danger" hidden={total === 0}>
                          {total}
                        </AnimatedBadge>
                      </ContainerIcon>
                    </>
                  ) : null}

                  <div className="flex items-center justify-center flex-col gap-2">
                    <Image
                      src={
                        user.urlFoto ||
                        "https://res.cloudinary.com/dppqkypts/image/upload/v1700685111/david_sanchez_oigkwg.png"
                      }
                      alt="Nombre de usuario"
                      className=" w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-gray-300 hover:border-gray-500 cursor-pointer"
                      onClick={handleShow}
                    />
                    <AnimatedBadge bg="danger" hidden={totalCurvas === 0}>
                      {totalCurvas}
                    </AnimatedBadge>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <ContainerIcon
                    onClick={() => navigate("/verCarritoDeCompras")}
                  >
                    <i className="bi bi-cart4"></i>
                    <AnimatedBadge bg="danger" hidden={total === 0}>
                      {total}
                    </AnimatedBadge>
                  </ContainerIcon>
                  <ButtonStyled onClick={onHandleClick}>
                    <i className="bi bi-person" />
                    {/* /{" "}
                    <i className="bi bi-person-fill-add" /> */}
                  </ButtonStyled>
                </div>
              )}
            </Nav>

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
                      <span className="text-2xl text-center">{user.name}</span>
                    </div>
                    <hr />

                    <ul className="w-80 p-0 items-start flex flex-column   gap-4 ">
                      {routes.map((route, index) => (
                        <li key={index}>
                          <NavLinkStyled to={route.path} onClick={handleClose}>
                            <i className={route.icon}></i>
                            <span style={{ position: "relative" }}>
                              {" "}
                              {route.label}
                              {route.path === "/verCarritoDeComprasCurvas" &&
                                totalCurvas > 0 && (
                                  <AnimatedBadge
                                    bg="danger"
                                    hidden={false}
                                    style={{
                                      position: "absolute",
                                      top: "0",
                                      left: "100%",
                                      marginTop: "0",
                                      marginLeft: "0.3rem",
                                      fontSize: "0.65rem",
                                      padding: "0.1rem 0.3rem",
                                    }}
                                  >
                                    {totalCurvas}
                                  </AnimatedBadge>
                                )}
                            </span>
                          </NavLinkStyled>
                        </li>
                      ))}
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
            <NavLinkStyled to="/contact">Contacto</NavLinkStyled>
          </div>
        </Row>
      </ConteinerNavStyled>
    </>
  );
};
