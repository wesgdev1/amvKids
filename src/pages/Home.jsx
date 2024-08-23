import { ButtonWhatsapp } from "../components/home/ButtonWhatsapp";
import { ButtonWhatsappAmv } from "../components/home/ButtonWhatsappAmv";
import { Carrousel } from "../components/home/Carrousel";
import { ShoesPrincipal } from "../components/home/ShoesPrincipal";

export const Home = () => {
  return (
    <>
      <Carrousel />
      <ShoesPrincipal />
      <ButtonWhatsapp />
      <ButtonWhatsappAmv />
    </>
  );
};
