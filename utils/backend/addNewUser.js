import { prisma as prismaClient } from "@/lib/prismaClient";

export async function addNewUser({
  username,
  password,
  name,
  email,
  prisma = prismaClient,
}) {
  if (
    username === null ||
    password === null ||
    name === null ||
    email === null
  ) {
    return null;
  }
  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        password,
        email,
      },
    });
    console.log("addNewUser returning", user);
    return user ?? null;
  } catch (err) {
    return null;
  }
}
