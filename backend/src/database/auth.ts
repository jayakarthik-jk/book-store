import validateAuth from "../validators/auth";
import getClient from "./prismaClient";
import bcrypt from "bcrypt";

export const login = async (email: string, password: string) => {
  const client = getClient();

  const { error } = validateAuth({ email, password });

  if (error) return new Error(error.message);

  const user = await client.users.findUnique({
    where: {
      email,
    },
    include: {
      books: true,
    },
  });
  if (!user) return new Error("User not found");
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return new Error("Password is incorrect");
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    books: user.books,
  };
};
