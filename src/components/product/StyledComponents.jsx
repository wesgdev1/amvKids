import styled from "@emotion/styled";
import { Button } from "react-bootstrap";

export const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  color: theme.colors.white,
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "all 0.3s",
}));
