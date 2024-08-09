import { NUMBERS_RANGE } from "../constants";

export const generateNumber = (currentNumberLength) => {
  const max = NUMBERS_RANGE[currentNumberLength].max;
  const min = NUMBERS_RANGE[currentNumberLength].min;

  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  return number;
};