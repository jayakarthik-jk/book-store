import { Router } from "express";
import { createBook, deleteBook, getBook, getBooks } from "../database/books";
import auth from "../middleware/auth";

const router = Router();

router.get("/", async (req, res) => {
  const books = await getBooks();
  res.send(books);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await getBook(id);
  if (!book) return res.status(404).send({ error: "Book not found." });
  if (book instanceof Error)
    return res.status(400).send({ error: book.message });
  res.send(book);
});

router.post("/", auth, async (req, res) => {
  const { title, author } = req.body;
  const book = await createBook(title, author, req.user?.id);
  if (book instanceof Error)
    return res.status(400).send({ error: book.message });
  res.send(book);
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const book = await deleteBook(id, req.user?.id);
  if (book instanceof Error)
    return res.status(400).send({ error: book.message });
  res.send(book);
});

router.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found." });
});

export default router;
