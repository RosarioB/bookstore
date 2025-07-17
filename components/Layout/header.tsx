"use client";

import Link from "next/link";
import { AlignJustifyIcon, ShoppingCartIcon, BookOpenIcon } from "lucide-react";
import { useAtom } from "jotai";
import { shoppingCartState } from "@/atoms";
import { calcCartItemSum } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BookTypeMenu from "@/components/Layout/book-type-menu";

export interface HeaderProps {
  hideMenu?: boolean;
}

export default function Header(props: HeaderProps) {
  const { hideMenu } = props;
  const [shoppingCart] = useAtom(shoppingCartState);

  return (
    <header className="mx-auto max-w-7xl mt-4">
      <nav className="bg-card rounded-xl shadow-xl px-4 py-3" aria-label="Header navigation">
        <div className="flex items-center justify-between">
          {/* Left side - Menu */}
          <div className="flex items-center">
            {!hideMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <AlignJustifyIcon className="size-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <BookTypeMenu />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Center - Logo */}
          <div className="flex items-center">
            <Button variant="ghost" size="lg">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-semibold"
              >
                <BookOpenIcon className="size-6" />
                Bookstore
              </Link>
            </Button>
          </div>

          {/* Right side - Cart */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <div className="relative">
                  <ShoppingCartIcon className="size-6" />
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {calcCartItemSum(shoppingCart)}
                  </Badge>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
