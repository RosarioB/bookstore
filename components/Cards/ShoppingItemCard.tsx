import Link from "next/link";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { ShoppingCartIcon } from "lucide-react";
import { useAtom } from "jotai";
import { shoppingCartState } from "@/atoms";

import { BookProps } from "@/const";
import { currencyFormat } from "@/lib/utils";
import StarRating from "../Rating/StarRating";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ShoopingItemCard(props: BookProps) {
  const { _id, category, title, author, rating, price, imageSrc, stock } =
    props;
  const [shoppingCart, setShoppingCart] = useAtom(shoppingCartState);

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
    <Card className="w-full max-w-sm">
      <div className="relative">
        <Image
          src={imageSrc}
          alt={title}
          width={384}
          height={240}
          className="w-full h-60 object-cover rounded-t-xl"
        />
      </div>
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground">{category}</div>
        <h3 className="font-semibold text-lg leading-tight">{title}</h3>
        <p className="text-muted-foreground">{author}</p>
        <StarRating rating={rating} disabled />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={addItem} className="flex-1">
          ${currencyFormat(price)}
          <ShoppingCartIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/book/${_id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
