import { Carousel } from "react-bootstrap";

export const Carrousel = () => {
  return (
    <Carousel className="pb-2">
      <Carousel.Item>
        <img
          style={{ width: "100%" }}
          className="d-block w-100"
          src="https://res.cloudinary.com/dppqkypts/image/upload/v1709157590/Dise%C3%B1o_sin_t%C3%ADtulo_30_vycs0b.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ width: "10%" }}
          className="d-block w-100"
          src="https://res.cloudinary.com/dppqkypts/image/upload/v1709174327/Copia_de_Dise%C3%B1o_sin_t%C3%ADtulo_dhhfpo.png"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};
