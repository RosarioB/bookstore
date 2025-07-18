import { atom } from "jotai";

import { ShoppingCartItem, PAGE_SIZE } from "@/const";
import { fetchBookDetailsById, fetchBooks } from "@/lib/http";
import { atomWithRefresh, loadable } from "jotai/utils";

export const shoppingCartState = atom<ShoppingCartItem[]>([]);

export const bookTypeListState = atom<string[]>([]);

export const homePageQueryState = atom({ page: 1, category: "", sort: "", size: PAGE_SIZE });

export const bookDetailsIdState = atom("");

export const currentUserIdState = atom("1");

export const homePageQuery = atomWithRefresh(async (get) => {
  const { page, size, category, sort } = get(homePageQueryState);
  const response = await fetchBooks({ page, size, category, sort })
  return response;
});

export const homePageQueryLoadable = loadable(homePageQuery);

export const homePageBookSumState = atom((get) => {
  const res = get(homePageQueryLoadable);
  return res.state === "hasData" ? res.data.total : 0;
});

export const bookInfoQuery = atomWithRefresh(async (get) => {
  const bookID = get(bookDetailsIdState);
  const response = await fetchBookDetailsById(bookID);
  if (response.error) {
    throw response.error;
  }
  return response;
});

export const bookInfoQueryLoadable = loadable(bookInfoQuery);