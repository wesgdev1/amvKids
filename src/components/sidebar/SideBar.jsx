import { useContext } from "react";
import { NavLinkStyled } from "./StyledComponents";
import { AuthContext } from "../../auth/context/AuthContext";

export const SideBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <ul className="w-80 p-0 items-center flex flex-column   gap-4 md:border-r md:items-start">
      {user?.tipoUsuario === "Admin" ? (
        <>
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
  );
};
