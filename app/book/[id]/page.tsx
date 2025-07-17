"use client";

import BookReviewsSection from "@/components/BookDetails/book-reviews-section";
import CommonLayout from "@/components/Layout";
import { bookDetailsIdState, bookInfoQueryLoadable } from "@/atoms";
import { useParams } from "next/navigation";

import BookInfoSection from "@/components/BookDetails/book-info-section";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Book } from "@/const";
import SkeletonBookInfoSection from "@/components/Skeleton/skeleton-book-info-section";
import SkeletonBookReviewSection from "@/components/Skeleton/skeleton-book-review-section";

export default function BookPage() {
  const { id } = useParams<{ id: string }>();

  const [, setBookDetailsId] = useAtom(bookDetailsIdState);
  const [bookDetailsLodable] = useAtom(bookInfoQueryLoadable);

  useEffect(() => {
    id && setBookDetailsId(id);
  }, [id, setBookDetailsId]);

  const renderContent = () => {
    switch (bookDetailsLodable.state) {
      case "hasData":
        const book = bookDetailsLodable?.data?.content?.data as Book;
        return (
          <>
            <BookInfoSection book={book} />
            <BookReviewsSection book={book} />
          </>
        );
      case "loading":
        return (
          <>
            <SkeletonBookInfoSection />
            <SkeletonBookReviewSection />
          </>
        );
      case "hasError":
        throw bookDetailsLodable.error;
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
}
