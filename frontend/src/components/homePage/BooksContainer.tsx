import { useState } from "react";

import Book from "../common/Book";

interface BooksContainerProps {
  books: {
    id: string;
    title: string;
    author: string;
  }[];
  title: string;
  error?: Error | null;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
}

const BooksContainer = ({
  books,
  title,
  error,
  isOwner = false,
  onDelete,
}: BooksContainerProps) => {
  const [query, setQuery] = useState("");

  const getFilteredBooks = () => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    return filteredBooks;
  };
  const filteredBooks = getFilteredBooks();
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center py-4">
        <h4 className="primary-color">{title}</h4>
        <div className="d-flex">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex h-100 flex-wrap justify-content-evenly align-items-center gap-4">
        {error ? (
          <h1 className="text-white">{error.message}</h1>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Book
              {...book}
              key={book.id}
              isOwner={isOwner}
              onDelete={onDelete}
            />
          ))
        ) : (
          <h1 className="text-white">No books found</h1>
        )}
      </div>
    </div>
  );
};

export default BooksContainer;
