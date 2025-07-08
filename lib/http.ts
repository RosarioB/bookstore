import axios from 'axios';
import { BookProps } from '@/const';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
});

export async function fetchBooks(data: {
    page?: number;
    size?: number;
    category?: string;
    sort?: string;
}): Promise<{ content: BookProps[]; total: number; error?: unknown }> {
    try {
        const queryArray = Object.keys(data).reduce((prev: string[], item) => {
            const value = data[item as keyof typeof data];
            if (value) {
                prev.push(`${item}=${value}`);
            }
            return prev;
        }, []);
        const response = await api.get(`/api/books?${queryArray.join(`&`)}`);
        if (response.status !== 200) {
            throw new Error(`${response.status} - ${response.data}`);
        }
        return response.data.data;
    } catch (error) {
        console.error(error);
        return { error, content: [], total: 0 };
    }
}