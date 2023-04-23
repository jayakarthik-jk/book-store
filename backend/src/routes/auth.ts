import { Router } from "express";
import jwt from "jsonwebtoken";
import { login } from "../database/auth";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  if (user instanceof Error)
    return res.status(400).send({ error: user.message });
  const token = jwt.sign(user.id, process.env.JWT_SECRET as string);
  res.header("X-Auth-Token", token).send(user);
});

router.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found." });
});

export default router;
