"use client";

import NextLink from "next/link";
import Image from "next/image";
import { HomeIcon, BookmarkIcon } from "lucide-react";

import { BookDetailProps } from "@/const";
import { currencyFormat } from "@/lib/utils";
import BookInfoDialog from "@/components/BookDetails/book-info-dialog";
import { Loadable } from "jotai/vanilla/utils/loadable";

interface BookInfoSectionProps {
  bookDetailsLodable: Loadable<Promise<{
    content: { data: BookDetailProps };
    error?: any;
  }>>;
}

export default function BookInfoSection({ bookDetailsLodable }: BookInfoSectionProps) {
  
  switch (bookDetailsLodable.state) {
    case "hasData":
      const data = bookDetailsLodable.data.content.data;
      
      return (
        <>
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <NextLink href="/">
                  <HomeIcon className="w-4 h-4" />
                  Book
                </NextLink>
              </li>
              <li>
                <BookmarkIcon className="w-4 h-4" />
                {data.title}
              </li>
            </ul>
          </div>

          <div className="hero h-auto justify-start shadow-xl rounded-box">
            <div className="hero-content flex-col lg:flex-row">
              <Image
                src={data.imageSrc}
                alt={`book image`}
                width={200}
                height={280}
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-5xl font-bold">{data.title}</h1>
                <p className="pt-6">
                  <span className="text-lg font-bold pr-4">Category:</span>
                  {data.category}
                </p>
                <p>
                  <span className="text-lg font-bold pr-4">Author:</span>
                  {data.author}
                </p>
                <p>
                  <span className="text-lg font-bold pr-4">Price:</span>
                  {`$ ${currencyFormat(data.price)}`}
                </p>
                <p>
                  <span className="text-lg font-bold pr-4">In stock:</span>
                  {data.stock}
                </p>

                {data && (
                  <BookInfoDialog data={data} />
                )}
              </div>
            </div>
          </div>
        </>
      );
    case "loading":
      return (
        <>
          <div className="flex items-center justify-center">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        </>
      );
    case "hasError":
      throw bookDetailsLodable.error;
  }
}
