import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function SkeletonBookReviewSection() {
  const skeletonReviewOverview = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className="flex flex-col py-2">
      <Skeleton className="w-100 h-4" />
    </div>
  ));

  return (
    <>
      <div className="mt-6 p-4">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
        <div className="flex md:flex-row flex-col gap-10">
          <div className="flex-1">
            <div className="text-sm text-gray-500">
              <Skeleton className="w-20 h-4 mt-8" />
              <Skeleton className="w-20 h-4 mt-8" />
            </div>
            {skeletonReviewOverview}
          </div>
          <div className="overflow-x-auto flex-1">
            <SkeletonReviewsTable />
          </div>
        </div>
      </div>
    </>
  );
}


const SkeletonReviewsTable = () => {
    return (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }, (_, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div>
                      <Skeleton className="w-20 h-4" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="w-20 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-20 h-4" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
}   