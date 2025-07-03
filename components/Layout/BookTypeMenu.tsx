import { useAtom } from "jotai";
import clsx from "clsx";
import { BOOK_TYPES } from "@/lib/utils";
import { homePageQueryState } from "@/atoms";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function BookTypeMenu() {
  const bookTypeList = BOOK_TYPES;
  const [homePageQueryData, setHomePageQueryData] = useAtom(homePageQueryState);

  return (
    <>
      <DropdownMenuLabel>Book Type</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {bookTypeList.map((bookType) => (
        <DropdownMenuItem
          key={bookType}
          onClick={() => {
            setHomePageQueryData({
              ...homePageQueryData,
              page: 1,
              type: bookType,
            });
          }}
          className={clsx({
            "bg-accent": homePageQueryData.type === bookType,
          })}
        >
          {bookType}
        </DropdownMenuItem>
      ))}
    </>
  );
}
