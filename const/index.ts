export interface BookProps {
    _id: string
    category: string
    title: string
    author: string
    avgRating: number
    price: number
    imageSrc: string
    stock: number
    reviews: ReviewProps[]
}

export interface ReviewProps {
    name: string
    rating: number
    date: string
}

export type BookDetailProps = Omit<
  BookProps,
  "reviews" | "avgRating"
>;

export interface ShoppingCartItemProps extends BookProps {
    quantity: number;
}

export const starLabels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

export const PAGE_SIZE = 6;

export const BOOK_TYPES = [
    "fiction",
    "travel",
    "food",
    "health",
    "business",
]

export const SORT_VALUE = ['rating', 'price'];