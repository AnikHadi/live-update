import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isValidPassword(password) {
  const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return pattern.test(password);
}

export const LowerCase = /^[a-z]+$/;
export const upperCase = /^[A-Z]+$/;

export const number = /^[0-9]+$/;

export const specialChar = /^[^A-Za-z0-9]+$/;
