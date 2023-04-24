import { Router } from "express";
import { createUser, getUser } from "../database/users";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await createUser(name, email, password);
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

router.get("/me", async (req, res) => {
  const token = req.cookies["X-Auth-Token"];
  if (!token)
    return res.status(200).send({ isLoggedIn: false, reason: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await getUser(decoded as string);
    if (!user)
      return res.status(200).send({ isLoggedIn: false, reason: "No user" });
    if (user instanceof Error)
      return res.status(200).send({ isLoggedIn: false, reason: user.message });
    return res.status(200).send({ isLoggedIn: true, user });
  } catch (error) {
    return res
      .status(200)
      .send({ isLoggedIn: false, reason: "Something went wrong" });
  }
});

router.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found." });
});

export default router;
