import Asesors from "../components/Asesors";
import { ButtonWhatsapp } from "../components/home/ButtonWhatsapp";
import { ButtonWhatsappAmv } from "../components/home/ButtonWhatsappAmv";
import { Carrousel } from "../components/home/Carrousel";
import PublicationsInstagram from "../components/home/PublicationsInstagram";
import { ShoesPrincipal } from "../components/home/ShoesPrincipal";
import { Homevideo } from "../components/videos/Homevideo";
import Hero from "../componentsCarousell/Hero";
import { N8nChat } from "../components/chat/N8nChat";
import Brands from "../components/Brands";

export const Home = () => {
  return (
    <>
      <Carrousel />
      {/* <ShoesPrincipal /> */}
      <Brands />
      <Hero />
      {/* <PublicationsInstagram /> */}

      <Asesors />
      <Homevideo />
      <ButtonWhatsapp />
      {/* <ButtonWhatsappAmv /> */}
      {/* <N8nChat /> */}
    </>
  );
};
