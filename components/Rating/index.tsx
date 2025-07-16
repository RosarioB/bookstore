import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  disabled?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  className,
}: StarRatingProps) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={cn("flex items-center gap-0", className)}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= filledStars;
        const isHalf = starNumber === filledStars + 1 && hasHalfStar;

        return (
          <div key={index} className="relative">
            {!isHalf && (
              <Star
                className={cn(
                  "w-4 h-4 transition-colors",
                  isFilled
                    ? "fill-green-500 text-green-500"
                    : "fill-green-100 text-green-100 dark:fill-green-900 dark:text-green-900"
                )}
              />
            )}
            {isHalf && (
              <>
                {/* Background star - light green for right half */}
                <Star className="w-4 h-4 fill-green-100 text-green-100 dark:fill-green-900 dark:text-green-900" />
                {/* Foreground star - regular green for left half */}
                <Star
                  className="w-4 h-4 fill-green-500 text-green-500 absolute top-0 left-0"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
