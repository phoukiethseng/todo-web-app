import { prisma } from "@/lib/prismaClient";

export default async function getUserByUsername(username) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  console.log("getUserByUsername returning", user);
  return user;
}
