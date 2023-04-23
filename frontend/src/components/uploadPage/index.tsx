import { useEffect, useState } from "react";
import { createBook } from "../../services/books";
import { getMe } from "../../services/users";
import { useUser } from "../../context/User";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
  }, []);

  const handleSubmit = async () => {
    const book = await createBook(name, author);
    if (book instanceof Error) return setError(book.message);
    const me = getMe();
    if (me instanceof Error) return setError(me.message);
    setUser(me);
    console.log(book);
  };
  return (
    <div className="background min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <img
        src="/book.jpg"
        alt="Can't load book image"
        width="150"
        height="200"
        id="book-img"
        className="book-img img-thumbnail rounded"
        loading="lazy"
      />
      <div className="mb-3 w-50">
        <label htmlFor="title" className="form-label primary-color">
          Title of the Book
        </label>
        <input
          type="email"
          className="form-control"
          id="title"
          aria-describedby="emailHelp"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="Author Name" className="form-label primary-color">
          Author Name
        </label>
        <input
          type="text"
          className="form-control"
          id="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button
        type="submit"
        className="btn primary-background text-light"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default UploadPage;
