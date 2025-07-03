"use client";

import CommonLayout from "@/components/Layout";
import { Suspense } from "react";
import Pagination from "@/components/Pagination";
import { useAtom } from "jotai";
import { homePageBookSumState, homePageQueryState } from "@/atoms";
import { PAGE_SIZE } from "@/const";
import dynamic from "next/dynamic";

const BookList = dynamic(
  import("@/components/Cards/ShoppingItemCardList"),
  { ssr: false }
);

export default function Home() {
  const [homePageQueryData, setHomePageQueryData] = useAtom(homePageQueryState);
  const [homePageBookSum] = useAtom(homePageBookSumState);

  const handleClickPagination = (page: number) => {
    setHomePageQueryData({ ...homePageQueryData, page });
  };

  return (
    <>
      <CommonLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <BookList page={homePageQueryData?.page || 1} pageSize={PAGE_SIZE} />
        </Suspense>
        <div className="flex justify-center pt-6">
          <Pagination
            currentPage={homePageQueryData?.page || 1}
            pages={Math.round(homePageBookSum / PAGE_SIZE)}
            onClick={handleClickPagination}
          />
        </div>
      </CommonLayout>
    </>
  );
}
