import styled from "@emotion/styled";
import { Button, Card, Container } from "react-bootstrap";
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
  color: "white",
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

export const FormStyled = styled.form(({ theme }) => ({
  marginTop: "80px",
  paddingRight: "2rem",
  paddingLeft: "2rem",
  paddingTop: "0.5rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  boxShadow: "0 0 10px 0 #000",
  borderRadius: "10px",
  "@media (max-width: 576px)": {
    width: "80%",
  },
}));
