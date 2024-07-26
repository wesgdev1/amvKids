import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  color: theme.colors.mainColor,

  textDecoration: "none",
  ":hover": {
    color: theme.colors.secondaryColor,
    fontWeight: "bold",
  },
}));
