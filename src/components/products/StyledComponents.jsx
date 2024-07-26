import styled from "@emotion/styled";
import { Button } from "react-bootstrap";

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
