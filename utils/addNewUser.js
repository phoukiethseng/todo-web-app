import { prisma } from "@/lib/prismaClient";

export async function addNewUser({ username, password, name, email }) {
  const user = await prisma.user.create({
    data: {
      name,
      username,
      password,
      email,
    },
  });
  console.log("addNewUser returning", user);
  return user;
}
