/* eslint-disable react/prop-types */

import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

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
      const { item, quantity } = action.payload;
      const index = state.findIndex((i) => i.id === item.id);
      if (index === -1) {
        const newItem = { ...item, quantity };
        const newState = [...state, newItem];
        updateStorage(newState);
        return newState;
      }
      const newState = state.map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity + quantity };
        }
        return i;
      });
      updateStorage(newState);
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
