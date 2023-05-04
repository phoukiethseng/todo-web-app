import { prisma as prismaClient } from "@/lib/prismaClient";

export async function getUserByUsername(username, prisma = prismaClient) {
  if (username === null) {
    return null;
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log("getUserByUsername returning", user);
    return user;
  } catch (err) {
    return null;
  }
}
