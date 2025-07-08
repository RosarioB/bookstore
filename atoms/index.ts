import { atom } from "jotai";

import { ShoppingCartItemProps, PAGE_SIZE } from "@/const";
import { fetchBooks } from "@/lib/http";

export const homePageBookSumState = atom(0);

export const shoppingCartState = atom<ShoppingCartItemProps[]>([]);

export const bookTypeListState = atom<string[]>([]);

export const homePageQueryState = atom({ page: 1, category: "", sort: "", size: PAGE_SIZE });

export const bookDetailsIdState = atom("");

export const currentUserIdState = atom("1");

export const homePageQuery = atom(async (get) => {
  const { page, size, category, sort } = get(homePageQueryState);
  const response = await fetchBooks({ page, size, category, sort })
  return response;
});