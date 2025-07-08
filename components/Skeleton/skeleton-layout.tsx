import { Skeleton } from "../ui/skeleton";
import SkeletonCard from "./skeleton-card";

export default function SkeletonLayout() {
  return (
    <>
      <div className="pb-4">
        <Skeleton className="h-4 w-[150px]" />
      </div>
      <div className="grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </>
  );
}
