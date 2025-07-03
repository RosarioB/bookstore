import { useAtom } from "jotai";

import ShoopingItemCard from "./ShoppingItemCard";
import { homePageBookSumState, homePageQuery } from "@/atoms";
import { loadable } from "jotai/utils";
import { BookProps } from "@/const";

export interface BookListProps {
  page: number;
  pageSize: number;
}

export default function BookList(props: BookListProps) {
  const { page, pageSize } = props;
  const [bookListLoadable] = useAtom(loadable(homePageQuery));
  const [homePageBookSum, setHomePageBookSum] = useAtom(homePageBookSumState);
  console.log("bookListLoadable", bookListLoadable);
  switch (bookListLoadable.state) {
    case "hasData":
      setHomePageBookSum(bookListLoadable.data.total);
      return (
        <>
          {!!homePageBookSum && (
            <div className="text-sm text-gray-500 pb-4">{`${
              pageSize * (page - 1) + 1
            } ~ ${
              pageSize * page > homePageBookSum
                ? homePageBookSum
                : pageSize * page
            } of over ${homePageBookSum} results`}</div>
          )}
          <div className="grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {bookListLoadable.data?.content?.map((book: BookProps) => (
              <ShoopingItemCard key={book._id} {...book} />
            ))}
          </div>
        </>
      );
    case "loading":
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      );
    case "hasError":
      throw bookListLoadable.error;
  }
}
