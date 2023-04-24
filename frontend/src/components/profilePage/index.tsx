import { Link, useNavigate } from "react-router-dom";

import BooksContainer from "../homePage/BooksContainer";
import { useUser } from "../../context/User";
import { useEffect, useState } from "react";
import { deleteBook } from "../../services/books";
import { getMe } from "../../services/users";

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const [books, setBooks] = useState(user?.books || []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  const handleDelete = async (id: string) => {
    const book = deleteBook(id);
    if (book instanceof Error) return;
    const res = await getMe();
    if (res instanceof Error) return;
    if (!res.isLoggedIn) return;
    setUser(res.user);
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="background min-vh-100 p-5">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-light "> Welcome back {user?.name}</h1>
          <Link
            to="/books/upload"
            className="btn primary-background text-light"
          >
            Upload
          </Link>
        </div>
        <BooksContainer
          books={books}
          title="Your Books"
          isOwner
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
