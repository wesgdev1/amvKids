/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { BackgroundGradient } from "../products/ProductCard";
import { Image } from "react-bootstrap";

export const ShoeCardAnimated = ({ model }) => {
  const navigate = useNavigate();

  return (
    <BackgroundGradient className="rounded-[12px] h-100 max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <Image
        src={model.images[0]?.url || "https://via.placeholder.com/150"}
        alt="shoes"
        height="400"
        width="400"
        className="object-contain"
        rounded
      />
      <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
        {model.name}
      </p>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 h-28">
        {model.description}
      </p>

      <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800 ">
        <span
          onClick={() => {
            navigate(`/productos/${model.id}`);
          }}
        >
          Ver detalles
        </span>
        <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
          {model.price} COP
        </span>
      </button>
    </BackgroundGradient>
  );
};
