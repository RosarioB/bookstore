"use client";

import Link from "next/link";
import Image from "next/image";
import { HomeIcon, BookmarkIcon } from "lucide-react";

import { Book } from "@/const";
import { currencyFormat, upperCaseEachWord } from "@/lib/utils";
import BookInfoDialog from "@/components/BookDetails/book-info-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Card, CardContent } from "../ui/card";

interface BookInfoSectionProps {
  book: Book;
}

export default function BookInfoSection({ book }: BookInfoSectionProps) {
  return (
    <>
      <nav aria-label="Breadcrumb navigation">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem className="text-foreground">
              <BreadcrumbLink
                asChild
                className="flex items-center gap-1 hover:underline"
              >
                <Link href="/">
                  <HomeIcon className="w-4 h-4" />
                  Book
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="flex items-center gap-1 text-foreground">
              <BookmarkIcon className="w-4 h-4" />
              {book.title}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <article aria-label="Book information">
        <Card className="shadow-xl border-none text-foreground">
          <CardContent className="flex flex-col lg:flex-row gap-6">
            <figure>
              <Image
                src={book.imageSrc}
                alt={`book image`}
                width={200}
                height={280}
                className="object-cover rounded-md self-center h-70 w-80"
              />
            </figure>
            <div className="flex flex-col gap-2 flex-1">
              <h1 className="text-5xl font-bold">{book.title}</h1>
              <p className="pt-6">
                <span className="text-lg font-bold pr-4">Category:</span>
                {upperCaseEachWord(book.category)}
              </p>
              <p>
                <span className="text-lg font-bold pr-4">Author:</span>
                {book.author}
              </p>
              <p>
                <span className="text-lg font-bold pr-4">Price:</span>
                {`$ ${currencyFormat(book.price)}`}
              </p>
              <p>
                <span className="text-lg font-bold pr-4">In stock:</span>
                {book.stock}
              </p>
              <BookInfoDialog book={book} />
            </div>
          </CardContent>
        </Card>
      </article>
    </>
  );
}
