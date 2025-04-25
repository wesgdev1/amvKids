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

export const ProfilePhotoContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  maxWidth: "450px",
  margin: "0 auto",
  "@media (max-width: 768px)": {
    padding: "1.5rem",
    maxWidth: "100%",
  },
});

export const PhotoPreviewContainer = styled.div(({ theme }) => ({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  overflow: "hidden",
  margin: "1rem auto",
  border: `3px solid ${theme.colors.mainColor}`,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f8f9fa",
}));

export const PhotoPreviewImage = styled.img({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const PhotoUploadLabel = styled.label(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.colors.mainColor,
  color: "white",
  padding: "0.8rem 1.5rem",
  borderRadius: "30px",
  cursor: "pointer",
  margin: "1rem 0",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    transform: "translateY(-2px)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
}));

export const HiddenFileInput = styled.input({
  display: "none",
});

export const ProfilePhotoTitle = styled.h4(({ theme }) => ({
  color: theme.colors.mainColor,
  marginBottom: "1rem",
  fontWeight: "600",
}));

export const ProfilePhotoDescription = styled.p({
  color: "#666",
  fontSize: "0.9rem",
  marginBottom: "2rem",
  textAlign: "center",
});

export const ProfilePhotoButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  borderRadius: "30px",
  padding: "0.5rem 2rem",
  fontWeight: "500",
  margin: "1rem 0",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
    transform: "translateY(-2px)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
}));

export const ProfileContainer = styled.div({
  padding: "1.5rem",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  backgroundColor: "#fff",
  maxWidth: "900px",
  margin: "0 auto",
  width: "100%",
  "@media (max-width: 768px)": {
    padding: "1rem",
    borderRadius: "10px",
  },
});

export const ProfileHeader = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "2rem",
  "& i": {
    fontSize: "2rem",
    marginRight: "1rem",
    color: theme.colors.mainColor,
  },
  "& h4": {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#333",
  },
  "@media (max-width: 768px)": {
    marginBottom: "1.5rem",
    "& i": {
      fontSize: "1.5rem",
    },
    "& h4": {
      fontSize: "1.4rem",
    },
  },
}));

export const ProfileTabsContainer = styled.div({
  marginBottom: "2rem",
  borderBottom: "none",
  display: "flex",
  flexWrap: "wrap",
  "@media (max-width: 768px)": {
    marginBottom: "1rem",
  },
});

export const ProfileTab = styled.button(({ active, theme }) => ({
  background: active ? "white" : "#f8f9fa",
  color: active ? theme.colors.mainColor : "#555",
  border: active ? `2px solid ${theme.colors.mainColor}` : "2px solid #e9ecef",
  borderBottom: active ? "2px solid white" : "2px solid #e9ecef",
  borderRadius: "10px 10px 0 0",
  padding: "0.8rem 1.5rem",
  fontSize: "1rem",
  fontWeight: active ? "600" : "400",
  marginRight: "0.5rem",
  marginBottom: "0.5rem",
  transition: "all 0.2s ease",
  position: "relative",
  top: "2px",
  whiteSpace: "nowrap",
  "&:hover": {
    background: active ? "white" : "#f1f3f5",
    color: theme.colors.mainColor,
  },
  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },
  "&::after": active
    ? {
        content: '""',
        position: "absolute",
        bottom: "-2px",
        left: 0,
        width: "100%",
        height: "2px",
        background: "white",
      }
    : {},
  "@media (max-width: 768px)": {
    fontSize: "0.85rem",
    padding: "0.6rem 1rem",
    flexGrow: 1,
    textAlign: "center",
    marginRight: "0.3rem",
    "& i": {
      fontSize: "1rem",
    },
  },
  "@media (max-width: 576px)": {
    flexBasis: "calc(100% - 10px)",
    borderRadius: active ? "10px" : "10px",
    border: active
      ? `2px solid ${theme.colors.mainColor}`
      : "2px solid #e9ecef",
    margin: "0 0 0.5rem 0",
  },
}));

export const ProfileContent = styled.div({
  background: "white",
  border: "2px solid #e9ecef",
  borderRadius: "0 10px 10px 10px",
  padding: "2rem",
  minHeight: "400px",
  "@media (max-width: 768px)": {
    padding: "1.25rem",
    minHeight: "300px",
    borderRadius: "10px",
  },
  "@media (max-width: 576px)": {
    padding: "1rem",
    border: "none",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  },
});

// Nuevo estilo para el botón del formulario de datos personales
export const FormButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.secondaryColor, // Usando el color secundario
  borderColor: theme.colors.secondaryColor,
  color: "white",
  padding: "0.6rem 1.8rem",
  borderRadius: "8px",
  fontWeight: "500",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.colors.mainColor, // Cambia al color principal en hover
    borderColor: theme.colors.mainColor,
    transform: "scale(1.03)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
  "&:disabled": {
    backgroundColor: "#cccccc",
    borderColor: "#cccccc",
    cursor: "not-allowed",
  },
}));
