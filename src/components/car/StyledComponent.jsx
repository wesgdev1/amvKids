import styled from "@emotion/styled";
import { Button, Card } from "react-bootstrap";

export const CardChekoutStyle = styled(Card)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  color: "white",
  // margin: "15px",
}));

export const ButtonPayment = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.buttonColor,
  width: "100%",
  color: theme.colors.mainColor,
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
  },
}));

export const CardElementStyle = styled(Card)(({ theme }) => ({
  color: theme.colors.mainColor,
}));

export const ButtonCrash = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.buttonColor,
  color: theme.colors.mainColor,
  border: "none",

  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
  },
}));
