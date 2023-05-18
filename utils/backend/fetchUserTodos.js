import { prisma as prismaClient } from "@/lib/prismaClient";

async function fetchUserTodos(userId, prisma = prismaClient) {
  if (userId === null) {
    return null;
  }
  try {
    let todos = await prisma.todo.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        name: true,
        content: true,
        checked: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    if (!todos) {
      return null;
    }
    console.log("fetchUserTodos", todos);
    return todos;
  } catch (err) {
    return null;
  }
}

export { fetchUserTodos };
