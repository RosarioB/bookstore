import { useAtom } from "jotai";
import clsx from "clsx";
import { BOOK_TYPES, SORT_VALUE } from "@/const";
import { homePageQueryState } from "@/atoms";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { upperCaseEachWord } from "@/lib/utils";

export default function BookTypeMenu() {
  const [homePageQueryData, setHomePageQueryData] = useAtom(homePageQueryState);

  return (
    <>
      <DropdownMenuLabel>Book Type</DropdownMenuLabel>
      <DropdownMenuGroup>
        {BOOK_TYPES.map((bookType) => (
          <DropdownMenuItem
            key={bookType}
            onClick={() => {
              setHomePageQueryData({
                ...homePageQueryData,
                page: 1,
                category: homePageQueryData.category === bookType ? "" : bookType,
              });
            }}
            className={clsx({
              "bg-accent": homePageQueryData.category === bookType,
            })}
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            {upperCaseEachWord(bookType)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Order By</DropdownMenuLabel>
      <DropdownMenuGroup>
        {SORT_VALUE.map((sortValue) => (
          <DropdownMenuItem
            key={sortValue}
            onClick={() => {
              setHomePageQueryData({
                ...homePageQueryData,
                page: 1,
                sort: homePageQueryData.sort === sortValue ? "" : sortValue,
              });
            }}
            className={clsx({
              "bg-accent": homePageQueryData.sort === sortValue,
            })}
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            {upperCaseEachWord(sortValue)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </>
  );
}
