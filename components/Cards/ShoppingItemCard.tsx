import Link from "next/link";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { ShoppingCartIcon } from "lucide-react";
import { useAtom } from "jotai";
import { shoppingCartState } from "@/atoms";

import { BookProps } from "@/const";
import { currencyFormat } from "@/lib/utils";
import StarRating from "../Rating/StarRating";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ShoopingItemCard(props: BookProps) {
  const { _id, category, title, author, rating, price, imageSrc, stock } =
    props;
  const [, setShoppingCart] = useAtom(shoppingCartState);

  const { enqueueSnackbar } = useSnackbar();

  const addItem = () => {
    setShoppingCart((oldShoppingCart) => {
      const existingItem = oldShoppingCart.find((i) => i._id === _id);
      if (existingItem) {
        if (existingItem.quantity >= stock) {
          enqueueSnackbar(`Out of stock!`, { variant: "error" });
          return [...oldShoppingCart];
        }
        const newItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        enqueueSnackbar(`"${title}" was successfully added.`, {
          variant: "success",
        });
        return [...oldShoppingCart.filter((i) => i._id !== _id), newItem];
      }
      enqueueSnackbar(`"${title}" was successfully added.`, {
        variant: "success",
      });
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
        <div className="text-sm text-muted-foreground">{category}</div>
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="text-sm text-muted-foreground">{author}</p>
        <StarRating rating={rating} disabled className="mt-8"/>
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
