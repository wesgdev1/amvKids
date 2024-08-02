import { useEffect, useState } from "react";

export const useCounter = (initialValue = 1, maxValue) => {
  const [counter, setCounter] = useState(initialValue);
  const [max, setMax] = useState(maxValue);

  useEffect(() => {
    setMax(maxValue);
  }, [maxValue]);

  const increment = (value = 1) => {
    if (counter === max) return;
    setCounter(counter + value);
  };
  const decrement = (value = 1) => {
    if (counter === 1) return;
    setCounter(counter - value);
  };
  const reset = () => {
    setCounter(1);
  };

  return {
    counter,
    increment,
    decrement,
    reset,
    setMax,
  };
};
