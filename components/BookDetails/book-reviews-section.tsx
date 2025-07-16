import { starLabels, ReviewProps, BookProps } from '@/const';
import { roundHalf } from '@/lib/utils';
import StarRating from '@/components/Rating';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Loadable } from 'jotai/vanilla/utils/loadable';

interface BookReviewsSectionProps {
  bookDetailsLodable: Loadable<Promise<{
    content: { data: BookProps };
    error?: any;
  }>>;
}

export default function BookReviewsSection({ bookDetailsLodable }: BookReviewsSectionProps) {

  switch (bookDetailsLodable.state) {
    case 'hasData':
      const data = bookDetailsLodable.data.content.data;
      return (
        <>
          <div className='hero h-auto justify-start mt-6'>
            <div className='hero-content items-start'>
              <div className='max-w-md'>
                <h2 className='text-3xl font-bold'>Customer Reviews</h2>
                <p className='py-6'>
                  <ReviewOverview content={data.reviews} />
                </p>
              </div>
              <div className='overflow-x-auto mt-16'>
                {data?.reviews?.length > 0 && (
                  <ReviewsTable content={data.reviews} bookId={data._id} />
                )}
              </div>
            </div>
          </div>
        </>
      );
    case 'loading':
      return (
        <>
          <div className='flex items-center justify-center mt-6'>
            <span className='loading loading-bars loading-lg'></span>
          </div>
        </>
      );
    case 'hasError':
      throw bookDetailsLodable.error;
  }
}

const ReviewOverview = (props: { content: ReviewProps[] }) => {
  const num = props.content.length;
  const sum = props.content.reduce((prev, item) => {
    return prev + item.rating;
  }, 0);
  const avg = sum / num;
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center py-2'>
        <StarRating disabled rating={avg} />
        <div className='ml-2'>{starLabels[roundHalf(avg)]}</div>
      </div>
      <div className='text-sm text-gray-500'>{`${num} global ratings`}</div>
      <StarPercentageBar
        leftText='5 Star'
        value={
          (props.content.filter((i) => i.rating === 5).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText='4 Star'
        value={
          (props.content.filter((i) => i.rating === 4).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText='3 Star'
        value={
          (props.content.filter((i) => i.rating === 3).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText='2 Star'
        value={
          (props.content.filter((i) => i.rating === 2).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText='1 Star'
        value={
          (props.content.filter((i) => i.rating === 1).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText='0 Star'
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
    <div className='flex items-center justify-between gap-2'>
      {leftText && (
        <span className='text-sm text-gray-500 w-32'>{leftText}</span>
      )}
      <progress
        className='progress progress-info'
        value={valueRound}
        max='100'
      ></progress>
      <span className='text-sm text-gray-500 w-32'>{`${valueRound}%`}</span>
    </div>
  );
};

const ReviewsTable = (props: {
  content: ReviewProps[];
  bookId: string;
}) => {
  const { content, bookId } = props;

  return (
    <>
      <Table>
        {/* head */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* row 1 */}
          {content.map((item) => {
            return (
              <>
                <TableRow key={item.name}>
                  <TableCell>
                    <div className='flex items-center space-x-3'>
                      <div className='avatar placeholder'>
                        <div className='bg-neutral-focus text-neutral-content mask mask-squircle w-12 h-12'>
                          <span className='text-3xl'>
                            {item.name.substring(0, 1)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>{item.name}</div>
                        <div className='text-sm opacity-50'>
                          User ID: {item.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StarRating disabled rating={item.rating} />
                  </TableCell>
                  <TableCell>{`${new Date(item.date).toLocaleDateString()}`}</TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
