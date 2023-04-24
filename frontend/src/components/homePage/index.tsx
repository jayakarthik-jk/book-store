import { useEffect, useState } from "react";

import HeroSection from "./HeroSection";
import BooksContainer from "./BooksContainer";
import { getBooks } from "../../services/books";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = async () => {
    const books = await getBooks();
    if (books instanceof Error) return setError(books);
    setBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="background min-vh-100">
      <div className="container-fluid">
        <HeroSection />
        <BooksContainer books={books} error={error} title="Available Books" />
      </div>
    </div>
  );
};

export default HomePage;
