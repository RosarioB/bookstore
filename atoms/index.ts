import { atom } from "jotai";

import { ShoppingCartItemProps, PAGE_SIZE } from "@/const";
import { fetchBooks } from "@/lib/http";

export const homePageBookSumState = atom(0);

export const shoppingCartState = atom<ShoppingCartItemProps[]>([]);

export const bookTypeListState = atom<string[]>([]);

export const homePageQueryState = atom({ page: 1, type: "", sort: "", size: PAGE_SIZE });

export const bookDetailsIdState = atom("");

export const currentUserIdState = atom("1");

export const homePageQuery = atom(async (get) => {
  const { page, size, type, sort } = get(homePageQueryState);
  const response = await fetchBooks({ page, size, type, sort })
  return response;
});