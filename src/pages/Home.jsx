import { Footer } from "../components/footer/Footer";
import { Carrousel } from "../components/home/Carrousel";
import { ShoesPrincipal } from "../components/home/ShoesPrincipal";

export const Home = () => {
  return (
    <>
      <Carrousel />
      <ShoesPrincipal />
      <Footer></Footer>
    </>
  );
};
