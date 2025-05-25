import { clsx, type ClassValue } from "clsx";
import Decimal from "decimal.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const roundNumber = (input: number, precision: number = 2): number => {
  return parseFloat(new Decimal(input).toFixed(precision));
};
