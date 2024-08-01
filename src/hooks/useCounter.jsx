import { useState } from "react";

export const useCounter = (initialValue = 1, maxValue) => {
  const [counter, setCounter] = useState(initialValue);

  const increment = (value = 1) => {
    if (maxValue && counter === maxValue) return;
    setCounter(counter + value);
  };
  const decrement = (value = 1) => {
    if (counter === 1) return;
    setCounter(counter - value);
  };
  const reset = () => {
    setCounter(10);
  };

  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
