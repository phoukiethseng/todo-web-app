import { prisma } from "@/lib/prismaClient";

export default async function deleteTodo(todoId) {
  const result = await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
  return result ?? null;
}
