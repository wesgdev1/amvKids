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

export const ButtonStyled = styled(Button)(({ theme }) => ({
  background: theme.colors.buttonColor,
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    background: theme.colors.mainColor,
  },
  height: "30px",
}));

export const ShoesCardStyled = styled(Card)(({ theme }) => ({
  width: "20rem",
  color: "white",
  background: `${theme.colors.mainColor}`,

  // backgroundSize: "cover",
  // backgroundImage:
  //   "url(https://res.cloudinary.com/du6lyyqjh/image/upload/c_thumb,w_200,g_face/v1724337163/found_mgp2uc.png)",

  padding: "10px",
  borderRadius: "5px",
  boxShadow: `0px 0px 10px 0px ${theme.colors.mainColor}`,
  transition: "all 0.5s",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage:
      "url(https://res.cloudinary.com/du6lyyqjh/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1724337163/found_mgp2uc.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.2, // Ajusta la opacidad según sea necesario
    zIndex: 1,
  },

  "& > *": {
    position: "relative",
    zIndex: 2,
  },
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
  marginTop: "80px",
  paddingRight: "2rem",
  paddingLeft: "2rem",
  paddingTop: "0.5rem",
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
