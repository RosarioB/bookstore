import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  disabled?: boolean;
  className?: string;
}

export default function StarRating({ 
  rating, 
  maxStars = 5, 
  className 
}: StarRatingProps) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= filledStars;
        const isHalf = starNumber === filledStars + 1 && hasHalfStar;
        
        return (
          <div key={index} className="relative">
            <Star
              className={cn(
                "w-4 h-4 transition-colors",
                isFilled || isHalf
                  ? "fill-green-500 text-green-500" 
                  : "fill-gray-300 text-gray-300"
              )}
            />
            {isHalf && (
              <Star
                className="absolute top-0 left-0 w-4 h-4 fill-green-500 text-green-500"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}