import { toast } from "sonner";

import { BookDetailProps } from "@/const";
import { currencyFormat, checkIsValidInteger } from "@/lib/utils";
import { updateBookDetails } from "@/lib/http";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export interface BookInfoDialogProps {
  data: BookDetailProps;
  onSuccess?: (data: BookDetailProps) => void;
}

export default function BookInfoDialog({ data }: BookInfoDialogProps) {
  const [isStockValid, setIsStockValid] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [stock, setStock] = useState<number>(data.stock);

  useEffect(() => {
    setStock(data.stock);
  }, [data.stock]);

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

    setIsUpdating(true);
    const res = await updateBookDetails(data._id, {
      stock: stock,
    });

    if (res.error) {
      toast.error("Error: Update book details.");
      setIsUpdating(false);
      return;
    }

    toast.success("Book details were updated.");
    res.content?.data;
    setIsUpdating(false);
  };

  const handleCancel = () => {
    setStock(data.stock);
    setIsStockValid(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Details</Button>
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
              value={data.category}
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
              value={data.title}
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
              value={data.author}
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
              value={`$ ${currencyFormat(data.price)}`}
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
              defaultValue={data.stock}
              onChange={handleUpdateStock}
              className={!isStockValid ? "border-destructive" : ""}
            />
            {!isStockValid && (
              <p className="text-xs text-destructive">Invalid stock value</p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isStockValid || isUpdating || stock === data.stock}
              className="min-w-20"
            >
              {isUpdating ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Updating...
                </div>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
