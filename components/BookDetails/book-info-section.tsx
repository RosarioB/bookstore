"use client";

import Link from "next/link";
import Image from "next/image";
import { HomeIcon, BookmarkIcon } from "lucide-react";

import { BookDetailProps } from "@/const";
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

export default function BookInfoSection(props: BookDetailProps) {
  const data = props;
  
  return (
    <>
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem className="text-foreground">
            <BreadcrumbLink asChild className="flex items-center gap-1 hover:underline">
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Book
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="flex items-center gap-1 text-foreground">
            <BookmarkIcon className="w-4 h-4" />
            {data.title}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="shadow-xl border-none text-foreground">
        <CardContent className="flex flex-col lg:flex-row gap-6">
          <Image
            src={data.imageSrc}
            alt={`book image`}
            width={200}
            height={280}
            className="object-cover rounded-md self-center h-60 w-80"
          />
          <div className="flex flex-col gap-2 flex-1">
            <h1 className="text-5xl font-bold">{data.title}</h1>
            <p className="pt-6">
              <span className="text-lg font-bold pr-4">Category:</span>
              {upperCaseEachWord(data.category)}
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
            {data && <BookInfoDialog data={data} />}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
