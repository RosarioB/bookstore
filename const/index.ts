export interface BookProps {
    _id: string
    category: string
    title: string
    author: string
    rating: number
    price: number
    imageSrc: string
    stock: number
}

export interface ShoppingCartItemProps extends BookProps {
    quantity: number;
}

export const PAGE_SIZE = 6;

export const BOOK_TYPES = [
    "fiction",
    "travel",
    "food",
    "health",
    "business",
]

export const SORT_VALUE = ['rating', 'price'];