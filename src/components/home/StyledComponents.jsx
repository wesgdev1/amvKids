import styled from "@emotion/styled";
import { Card } from "react-bootstrap";

export const CardDescroptionStyle = styled(Card.Text)(() => ({
  height: "70px",
  overflow: "hidden",
  whiteSpace: "normal",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  borderRadius: "5px",
}));

export const IconStyled = styled("a")(() => ({
  backgroundColor: "green",
  color: "white",
  borderRadius: "50%",
  width: "70px",
  lineHeight: "70px",
  position: "fixed",
  bottom: "15%",
  right: "5%",
  textAlign: "center",

  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  zIndex: 100,
  "&:hover": {
    textDecoration: "none",
    color: "green",
    backgroundColor: "white",
  },
}));

export const IconStyled2 = styled("a")(() => ({
  backgroundColor: "green",
  color: "white",
  borderRadius: "50%",
  width: "70px",
  lineHeight: "70px",
  position: "fixed",
  bottom: "5%",
  right: "5%",
  textAlign: "center",

  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  zIndex: 100,
  "&:hover": {
    width: "75px",
    textDecoration: "none",
    color: "green",
    backgroundColor: "white",
    boxShadow: "0px 0px 10px 0px rgba(1,1,1,0.75)",
  },
}));

export const ContainerMov = styled("div")(() => ({
  opacity: 0,
  transform: "rotateY(90deg)",
  animation: "flipIn 1s ease-out forwards",
  "@keyframes flipIn": {
    "0%": {
      opacity: 0,
      transform: "rotateY(90deg)",
    },
    "100%": {
      opacity: 1,
      transform: "rotateY(0deg)",
    },
  },
}));
