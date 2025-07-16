"use client";

import BookReviewsSection from "@/components/BookDetails/book-reviews-section";
import CommonLayout from "@/components/Layout";
import type { NextPage, Metadata } from "next";
import { bookDetailsIdState, bookInfoQueryLoadable } from "@/atoms";
import { useParams } from "next/navigation";

import BookInfoSection from "@/components/BookDetails/book-info-section";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { BookProps } from "@/const";

const Book: NextPage = () => {
  const { id } = useParams<{ id: string }>();

  const [, setBookDetailsId] = useAtom(bookDetailsIdState);
  const [bookDetailsLodable] = useAtom(bookInfoQueryLoadable);

  useEffect(() => {
    id && setBookDetailsId(id);
  }, [id, setBookDetailsId]);

  const renderContent = () => {
    switch (bookDetailsLodable.state) {
      case "hasData":
        const data = bookDetailsLodable.data.content.data as BookProps;
        return (
          <>
            <BookInfoSection {...data} />
            <BookReviewsSection {...data} />
          </>
        );
      case "loading":
        return (
          <>
            <div className="flex items-center justify-center">
              <span className="loading loading-bars loading-lg"></span>
            </div>
            <div className='flex items-center justify-center mt-6'>
              <span className='loading loading-bars loading-lg'></span>
            </div>
          </>
        );
      case "hasError":
        throw bookDetailsLodable.error;
      default:
        return null;
    }
  };

  return (
    <CommonLayout
      headerProps={{
        hideMenu: true,
      }}
    >
      {renderContent()}
    </CommonLayout>
  );
};

export default Book;


