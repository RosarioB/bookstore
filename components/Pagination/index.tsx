import { Button } from "@/components/ui/button";

export interface PaginationProps {
  currentPage: number;
  pages: number;
  onClick?: (page: number) => void;
}

const getPositionStyles = (index: number, totalPages: number) => {
  const isFirst = index === 0;
  const isLast = index === totalPages - 1;
  const isOnly = totalPages === 1;

  if (isOnly) {
    return "border-0";
  } else if (isFirst) {
    return "border-0 rounded-r-none";
  } else if (isLast) {
    return "border-0 rounded-l-none";
  } else {
    return "border-0 rounded-none";
  }
};

export default function Pagination(props: PaginationProps) {
  const { currentPage, pages, onClick } = props;

  console.log("Pagination pages", pages);

  return (
    <div className="flex items-center gap-0">
      {new Array(pages).fill(0).map((_, idx) => {
        const pageNumber = idx + 1;
        const isCurrentPage = pageNumber === currentPage;
        const positionStyles = getPositionStyles(idx, pages);
        
        return (
          <Button
            key={idx}
            variant={isCurrentPage ? "tertiary" : "default"}
            size="sm"
            onClick={() => {
              onClick?.(pageNumber);
            }}
            className={`${positionStyles}`}
          >
            {pageNumber}
          </Button>
        );
      })}
    </div>
  );
}
