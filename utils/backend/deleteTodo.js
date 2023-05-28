import { prisma as prismaClient } from "@/lib/prismaClient";

export async function deleteTodo(todoId, prisma = prismaClient) {
  if (todoId === null) {
    return null;
  }
  try {
    const result = await prisma.todo.delete({
      where: {
        id: todoId,
      },
      select: {
        id: true,
      },
    });
    return result;
  } catch (err) {
    return null;
  }
}
