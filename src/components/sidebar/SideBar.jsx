import { NavLinkStyled } from "./StyledComponents";

export const SideBar = () => {
  return (
    <ul className="w-80 flex flex-column gap-4 border-r">
      <li>
        <NavLinkStyled to={"/profile"}>
          <i className="bi bi-person-circle"></i>
          <span>Productos</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={"/profile/claims"}>
          <i className="bi bi-search"></i>
          <span>Ordenes</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled>
          <i className="bi bi-binoculars"></i>
          <span>View Notes</span>
        </NavLinkStyled>
      </li>
    </ul>
  );
};
