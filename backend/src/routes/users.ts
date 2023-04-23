import { Router } from "express";
import { createUser } from "../database/users";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth";
import Cookies from "cookies";

const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await createUser(name, email, password);
  if (user instanceof Error)
    return res.status(400).send({ error: user.message });
  const token = jwt.sign(user.id, process.env.JWT_SECRET as string);
  const cookies = new Cookies(req, res);
  cookies.set("X-Auth-Token", token);
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  res.send(req.user);
});

router.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found." });
});

export default router;
