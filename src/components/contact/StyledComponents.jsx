import styled from "@emotion/styled";
import { Container, Card } from "react-bootstrap";

export const ContactContainer = styled(Container)(({ theme }) => ({
  padding: "2rem 0",
  minHeight: "calc(100vh - 200px)",
  backgroundColor: theme.colors.gray100,
}));

export const ContactCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  color: "white",
  borderRadius: "20px",
  boxShadow: `0px 0px 30px 0px ${theme.colors.secondaryColor}`,
  padding: "2.5rem",
  margin: "1rem",
  border: "none",
  position: "relative",
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "100px",
    height: "100px",
    background: theme.colors.secondaryColor,
    borderRadius: "50%",
    transform: "translate(50%, -50%)",
    opacity: 0.2,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "150px",
    height: "150px",
    background: theme.colors.buttonColor,
    borderRadius: "50%",
    transform: "translate(-50%, 50%)",
    opacity: 0.1,
  },
}));

export const ContactTitle = styled.h2(({ theme }) => ({
  color: theme.colors.buttonColor,
  textAlign: "center",
  marginBottom: "2.5rem",

  fontSize: "2.5rem",
  textTransform: "uppercase",
  letterSpacing: "2px",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100px",
    height: "3px",
    background: theme.colors.secondaryColor,
    borderRadius: "3px",
  },
}));

export const ContactInfo = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  marginBottom: "2.5rem",
}));

export const ContactItem = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
  padding: "0.8rem 1.2rem",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "10px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateX(5px)",
  },
  "& i": {
    color: theme.colors.buttonColor,
    fontSize: "1.8rem",
    minWidth: "30px",
  },
  "& a": {
    color: "white",
    textDecoration: "none",
    transition: "color 0.3s ease",
    fontSize: "1.1rem",
    "&:hover": {
      color: theme.colors.secondaryColor,
    },
  },
  "& span": {
    fontSize: "1.1rem",
  },
}));

export const WhatsAppButton = styled.a(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.8rem",
  backgroundColor: theme.colors.buttonColor,
  color: theme.colors.mainColor,
  padding: "1.2rem 2.5rem",
  borderRadius: "15px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "1.2rem",
  transition: "all 0.3s ease",
  marginTop: "1.5rem",
  boxShadow: `0px 5px 15px 0px ${theme.colors.buttonColor}40`,
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    color: "white",
    transform: "translateY(-3px)",
    boxShadow: `0px 8px 20px 0px ${theme.colors.secondaryColor}40`,
  },
  "& i": {
    fontSize: "1.8rem",
  },
}));
