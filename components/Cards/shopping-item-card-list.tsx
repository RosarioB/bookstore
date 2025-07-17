import { useAtom } from "jotai";

import ShoppingItemCard from "./shopping-item-card";
import { homePageBookSumState, homePageQueryLoadable } from "@/atoms";
import SkeletonLayout from "../Skeleton/skeleton-shopping-item-card-list";
import { Book } from "@/const";

export interface BookListProps {
  page: number;
  pageSize: number;
}

export default function BookList(props: BookListProps) {
  const { page, pageSize } = props;

  const [bookListLoadable] = useAtom(homePageQueryLoadable);
  const [homePageBookSum] = useAtom(homePageBookSumState);

  switch (bookListLoadable.state) {
    case "hasData":
      return (
        <section aria-label="Shopping item card list">
          {!!homePageBookSum && (
            <div className="text-sm text-gray-500 pb-4">{`${
              pageSize * (page - 1) + 1
            } ~ ${
              pageSize * page > homePageBookSum
                ? homePageBookSum
                : pageSize * page
            } of over ${homePageBookSum} results`}</div>
          )}
          <div className="grid grid-cols-1 gap-y-10 justify-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {bookListLoadable.data?.content?.map((book: Book) => (
              <ShoppingItemCard book={book} key={book._id} />
            ))}
          </div>
        </section>
      );
    case "loading":
      return <SkeletonLayout />;
    case "hasError":
      throw bookListLoadable.error;
  }
}
