import styled from "@emotion/styled";
import { Button, Card, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ConteinerNavStyled = styled(Container)(({ theme }) => ({
  background: theme.colors.mainColor,
  paddingTop: "20px",
  paddingBottom: "10px",
  borderBottom: "0.5px solid #ccc",
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

export const ShoesCardStyled = styled(Card)(({ theme }) => ({
  width: "18rem",
  color: "white",
  background: `${theme.colors.mainColor}`,
  padding: "10px",
  borderRadius: "5px",
  boxShadow: `0px 0px 10px 0px ${theme.colors.mainColor}`,
  transition: "all 0.5s",
  "&:hover": {
    boxShadow: `0px 0px 50px 0px ${theme.colors.buttonColor}`,
  },
}));

export const ButtonCardStyled = styled(Button)(({ theme }) => ({
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

export const ContaynerFooterStyled = styled(Container)(({ theme }) => ({
  background: theme.colors.mainColor,
  color: "white",
}));
