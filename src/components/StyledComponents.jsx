import styled from "@emotion/styled";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ConteinerNavStyled = styled(Container)(({ theme }) => ({
  background: theme.colors.mainColor,
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

export const ButtonStyled = styled.button(({ theme }) => ({
  background: theme.colors.buttonColor,
  color: "black",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    background: theme.colors.secondaryColor,
  },
}));
