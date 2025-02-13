/* eslint-disable react/prop-types */

import { createContext, useReducer, useContext } from "react";

export const CartContext = createContext();

const initialState = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    return cart;
  } else {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  const store = {
    state,
    dispatch,
  };
  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
};

const reducer = (state, action) => {
  const updateStorage = (state) => {
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(state));
  };

  switch (action.type) {
    case "ADD_TO_CART": {
      // si es el mismo elemento pero tiene tallas diferentes crea un nuevo objeto si no suma la cantidad, y si es totalmente diferente lo agrega al carrito
      // crea un nuevo objeto con la talla y la cantidad
      const { item, quantity, size } = action.payload;
      const index = state.findIndex((i) => i.id === item.id && i.size === size);
      if (index === -1) {
        const newItem = { ...item, quantity, size };
        const newState = [...state, newItem];
        updateStorage(newState);
        return newState;
      }
      const newState = state.map((i) => {
        if (i.id === item.id && i.size === size) {
          return { ...i, quantity: i.quantity + quantity };
        }
        return i;
      });
      updateStorage(newState);
      return newState;
    }

    case "DELETE": {
      const { aux: model } = action.payload;

      const newState = state.filter(
        (element) => !(element.id === model.id && element.size === model.size)
      );
      updateStorage(newState);
      return newState;
    }

    case "DELETE_ONE": {
      const { aux: model } = action.payload;
      const newState = state
        .map((element) => {
          if (element.id === model.id && element.size === model.size) {
            if (element.quantity === 1) {
              return null;
            }
            return { ...element, quantity: element.quantity - 1 };
          }
          return element;
        })
        .filter((element) => element !== null);
      updateStorage(newState);
      return newState;
    }

    case "DELETE_ALL": {
      const newState = [];
      updateStorage(newState);
      return newState;
    }
  }
};
export const useCart = () => {
  const store = useContext(CartContext);
  if (!store) {
    throw new Error("No se ha encontrado el Conexto");
  }

  return store;
};
