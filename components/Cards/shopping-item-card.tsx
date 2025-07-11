import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon } from "lucide-react";
import { useAtom } from "jotai";
import { shoppingCartState } from "@/atoms";
import { toast } from "sonner";

import { BookProps } from "@/const";
import { currencyFormat, upperCaseEachWord } from "@/lib/utils";
import StarRating from "../Rating/star-rating";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ShoppingItemCard(props: BookProps) {
  const { _id, category, title, author, rating, price, imageSrc, stock } =
    props;
  const [, setShoppingCart] = useAtom(shoppingCartState);

  const addItem = () => {
    setShoppingCart((oldShoppingCart) => {
      const existingItem = oldShoppingCart.find((i) => i._id === _id);
      if (existingItem) {
        if (existingItem.quantity >= stock) {
          toast.error(`Out of stock!`);
          return [...oldShoppingCart];
        }
        const newItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        toast.success(`"${title}" was successfully added.`);
        return [...oldShoppingCart.filter((i) => i._id !== _id), newItem];
      }
      toast.success(`"${title}" was successfully added.`);
      return [
        ...oldShoppingCart,
        {
          ...props,
          quantity: 1,
        },
      ];
    });
  };

  return (
    <Card className="w-full max-w-sm p-0 gap-2 shadow-xl border-0">
      <CardHeader className="p-0">
        <Image
          src={imageSrc}
          alt={title}
          width={384}
          height={140}
          className="w-full h-35 object-cover rounded-t-xl"
        />
      </CardHeader>
      <CardContent className="space-y-2 px-4">
        <div className="text-sm text-muted-foreground">
          {upperCaseEachWord(category)}
        </div>
        <h3 className="font-semibold text-xl text-foreground">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground">{author}</p>
        <StarRating rating={rating} disabled className="mt-8" />
      </CardContent>
      <CardFooter className="flex gap-2 justify-end px-4 pb-4">
        <Button onClick={addItem} className="h-12 w-26 font-semibold">
          ${currencyFormat(price)}
          <ShoppingCartIcon className="size-6" />
        </Button>
        <Button variant="secondary" asChild className="h-12 w-28 font-semibold">
          <Link href={`/book/${_id}`}>VIEW DETAILS</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
