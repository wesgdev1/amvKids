import { Image } from "react-bootstrap";
import { BackgroundGradient } from "../products/ProductCard";
import { ShoeCard } from "./ShoeCard";

export const ShoesPrincipal = () => {
  return (
    <>
      <h1 className="text-center pt-8 ">Nuestras recomendaciones</h1>
      <div className="m-8 d-flex gap-4 flex-wrap justify-content-center aligns-items-center pt-8">
        {/* <ShoeCard />
        <ShoeCard />
        <ShoeCard />
        <ShoeCard />
        <ShoeCard /> */}
      </div>
      <div className="mx-4 d-flex gap-5 justify-center ">
        <BackgroundGradient className="rounded-[22px]  max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <Image
            src={
              "https://res.cloudinary.com/dppqkypts/image/upload/v1709309601/Dise%C3%B1o_sin_t%C3%ADtulo_32_xuo2rc.png"
            }
            alt="jordans"
            height="400"
            width="400"
            className="object-contain"
            rounded
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Air Jordan 4 Retro Reimagined
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
            February 17, 2024. Your best opportunity to get these right now is
            by entering raffles and waiting for the official releases.
          </p>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span>Buy now </span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              $100
            </span>
          </button>
        </BackgroundGradient>
        <BackgroundGradient className="rounded-[22px]  max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <Image
            src={
              "https://res.cloudinary.com/dppqkypts/image/upload/v1709309601/Dise%C3%B1o_sin_t%C3%ADtulo_32_xuo2rc.png"
            }
            alt="jordans"
            height="400"
            width="400"
            className="object-contain"
            rounded
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Air Jordan 4 Retro Reimagined
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
            February 17, 2024. Your best opportunity to get these right now is
            by entering raffles and waiting for the official releases.
          </p>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span>Buy now </span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              $100
            </span>
          </button>
        </BackgroundGradient>
        <BackgroundGradient className="rounded-[22px]  max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <Image
            src={
              "https://res.cloudinary.com/dppqkypts/image/upload/v1709309601/Dise%C3%B1o_sin_t%C3%ADtulo_32_xuo2rc.png"
            }
            alt="jordans"
            height="400"
            width="400"
            className="object-contain"
            rounded
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Air Jordan 4 Retro Reimagined
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
            February 17, 2024. Your best opportunity to get these right now is
            by entering raffles and waiting for the official releases.
          </p>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span>Buy now </span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              $100
            </span>
          </button>
        </BackgroundGradient>
      </div>
    </>
  );
};
