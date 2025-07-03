import Link from "next/link";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { ShoppingCartIcon } from "lucide-react";
import { useAtom } from "jotai";
import { shoppingCartState } from "@/atoms";

import { BookProps } from "@/const";
import { currencyFormat } from "@/lib/utils";
import StarRating from "../Rating/StarRating";

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
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <Image src={imageSrc} alt={title} width={384} height={140} />
      </figure>
      <div className="card-body">
        <div className="text-sm text-slate-500"> {category}</div>
        <h2 className="card-title">{title}</h2>
        <p className="font-medium text-slate-500">{author}</p>
        <StarRating rating={rating} disabled />
        <div className="card-actions justify-end">
          <button className="btn" onClick={addItem}>
            ${currencyFormat(price)}
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
          <Link href={`/book/${_id}`} className="btn btn-info">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
