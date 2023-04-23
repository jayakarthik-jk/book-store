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
}

const BooksContainer = ({ books, title, error }: BooksContainerProps) => {
  const [query, setQuery] = useState("");

  const getFilteredBooks = () => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    return filteredBooks;
  };
  const filteredBooks = getFilteredBooks();
  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <h4 className="navbar-brand primary-color">{title}</h4>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </nav>
      <div className="d-flex h-100 flex-wrap justify-content-evenly align-items-center gap-4">
        {error ? (
          <h1 className="text-white">{error.message}</h1>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <Book {...book} />)
        ) : (
          <h1 className="text-white">No books found</h1>
        )}
      </div>
    </div>
  );
};

export default BooksContainer;
