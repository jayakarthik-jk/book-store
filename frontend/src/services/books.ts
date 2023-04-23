import { backendUrl, get, post } from "./http";

export const getBooks = () => {
  return get(`${backendUrl}/books`);
};

export const getBook = (id: string) => {
  return get(`${backendUrl}/books/${id}`);
};

export const createBook = (title: string, author: string) => {
  return post(`${backendUrl}/books`, { title, author });
};

export default {
  getBooks,
  getBook,
  createBook,
};
