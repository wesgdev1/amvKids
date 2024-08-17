import { Image } from "react-bootstrap";
import { BackgroundGradient } from "../products/ProductCard";
import { ShoeCard } from "./ShoeCard";
import { useModels } from "../../domain/models/useModels";
import { ShoeCardAnimated } from "./ShoeCardAnimated";

export const ShoesPrincipal = () => {
  const { data, loading, error } = useModels();

  // solo tomo 3 elementos de data
  const dataToShow = data?.slice(0, 3);

  return (
    <div className=" pt-5 pb-10">
      <h1 className="text-center pt-8 ">Nuestras recomendaciones</h1>

      <div className="flex flex-row gap-5 justify-center flex-wrap pt-5 ">
        {dataToShow?.map((model) => (
          <ShoeCardAnimated key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
};
