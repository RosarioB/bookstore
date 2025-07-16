import { ShoppingCartItemProps } from "@/const";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calcCartItemSum(cartItems: ShoppingCartItemProps[]) {
  const sum = cartItems.reduce((prev, item) => {
    const qty = item.quantity;
    return prev + qty;
  }, 0);
  return Math.round(sum);
}

export function roundHalf(num: number) {
  return Math.round(num * 2) / 2;
}

export function currencyFormat(num: number | string) {
  return parseFloat(`${num}`)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function upperCaseEachWord(str: string) {
  return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}

export function roundAt2DecimalPlaces(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function calcCartItemTotalPrice(cartItems: ShoppingCartItemProps[]) {
  const sum = cartItems.reduce((prev, item) => {
    const qty = item.quantity;
    const unitPrice = item.price;
    const total = qty * unitPrice;
    return prev + total;
  }, 0);
  return roundAt2DecimalPlaces(sum);
}

export function checkIsValidInteger(str: string) {
  return /^[0-9]+$/.test(str);
}