interface BookProps {
  id: string;
  title: string;
  author: string;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
}

const Book = ({ title, author, isOwner = false, onDelete, id }: BookProps) => {
  return (
    <div className="book-card position-relative">
      {isOwner && (
        <span
          className="position-absolute bg-danger text-light d-flex justify-content-center align-items-center rounded"
          style={{
            top: "-15px",
            right: "-15px",
            cursor: "pointer",
            width: "20px",
            height: "20px",
          }}
          onClick={() => onDelete && onDelete(id)}
        >
          X
        </span>
      )}
      <div className="cover position-absolute h-100 w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="book-title text-white">{title}</div>
        <div className="book-title text-white">by&nbsp;{author}</div>
      </div>
      <img
        src="/book.jpg"
        alt="Can't load book image"
        width="150"
        height="200"
        id="book-img"
        className="book-img img-thumbnail rounded"
        loading="lazy"
      />
    </div>
  );
};

export default Book;
