import { backendUrl, get, post, remove } from "./http";

export const getBooks = () => {
  return get(`${backendUrl}/books`);
};

export const getBook = (id: string) => {
  return get(`${backendUrl}/books/${id}`);
};

export const createBook = (title: string, author: string) => {
  return post(`${backendUrl}/books`, { title, author });
};

export const deleteBook = (id: string) => {
  return remove(`${backendUrl}/books/${id}`);
};

export default {
  getBooks,
  getBook,
  createBook,
  deleteBook,
};
