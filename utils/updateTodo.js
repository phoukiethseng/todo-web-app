import { prisma as prismaClient } from "@/lib/prismaClient";

export async function updateTodo({
  id,
  name,
  content,
  checked,
  prisma = prismaClient,
}) {
  if (id === null || name === null || content === null || checked === null) {
    return null;
  }
  console.log("updateTodo id", id);
  console.log("updateTodo name", name);
  console.log("updateTodo content", content);
  console.log("updateTodo checked", checked);
  try {
    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        content: content,
        checked: checked,
      },
      select: {
        id: true,
        name: true,
        content: true,
        checked: true,
      },
    });
    console.log("updateTodo returning", todo);
    return todo ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
