import Asesors from "../components/Asesors";
import { ButtonWhatsapp } from "../components/home/ButtonWhatsapp";
import { ButtonWhatsappAmv } from "../components/home/ButtonWhatsappAmv";
import { Carrousel } from "../components/home/Carrousel";
import PublicationsInstagram from "../components/home/PublicationsInstagram";
import { ShoesPrincipal } from "../components/home/ShoesPrincipal";
import { Homevideo } from "../components/videos/Homevideo";
import Hero from "../componentsCarousell/Hero";

export const Home = () => {
  return (
    <>
      <Carrousel />
      {/* <ShoesPrincipal /> */}
      <Hero />
      {/* <PublicationsInstagram /> */}
      <Asesors />
      <Homevideo />
      <ButtonWhatsapp />
      <ButtonWhatsappAmv />
    </>
  );
};
