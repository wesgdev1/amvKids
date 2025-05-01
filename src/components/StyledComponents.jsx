import styled from "@emotion/styled";
import {
  Button,
  Card,
  Container,
  Alert,
  Row,
  Col,
  Image,
  Table,
} from "react-bootstrap";
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
  color: "black",
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
  width: "15rem",
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

export const ShoesCardStyledPayment = styled(Card)(({ theme }) => ({
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
      "url(https://res.cloudinary.com/du6lyyqjh/image/upload/v1724786444/adidas-nike-wallpaper-thumb_dimkvn.jpg)",

    backgroundPosition: "center",
    opacity: 0.1, // Ajusta la opacidad según sea necesario
    zIndex: 1,
  },

  "& > *": {
    position: "relative",
    zIndex: 2,
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
  padding: "2rem 0",
}));

export const FooterContainer = styled.div`
  width: 100%;

  margin: 0 auto;
  padding: 0;

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem 0;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0.5rem 0;
    }
  }

  .footer-section {
    flex: 1;
    min-width: 250px;
    max-width: 300px;
    margin: 0;
    padding: 0 0.5rem;

    @media (max-width: 768px) {
      max-width: 100%;
      padding: 0 0.5rem;
    }
  }

  .footer-title {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: white;
    text-align: center;
  }

  .footer-description {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    text-align: center;
  }

  .footer-text {
    font-size: 0.8rem;
    opacity: 0.8;
    text-align: center;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .footer-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
  }

  .logo-image {
    transition: transform 0.3s ease;
    max-width: 100px;
    height: auto;
    &:hover {
      transform: scale(1.05);
    }
  }

  .social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    align-items: center;
  }

  .social-link {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
    width: fit-content;
    font-size: 0.9rem;

    &:hover {
      color: ${({ theme }) => theme.colors.secondaryColor};
    }

    i {
      font-size: 1rem;
    }
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;

    p {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
      font-size: 0.8rem;
      text-align: center;

      i {
        color: ${({ theme }) => theme.colors.secondaryColor};
      }
    }
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.8rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0.25rem;
      text-align: center;
      padding: 0.5rem 0;
    }
  }
`;

export const FormStyled = styled.form`
  height: "50%";
  margin-top: "80px";
  padding-right: "2rem";
  padding-left: "2rem";
  padding-top: "0.5rem";
  position: "absolute";
  top: "50%";
  left: "50%";
  transform: "translate(-50%, -50%)";
  width: "40%";
  box-shadow: "0 0 10px 0 #000";
  border-radius: "10px";
  "@media (max-width: 576px)": {
    width: "80%",
  },
`;

// Contenedor Principal de Página
export const PageContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing?.large || "2rem",
  paddingBottom: theme.spacing?.large || "2rem",
}));

// Fila de Grid (opcional, si necesitas estilos específicos)
export const GridRowStyled = styled(Row)(({ theme }) => ({
  marginBottom: theme.spacing?.medium || "1.5rem",
}));

// Columna de Grid (opcional, si necesitas estilos específicos)
export const GridColStyled = styled(Col)`
  // Estilos adicionales si son necesarios
`;

// Imagen Estilizada
export const ImageStyled = styled(Image)(({ theme }) => ({
  maxWidth: "100%",
  height: "auto",
  display: "block",
  borderRadius: theme.borderRadius?.medium || "8px",
  boxShadow: theme.shadows?.subtle || "0 2px 5px rgba(0,0,0,0.1)",
  // Añadir estilos por defecto para fluid/thumbnail si se desea
  // '&.img-fluid': { ... }
  // '&.img-thumbnail': { ... }
}));

