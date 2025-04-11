import styled from "@emotion/styled";
import { Form, Modal, Badge } from "react-bootstrap";

export const ContainerImages = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "5em",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  padding: "10px",
  boxShadow: `0px 0px 10px 0px ${theme.colors.secondaryColor}`,
  borderRadius: "15px",
  marginTop: "20px",
  marginBottom: "20px",
  width: "100%",
}));

export const FormContainer = styled.div({
  padding: "2rem 1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  "@media (max-width: 768px)": {
    padding: "1.5rem 0.5rem",
  },
});

export const FormGroup = styled(Form.Group)({
  width: "100%",
  maxWidth: "800px",
  marginBottom: "1.5rem",
  "& .form-control": {
    width: "100%",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  "@media (max-width: 768px)": {
    marginBottom: "1rem",
  },
});

export const FormWrapper = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const ImagePreviewContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "1rem",
  marginTop: "1rem",
  width: "100%",
  maxWidth: "800px",
  "@media (max-width: 992px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (max-width: 576px)": {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
});

export const ImagePreview = styled.div({
  position: "relative",
  overflow: "hidden",
  borderRadius: "0.5rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  aspectRatio: "1",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "0.5rem",
  },
});

// Componentes estilizados para el modal
export const StyledModal = styled(Modal)(({ theme }) => ({
  "& .modal-content": {
    borderRadius: "15px",

    border: "none",
  },
}));

export const ModalHeader = styled(Modal.Header)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  color: "white",
  borderBottom: `2px solid ${theme.colors.secondaryColor}`,
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
  padding: "1rem 1.5rem",
  "& .modal-title": {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  "& .btn-close": {
    color: "white",
    opacity: 0.8,
    filter: "brightness(2)",
    "&:hover": {
      opacity: 1,
    },
  },
}));

export const ModalBody = styled(Modal.Body)({
  padding: "1.5rem",
  maxHeight: "60vh",
  overflowY: "auto",
});

export const StockList = styled.ul({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const StockItem = styled.li(({ isLow }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 15px",
  margin: "8px 0",
  borderRadius: "8px",
  backgroundColor: isLow ? "rgba(255, 193, 7, 0.1)" : "rgba(40, 167, 69, 0.1)",
  border: `1px solid ${
    isLow ? "rgba(255, 193, 7, 0.3)" : "rgba(40, 167, 69, 0.3)"
  }`,
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

export const SizeBadge = styled(Badge)(({ theme, isLow }) => ({
  fontSize: "1rem",
  padding: "6px 12px",
  backgroundColor: isLow
    ? theme.colors.secondaryColor
    : theme.colors.buttonColor,
  color: isLow ? "white" : theme.colors.mainColor,
  fontWeight: "bold",
}));

export const QuantityBadge = styled(Badge)(({ isLow }) => ({
  fontSize: "1rem",
  padding: "6px 12px",
  backgroundColor: isLow ? "#ffc107" : "#28a745",
  color: isLow ? "#212529" : "white",
}));

export const ModalFooter = styled(Modal.Footer)(({ theme }) => ({
  borderTop: `2px solid ${theme.colors.secondaryColor}`,
  padding: "1rem 1.5rem",
  borderBottomLeftRadius: "15px",
  borderBottomRightRadius: "15px",
  justifyContent: "center",
}));
