import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient | null = null;

const getClient = () => {
  if (!prismaClient) prismaClient = new PrismaClient();
  return prismaClient;
};

export default getClient;
