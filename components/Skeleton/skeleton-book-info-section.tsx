import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonBookInfoSection() {
  return (
    <>
    <Skeleton className="h-4 w-60" />
    <Card className="shadow-xl border-none">
      <CardContent className="flex flex-col lg:flex-row gap-6">
        <Skeleton className="h-60 w-80 object-cover rounded-md self-center" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-12 w-full mt-2" />
          <Skeleton className="h-6 w-60 mt-6" />
          <Skeleton className="h-6 w-60 mt-2" />
          <Skeleton className="h-6 w-60 mt-2" />
          <Skeleton className="h-12 w-28 mt-2" />
        </div>
        </CardContent>
      </Card>
    </>
  );
}