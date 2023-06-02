import { prisma as prismaClient } from "@/lib/prismaClient";
import bcrypt from "bcrypt";

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
    // Salt and hash password
    const saltRound = 12;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        email,
      },
    });
    console.log("addNewUser returning", user);
    return user ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
