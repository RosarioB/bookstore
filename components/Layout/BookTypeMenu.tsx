import { useAtom } from "jotai";

import clsx from "clsx";
import { BOOK_TYPES } from "@/lib/utils";
import { homePageQueryState } from "@/atoms";

export default function BookTypeMenu() {
  const bookTypeList = BOOK_TYPES;
  const [homePageQueryData, setHomePageQueryData] = useAtom(homePageQueryState);

  return (
    <>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <div className="menu-title">Book Type</div>
          <ul>
            {bookTypeList.map((bookType) => (
              <li
                key={bookType}
                onClick={() => {
                  setHomePageQueryData({
                    ...homePageQueryData,
                    page: 1,
                    type: bookType,
                  });
                }}
              >
                <span
                  className={clsx({
                    active: homePageQueryData.type === bookType,
                  })}
                >
                  {bookType}
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
