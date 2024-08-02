import { useContext } from "react";
import { CartContext } from "../store";

export const useCart = () => {
  const store = useContext(CartContext);
  if (!store) {
    throw new Error("No se ha encontrado el Contexto");
  }

  return store;
};
