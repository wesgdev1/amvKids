import styled from "@emotion/styled";
import { Button, Card } from "react-bootstrap";

export const ButtonProfile = styled(Button)(({ theme }) => ({
  width: "25rem",
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
  },
}));

export const ControlButton = styled(Button)(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.colors.mainColor,
  background: "transparent",
  border: "none",
  "&:hover": {
    color: "white",
    background: theme.colors.mainColor,
  },
}));

export const CardStoreStyle = styled(Card)(({ theme }) => ({
  backgroundColor: theme.colors.gray100,
  color: theme.colors.mainColor,
  width: "35rem",
  height: "18rem",
  paddingBottom: "1rem",
}));

export const ButtonCountStyled = styled(Button)(() => ({
  height: "50%",
  backgroundColor: "white",
}));

export const BtnSubmitStyled = styled("button")(
  ({ theme, variant, fontSize, width }) => ({
    display: "flex",
    width,
    justifyContent: "center",
    padding: "5px 10px 5px 10px",
    color: variant === "light" ? theme.colors.mainColor : "white",
    fontSize: theme.fonts[fontSize],
    backgroundColor:
      variant === "light" ? theme.colors.gray100 : theme.colors.mainColor,
    border: variant === "light" ? "white" : theme.colors.secondaryColor,
    borderRadius: 5,
    "&:hover": {
      backgroundColor:
        variant === "light"
          ? theme.colors.gray200
          : theme.colors.secondaryColor,
      border:
        variant === "light"
          ? theme.colors.gray200
          : theme.colors.secondaryColor,
      color: variant === "light" ? theme.colors.mainColor : "white",
    },
  })
);

export const BtnDangerSubmitStyled = styled("button")(
  ({ theme, variant, fontSize, width }) => ({
    display: "flex",
    width,
    justifyContent: "center",
    padding: "5px 10px 5px 10px",
    color: variant === "light" ? "red" : "white",
    fontSize: theme.fonts[fontSize],
    backgroundColor: variant === "light" ? theme.colors.gray100 : "red",
    border: "2px none red",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: variant === "light" ? theme.colors.gray200 : "darkred",
      border: "2px none darkred",
      color: "white",
    },
  })
);
