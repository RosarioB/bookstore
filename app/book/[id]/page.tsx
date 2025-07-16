"use client";

import BookReviewsSection from "@/components/BookDetails/book-reviews-section";
import CommonLayout from "@/components/Layout";
import type { NextPage, Metadata } from "next";
import { bookDetailsIdState, bookInfoQueryLoadable } from "@/atoms";
import { useParams } from "next/navigation";

import BookInfoSection from "@/components/BookDetails/book-info-section";
import { useAtom } from "jotai";
import { useEffect } from "react";

const Book: NextPage = () => {
  const { id } = useParams<{ id: string }>();

  const [, setBookDetailsId] = useAtom(bookDetailsIdState);
  const [bookDetailsLodable] = useAtom(bookInfoQueryLoadable);

  useEffect(() => {
    id && setBookDetailsId(id);
  }, [id]);

  return (
    <>
      <CommonLayout
        headerProps={{
          hideMenu: true,
        }}
      >
        <BookInfoSection bookDetailsLodable={bookDetailsLodable} />
        <BookReviewsSection bookDetailsLodable={bookDetailsLodable} />
      </CommonLayout>
    </>
  );
};

export default Book;
