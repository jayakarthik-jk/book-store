import { Router } from "express";
import jwt from "jsonwebtoken";
import Cookies from "cookies";

import { login } from "../database/auth";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  if (user instanceof Error)
    return res.status(400).send({ error: user.message });
  const token = jwt.sign(user.id, process.env.JWT_SECRET as string);
  
  const cookies = new Cookies(req, res, {
    
  });
  cookies.set("X-Auth-Token", token);
  res.send(user);
});

router.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found." });
});

export default router;
