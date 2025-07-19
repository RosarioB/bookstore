"use client";

import { useState } from "react";
import Image from "next/image";
import { PlusIcon, MinusIcon, TrashIcon, Loader2Icon } from "lucide-react";
import { shoppingCartState, currentUserIdState, homePageQuery } from "@/atoms";

import { ShoppingCartItem } from "@/const";
import {
  currencyFormat,
  calcCartItemTotalPrice,
  upperCaseEachWord,
} from "@/lib/utils";
import { buyBook } from "@/lib/http";
import { useAtom } from "jotai";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ShoppingCartListItemProps {
  item: ShoppingCartItem;
}

export default function ShoppingCartListItem(props: ShoppingCartListItemProps) {
  const {
    item: { _id, title, author, category, price, quantity, stock, imageSrc },
  } = props;

  const [loading, setLoading] = useState(false);
  const [, setShoppingCart] = useAtom(shoppingCartState);
  const [currentUserId] = useAtom(currentUserIdState);
  const [, refreshHomePageQuery] = useAtom(homePageQuery);

  function handleAddQty() {
    setShoppingCart((oldShoppingCart) => {
      return oldShoppingCart.reduce<ShoppingCartItem[]>((prev, item) => {
        if (item._id === _id) {
          prev.push({
            ...item,
            quantity: quantity + 1,
          });
        } else {
          prev.push(item);
        }
        return prev;
      }, []);
    });
  }

  function handleRemoveQty() {
    setShoppingCart((oldShoppingCart) => {
      return oldShoppingCart.reduce<ShoppingCartItem[]>((prev, item) => {
        if (item._id === _id) {
          prev.push({
            ...item,
            quantity: quantity - 1,
          });
        } else {
          prev.push(item);
        }
        return prev;
      }, []);
    });
  }

  function deleteItem() {
    setShoppingCart((oldShoppingCart) => {
      return [...oldShoppingCart.filter((i) => i._id !== _id)];
    });
  }

  const handleBuyClick = async () => {
    setLoading(true);
    const response = await buyBook(_id, {
      userId: currentUserId,
      quantity,
    });
    if (response.error) {
      toast.error(`Error: ${response.error}.`);
      setLoading(false);
      return;
    }
    refreshHomePageQuery();
    toast.success(`${response.content?.message}`);
    setLoading(false);
    setShoppingCart((oldShoppingCart) => {
      return oldShoppingCart.filter((i) => i._id !== _id);
    });
  };

  return (
    <section aria-label="Cart item">
      <Card className="shadow-xl py-0 border-none text-foreground">
        <CardContent className="md:pl-0 px-0">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <figure className="md:shrink-0">
              <Image
                src={imageSrc}
                alt={title}
                width={150}
                height={225}
                className="h-48 w-full rounded-t-lg md:rounded-l-lg md:rounded-r-none object-cover md:h-full md:w-full"
              />
            </figure>

            {/* Content Section */}
            <div className="flex-1 space-y-1 p-8">
              {/* Book Information */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-lg font-bold">Title:</span>
                  <span>{title}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-lg font-bold">Author:</span>
                  <span>{author}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-lg font-bold">Category:</span>
                  <span>{upperCaseEachWord(category)}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-lg font-bold">Price:</span>
                  <span>${currencyFormat(price)}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-lg font-bold">In stock:</span>
                  <span>{stock}</span>
                </div>
              </div>

              {/* Quantity and Price Section */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                {/* Quantity Controls */}
                <div className="flex items-center">
                  <Button
                    size="sm"
                    disabled={quantity >= stock}
                    onClick={handleAddQty}
                    className="rounded-r-none border-none"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    value={quantity}
                    disabled
                    className="w-16 h-8 text-center font-bold border-none bg-gray-200 rounded-none text-black"
                  />
                  <Button
                    size="sm"
                    disabled={quantity <= 1}
                    onClick={handleRemoveQty}
                    className="rounded-l-none border-l"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                </div>

                {/* Total Price */}
                <div className="font-bold text-lg">
                  <span className="mr-1">
                    {quantity === 1
                      ? `(${quantity} item) $`
                      : `(${quantity} items) $`}
                  </span>
                  {calcCartItemTotalPrice([props.item])}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={deleteItem}
                  className="flex items-center gap-2"
                >
                  <TrashIcon className="h-4 w-4" />
                  DELETE
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBuyClick}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading && <Loader2Icon className="animate-spin" />}
                  PROCEED TO PURCHASE
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
