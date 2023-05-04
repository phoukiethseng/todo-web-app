import { prisma as prismaClient } from "@/lib/prismaClient";
export async function fetchUserSingleTodo(givenId, prisma = prismaClient) {
  if (givenId === null) {
    return null;
  }
  let todo;
  try {
    todo = await prisma.todo.findFirst({
      where: {
        id: givenId,
      },
      select: {
        id: true,
        name: true,
        content: true,
        checked: true,
      },
    });
    console.log("fetchSingleTodo", todo);
    return todo ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
