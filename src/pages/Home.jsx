import { ButtonWhatsapp } from "../components/home/ButtonWhatsapp";
import { ButtonWhatsappAmv } from "../components/home/ButtonWhatsappAmv";
import { Carrousel } from "../components/home/Carrousel";
import { ShoesPrincipal } from "../components/home/ShoesPrincipal";
import Hero from "../componentsCarousell/Hero";

export const Home = () => {
  return (
    <>
      <Carrousel />
      {/* <ShoesPrincipal /> */}
      <Hero />
      <ButtonWhatsapp />
      <ButtonWhatsappAmv />
    </>
  );
};
