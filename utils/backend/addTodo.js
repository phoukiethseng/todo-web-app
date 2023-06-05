import { prisma as prismaClient } from "@/lib/prismaClient";
export async function addTodo({
  userId,
  todo: { title, deadline, priority },
  prisma = prismaClient,
}) {
  if (!userId) {
    return null;
  }

  if (!(title || deadline || priority)) {
    return null;
  }
  let todo;
  try {
    todo = await prisma.todo.create({
      data: {
        title,
        deadline,
        priority,
        author: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        deadline: true,
        priority: true,
      },
    });
    console.log("addTodo()", todo);
  } catch (err) {
    console.log(err);
    return null;
  }
  return todo;
}
