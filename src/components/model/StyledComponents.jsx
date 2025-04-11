import styled from "@emotion/styled";
import { Form } from "react-bootstrap";

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
