"use client";

import CommonLayout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { useAtom } from "jotai";
import { homePageBookSumState, homePageQueryState } from "@/atoms";
import { PAGE_SIZE } from "@/const";
import BookList from "@/components/Cards/shopping-item-card-list";

export default function HomePage() {
  const [homePageQueryData, setHomePageQueryData] = useAtom(homePageQueryState);
  const [homePageBookSum] = useAtom(homePageBookSumState);

  const handleClickPagination = (page: number) => {
    setHomePageQueryData({ ...homePageQueryData, page });
  };

  return (
    <>
      <CommonLayout hideMenu={false}>
        <BookList page={homePageQueryData?.page || 1} pageSize={PAGE_SIZE} />
        <div className="flex justify-center pt-6">
          <Pagination
            currentPage={homePageQueryData?.page || 1}
            pages={Math.ceil(homePageBookSum / PAGE_SIZE)}
            onClick={handleClickPagination}
          />
        </div>
      </CommonLayout>
    </>
  );
}
