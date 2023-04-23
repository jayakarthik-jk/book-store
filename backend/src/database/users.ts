import validateUser, { validateId } from "../validators/user";
import getClient from "./prismaClient";
import bcrypt from "bcrypt";

export const getUser = async (id: string) => {
  const client = getClient();
  const { error } = validateId(id);
  if (error) return new Error(error.message);
  const user = await client.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      books: true,
    },
  });
  return user;
};

export const getUserByEmail = async (email: string) => {
  const client = getClient();
  const user = await client.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      books: true,
    },
  });
  return user;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const client = getClient();
  const { error } = validateUser({ name, email, password });
  if (error) return new Error(error.message);
  const user = await getUserByEmail(email);
  if (user) return new Error("User already registered.");
  const hashedPassword = await bcrypt.hash(password, 10);
  return await client.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      books: true,
    },
  });
};
