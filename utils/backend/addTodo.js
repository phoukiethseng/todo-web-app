import { prisma as prismaClient } from "@/lib/prismaClient";
export async function addTodo({
  userId,
  todo: { name, content },
  prisma = prismaClient,
}) {
  if (userId === null || name === null || content === null) {
    return null;
  }
  let todo;
  try {
    todo = await prisma.todo.create({
      data: {
        name: name,
        content: content,
        author: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        content: true,
        checked: true,
      },
    });
    console.log("addTodo()", todo);
  } catch (err) {
    console.log(err);
    return null;
  }
  return todo;
}
