import { Image } from "react-bootstrap";
import { IconStyled2 } from "./StyledComponents";

export const ButtonWhatsappAmv = () => {
  return (
    <>
      <IconStyled2
        href="https://api.whatsapp.com/send?phone=573123460008&text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20web%20https%3A%2F%2Famvkids.com.co%2F%20y%20me%20gustar%C3%ADa%20saber%20informaci%C3%B3n%20de%20sus%20productos."
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
