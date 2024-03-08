import styled from "@emotion/styled";
import { Button, Card, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ConteinerNavStyled = styled(Container)(({ theme }) => ({
  background: theme.colors.mainColor,
  paddingTop: "20px",
  paddingBottom: "15px",
  boxShadow: `0px 0px 10px 0px ${theme.colors.secondaryColor}`,
}));

export const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1rem",
  color: "white",
  textDecoration: "none",
  "&:hover": {
    color: theme.colors.secondaryColor,
  },
}));

export const ButtonStyled = styled.button(({ theme }) => ({
  background: theme.colors.buttonColor,
  color: "black",
  padding: "8px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    background: theme.colors.secondaryColor,
  },
  height: "30px",
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

export const FormStyled = styled.form(({ theme }) => ({
  padding: "3rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  boxShadow: "0 0 10px 0 #000",
  borderRadius: "10px",
  "@media (max-width: 576px)": {
    width: "80%",
  },
}));
