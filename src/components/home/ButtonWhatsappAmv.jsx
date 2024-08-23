import { Image } from "react-bootstrap";
import { IconStyled2 } from "./StyledComponents";

export const ButtonWhatsappAmv = () => {
  return (
    <>
      <IconStyled2
        href="https://api.whatsapp.com/send?phone=573122821189&text=Hola%2C+quiero+saber+mas+sobre+el+Internet+de+alta+de+Velocidad+de+Prolink%21"
        target="_blank"
      >
        <Image
          src="https://res.cloudinary.com/du6lyyqjh/image/upload/v1724449401/c4562bff-180a-43b6-8f25-80a900b31a1e_eyezwj.jpg"
          alt={"amv_kid_payment"}
          roundedCircle
        />
      </IconStyled2>
    </>
  );
};
