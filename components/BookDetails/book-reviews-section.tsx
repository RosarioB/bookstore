import { starLabels, Book, Review } from "@/const";
import { roundHalf } from "@/lib/utils";
import StarRating from "@/components/Rating";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface BookReviewsSectionProps {
  book: Book;
}

export default function BookReviewsSection({ book }: BookReviewsSectionProps) {
  return (
    <section className="mt-6 p-4" aria-label="Book reviews">
      <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
      <div className="flex md:flex-row flex-col gap-10">
        <section className="flex-1" aria-label="Review overview">
          <ReviewOverview content={book.reviews} />
        </section>
        <section className="overflow-x-auto flex-1" aria-label="Reviews table">
          {book?.reviews?.length > 0 && (
            <ReviewsTable content={book.reviews} bookId={book._id} />
          )}
        </section>
      </div>
    </section>
  );
}

const ReviewOverview = (props: { content: Review[] }) => {
  const num = props.content.length;
  const sum = props.content.reduce((prev, item) => {
    return prev + item.rating;
  }, 0);
  const avg = sum / num;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center py-2">
        <StarRating disabled rating={avg} />
        <div className="ml-2">{starLabels[roundHalf(avg)]}</div>
      </div>
      <div className="text-sm text-gray-500">{`${num} global ratings`}</div>
      <StarPercentageBar
        leftText="5 Star"
        value={
          (props.content.filter((i) => i.rating === 5).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText="4 Star"
        value={
          (props.content.filter((i) => i.rating === 4).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText="3 Star"
        value={
          (props.content.filter((i) => i.rating === 3).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText="2 Star"
        value={
          (props.content.filter((i) => i.rating === 2).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText="1 Star"
        value={
          (props.content.filter((i) => i.rating === 1).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText="0 Star"
        value={
          (props.content.filter((i) => i.rating === 0).length / num) * 100 || 0
        }
      />
    </div>
  );
};

const StarPercentageBar = (props: { leftText?: string; value: number }) => {
  const { leftText, value = 0 } = props;
  const valueRound = Math.round(value);
  return (
    <div className="flex items-center justify-between gap-2">
      {leftText && (
        <span className="text-sm text-gray-500 w-25">{leftText}</span>
      )}
      <Progress value={valueRound} />
      <span className="text-sm text-gray-500 w-32">{`${valueRound}%`}</span>
    </div>
  );
};

const ReviewsTable = (props: { content: Review[]; bookId: string }) => {
  const { content, bookId } = props;

  return (
    <>
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
          {content.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/avatar.png" />
                      <AvatarFallback>
                        {item.name.substring(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <StarRating disabled rating={item.rating} />
                </TableCell>
                <TableCell>{`${new Date(
                  item.date
                ).toLocaleDateString()}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
