import { prisma as prismaClient } from "@/lib/prismaClient";

export async function updateTodo({
  id,
  title,
  deadline,
  completed,
  priority,
  prisma = prismaClient,
}) {
  console.log("updateTodo", { id, title, deadline, completed, priority });
  if (id == null) {
    return null;
  }
  if (
    title === null &&
    deadline === null &&
    completed === null &&
    priority === null
  ) {
    return null;
  }
  try {
    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title,
        completed,
        deadline,
        priority,
      },
      select: {
        id: true,
        title: true,
        completed: true,
        deadline: true,
        priority: true,
      },
    });
    console.log("updateTodo returning", todo);
    return todo ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
