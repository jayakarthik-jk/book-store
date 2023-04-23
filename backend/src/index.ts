import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";

import auth from "./routes/auth";
import users from "./routes/users";
import books from "./routes/books";

config();

const app = express();

app.use(
  cors({
    allowedHeaders: ["Content-Type", "X-Auth-Token"],
  })
);
app.use(helmet());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/books", books);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
