/* eslint-disable react/prop-types */

import { createContext, useReducer, useContext, useEffect } from "react";

export const CartCurveContext = createContext();

const initialState = () => {
  try {
    const cart = localStorage.getItem("cartCurvas");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error al parsear cartCurvas desde localStorage:", error);
    localStorage.removeItem("cartCurvas");
    return [];
  }
};

export const CartCurvasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    try {
      localStorage.setItem("cartCurvas", JSON.stringify(state));
    } catch (error) {
      console.error("Error al guardar cartCurvas en localStorage:", error);
    }
  }, [state]);

  const storeCurve = {
    state,
    dispatch,
  };
  return (
    <CartCurveContext.Provider value={storeCurve}>
      {children}
    </CartCurveContext.Provider>
  );
};

const getCurveIdentifier = (item) => `${item.id}-${item.tipoCurva}`;

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { item, quantity } = action.payload;
      const itemIdentifier = getCurveIdentifier(item);

      const existingItemIndex = state.findIndex(
        (cartItem) => getCurveIdentifier(cartItem) === itemIdentifier
      );

      if (existingItemIndex !== -1) {
        const newState = [...state];
        newState[existingItemIndex] = {
          ...newState[existingItemIndex],
          quantity: newState[existingItemIndex].quantity + quantity,
        };
        return newState;
      } else {
        const newItem = { ...item, quantity };
        return [...state, newItem];
      }
    }

    case "DELETE": {
      const { item } = action.payload;
      const itemIdentifier = getCurveIdentifier(item);
      return state.filter(
        (cartItem) => getCurveIdentifier(cartItem) !== itemIdentifier
      );
    }

    case "DELETE_ONE": {
      const { item } = action.payload;
      const itemIdentifier = getCurveIdentifier(item);

      const existingItemIndex = state.findIndex(
        (cartItem) => getCurveIdentifier(cartItem) === itemIdentifier
      );

      if (existingItemIndex !== -1) {
        const newState = [...state];
        const currentQuantity = newState[existingItemIndex].quantity;

        if (currentQuantity > 1) {
          newState[existingItemIndex] = {
            ...newState[existingItemIndex],
            quantity: currentQuantity - 1,
          };
          return newState;
        } else {
          return state.filter(
            (cartItem) => getCurveIdentifier(cartItem) !== itemIdentifier
          );
        }
      }
      return state;
    }

    case "DELETE_ALL": {
      return [];
    }
    default:
      return state;
  }
};

export const useCartCurvas = () => {
  const storeCurve = useContext(CartCurveContext);
  if (!storeCurve) {
    throw new Error(
      "useCartCurvas debe ser usado dentro de un CartCurvasProvider"
    );
  }
  return storeCurve;
};
