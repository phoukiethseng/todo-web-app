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
    });
    return {
      id: result?.id,
    };
  } catch (err) {
    return null;
  }
}
