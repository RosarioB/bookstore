import axios from 'axios';
import { Book } from '@/const';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
});

export async function fetchBooks(data: {
  page?: number;
  size?: number;
  category?: string;
  sort?: string;
}): Promise<{ content: Book[]; total: number; error?: unknown }> {
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

export async function buyBook(
  bookID: string,
  params: { userId: string; quantity: number }
): Promise<{
  content?: { message: string };
  error?: unknown;
}> {
  try {
    const response = await api.post(
      `/api/books/${bookID}/buy?userId=${params.userId}&quantity=${params.quantity}`
    );
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export async function fetchBookDetailsById(id: string): Promise<{
  content: Book;
  error?: unknown;
}> {
  try {
    const response = await api.get(`/api/books/${id}`);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data.data as Book };
  } catch (error) {
    console.error(error);
    return { error, content: {} as Book };
  }
}

export async function updateBookDetails(
  id: string,
  params: Partial<Book>
): Promise<{
  content?: { data: Book; message: string };
  error?: unknown;
}> {
  try {
    const response = await api.put(`/api/books/${id}`, params);
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }
    return { content: response.data };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
