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

  res.cookie("X-Auth-Token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "none",
    secure: true,
  });

  res.send(user);
});

router.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found." });
});

export default router;
