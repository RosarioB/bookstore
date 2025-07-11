import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="w-full max-w-sm p-0 gap-2 shadow-xl border-0">
      <CardHeader className="p-0">
        <Skeleton className="w-full h-35 object-cover rounded-t-xl" />
      </CardHeader>
      <CardContent className="space-y-2 px-4">
        <Skeleton className="h-4 w-20 mt-2" />
        <Skeleton className="h-4 w-1/2 mt-4" />
        <Skeleton className="h-4 w-20 mt-4" />
        <Skeleton className="h-4 w-20 mt-8" />
      </CardContent>
      <CardFooter className="flex gap-2 justify-end px-4 pb-4">
        <Skeleton className="h-12 w-28" />
        <Skeleton className="h-12 w-28" />
      </CardFooter>
    </Card>
  )
}