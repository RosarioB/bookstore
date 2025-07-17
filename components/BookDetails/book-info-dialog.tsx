import { toast } from "sonner";

import { Book, BookDetail } from "@/const";
import { currencyFormat, checkIsValidInteger } from "@/lib/utils";
import { updateBookDetails } from "@/lib/http";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";

export interface BookInfoDialogProps {
  book: BookDetail;
}

export default function BookInfoDialog({ book }: BookInfoDialogProps) {
  const [isStockValid, setIsStockValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [stock, setStock] = useState<number>(book.stock);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setStock(book.stock);
  }, [book.stock]);

  const handleUpdateStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    try {
      const isValid = checkIsValidInteger(value);
      if (isValid) {
        setIsStockValid(true);
        setStock(parseInt(value));
      } else {
        throw new Error("Invalid stock value");
      }
    } catch (error) {
      setIsStockValid(false);
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    const res = await updateBookDetails(book._id, {
      stock: stock,
    });

    if (res.error) {
      toast.error("Error: Update book details.");
      setLoading(false);
      setOpen(false);
      return;
    }

    toast.success("Book details were updated.");
    res.content?.data;
    setLoading(false);
    setOpen(false);
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-32 h-12 font-semibold">
          EDIT DETAILS
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Book Details</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Book Type
            </label>
            <Input
              type="text"
              value={book.category}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Book Title
            </label>
            <Input
              type="text"
              value={book.title}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Author
            </label>
            <Input
              type="text"
              value={book.author}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Price
            </label>
            <Input
              type="text"
              value={`$ ${currencyFormat(book.price)}`}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Stock
            </label>
            <Input
              type="text"
              defaultValue={book.stock}
              onChange={handleUpdateStock}
              className={!isStockValid ? "border-destructive" : ""}
            />
            {!isStockValid && (
              <p className="text-xs text-destructive">Invalid stock value</p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="secondary"
              disabled={!isStockValid || loading || stock === book.stock}
              className="min-w-20"
            >
              {loading && <Loader2Icon className="animate-spin" />}
              UPDATE
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
