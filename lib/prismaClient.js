import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("prisma client loaded");

export { prisma };
