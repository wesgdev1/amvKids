import { Carousel } from "react-bootstrap";
import { ButtonAction } from "./StyledComponents";
import { useNavigate } from "react-router-dom";

export const Carrousel = () => {
  // importo navigate
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/productos");
  };

  return (
    <Carousel className="pb-0 h-auto ">
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://res.cloudinary.com/dppqkypts/image/upload/v1759940088/Copia_de_Dise%C3%B1o_sin_t%C3%ADtulo_2_notzcr.png"
          alt="First slide"
        />
        {/* Boton de ver productos */}
        <ButtonAction onClick={handleClick}>Ver productos</ButtonAction>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://res.cloudinary.com/dppqkypts/image/upload/v1757367324/amv%20imagenes%20nuevas/Dise%C3%B1o_sin_t%C3%ADtulo_50_ipufmy.png"
          alt="First slide"
        />
        {/* Boton de ver productos */}
        <ButtonAction onClick={handleClick}>Ver productos</ButtonAction>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://res.cloudinary.com/dppqkypts/image/upload/v1709157590/Dise%C3%B1o_sin_t%C3%ADtulo_30_vycs0b.png"
          alt="First slide"
        />
        {/* Boton de ver productos */}
        <ButtonAction onClick={handleClick}>Ver productos</ButtonAction>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://res.cloudinary.com/dppqkypts/image/upload/v1709174327/Copia_de_Dise%C3%B1o_sin_t%C3%ADtulo_dhhfpo.png"
          alt="Second slide"
        />
        <ButtonAction onClick={handleClick}>Ver productos</ButtonAction>
      </Carousel.Item>
    </Carousel>
  );
};
