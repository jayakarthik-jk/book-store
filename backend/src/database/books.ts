import validateBook from "../validators/book";
import { validateId } from "../validators/user";
import getClient from "./prismaClient";

export const getBooks = async () => {
  const client = getClient();
  const books = await client.books.findMany();
  return books;
};

export const getBook = async (id: string) => {
  const client = getClient();
  const { error } = validateId(id);
  if (error) return new Error(error.message);
  const book = await client.books.findUnique({
    where: {
      id,
    },
  });
  return book;
};

export const createBook = async (
  title: string,
  author: string,
  userId: string
) => {
  const client = getClient();
  const { error } = validateBook({ title, author });
  if (error) return new Error(error.message);

  const book = await client.books.create({
    data: {
      title,
      author,
      userId,
    },
  });

  client.users.update({
    where: {
      id: userId,
    },
    data: {
      books: {
        connect: {
          id: book.id,
        },
      },
    },
  });
  return book;
};

export const deleteBook = async (id: string, userId: string) => {
  const client = getClient();
  const book = await client.books.findUnique({
    where: {
      id,
    },
  });
  if (!book) return new Error("Book not found.");

  if (book.userId !== userId) return new Error("Unauthorized.");

  await client.books.delete({
    where: {
      id,
    },
  });
  return book;
};
