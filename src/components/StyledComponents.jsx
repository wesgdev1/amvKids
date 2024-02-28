import styled from "@emotion/styled";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ConteinerNavStyled = styled(Container)(({ theme }) => ({
  // background: `linear-gradient(4deg, black 70%, ${theme.colors.mainColor} 100%)`,

  background: theme.colors.mainColor,
  height: "80px",
  position: "fixed",
  top: 0,
  zIndex: 10,
  overflow: "hidden",
  "::after": {
    content: "''",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "10px",
    background: theme.colors.secondaryColor,
    filter: "blur(8px)",
  },
}));

export const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1rem",
  color: "white",
  textDecoration: "none",
  "&:hover": {
    color: theme.colors.secondaryColor,
    fontSize: "1.2rem",
  },
}));
