import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NavLogo = () => {
  const navigate = useNavigate();
  return (
    <Image
      style={{ width: "50px" }}
      src="https://res.cloudinary.com/dppqkypts/image/upload/v1709156443/AMV_LOGO_1_nx3ofa.png"
      alt="logo"
      onClick={() => navigate("/")}
    />
  );
};