// Tabla Estilizada
export const TableStyled = styled(Table)(({ theme }) => ({
  borderColor: theme.colors?.borderColor || "#dee2e6",
  backgroundColor: theme.colors?.white || "#ffffff",
  boxShadow: theme.shadows?.subtle || "0 1px 3px rgba(0,0,0,0.05)",
  borderRadius: theme.borderRadius?.medium || "8px",
  overflow: "hidden", // Para que el borde redondeado afecte a la tabla

  "th, td": {
    padding: theme.spacing?.medium || "0.8rem",
    verticalAlign: "middle",
    borderColor: theme.colors?.borderColor || "#dee2e6",
  },
  "thead th": {
    backgroundColor: theme.colors?.tableHeaderBg || "#f8f9fa",
    color: theme.colors?.tableHeaderColor || "#495057",
    borderBottomWidth: "2px",
    fontWeight: "600",
  },
  // Estilos para hover y striped ya vienen con React Bootstrap si se usan las props
  // '&.table-hover tbody tr:hover': {
  //   backgroundColor: theme.colors?.tableHoverBg || '#f1f3f5',
  // },
  // '&.table-striped tbody tr:nth-of-type(odd)': {
  //   backgroundColor: theme.colors?.tableStripeBg || '#fbfcfd',
  // },
}));

// Alerta Estilizada (Ejemplo para 'danger')
export const AlertStyled = styled(Alert)(({ theme, variant }) => ({
  borderRadius: theme.borderRadius?.medium || "8px",
  borderWidth: "1px",
  padding: theme.spacing?.medium || "1rem",
  ...(variant === "danger" && {
    backgroundColor: theme.colors?.dangerLight || "#f8d7da",
    color: theme.colors?.dangerDark || "#721c24",
    borderColor: theme.colors?.danger || "#f5c6cb",
  }),
  // Añadir más variantes si es necesario (success, warning, info)
}));

// Botón Primario Estilizado (basado en tu ButtonStyled)
export const ButtonPrimaryStyled = styled(ButtonStyled)(({ theme }) => ({
  background: theme.colors?.primary || theme.colors?.buttonColor || "#007bff", // Usar primario o el color de botón existente
  color: theme.colors?.white || "#ffffff",
  padding: "0.6rem 1.8rem",
  borderRadius: theme.borderRadius?.pill || "50px",
  fontSize: "1rem",
  fontWeight: "bold",
  boxShadow: theme.shadows?.medium || "0 4px 8px rgba(0, 0, 0, 0.15)",
  transition: "background-color 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    background:
      theme.colors?.primaryDark || theme.colors?.mainColor || "#0056b3", // Usar hover primario o mainColor
    boxShadow: theme.shadows?.large || "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  // Remover altura fija si se necesita más flexibilidad
  height: "auto",
}));

// Botón Secundario Estilizado (para 'Volver')
export const ButtonSecondaryStyled = styled(Button)(({ theme }) => ({
  color: theme.colors?.secondaryDark || "#5a6268",
  backgroundColor: "transparent",
  borderColor: theme.colors?.secondary || "#ced4da",
  padding: "0.4rem 1rem",
  borderRadius: theme.borderRadius?.medium || "5px",
  fontWeight: "500",
  transition: "background-color 0.2s ease, color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.colors?.secondary || "#e2e6ea",
    color: theme.colors?.secondaryDark || "#495057",
    borderColor: theme.colors?.secondaryDark || "#b1b7bf",
  },
}));

// Encabezado Estilizado
export const HeadingStyled = styled.h2(({ theme }) => ({
  color: theme.colors?.primary || theme.colors?.mainColor || "#007bff",
  fontWeight: "bold",
  marginBottom: theme.spacing?.large || "1.5rem",
  textAlign: "center",
}));

// Celda de Tabla con Peso (ejemplo, podría no ser necesario)
// export const TableDataCellStyled = styled.td(({ theme, fontWeight }) => ({
//   fontWeight: fontWeight === 'semibold' ? 600 : 'normal',
// }));

// Icono Estilizado (para añadir margen)
export const IconStyled = styled.i`
  margin-right: 0.5rem;
  vertical-align: middle;
`;
