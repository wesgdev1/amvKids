import { ShoeCard } from "./ShoeCard";

export const ShoesPrincipal = () => {
  return (
    <>
      <h1 className="text-center pt-8 ">Nuestras recomendaciones</h1>
      <div className="m-8 d-flex gap-4 flex-wrap justify-content-center aligns-items-center pt-8">
        <ShoeCard />
        <ShoeCard />
        <ShoeCard />
        <ShoeCard />
        <ShoeCard />
      </div>
    </>
  );
};
