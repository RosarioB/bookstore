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