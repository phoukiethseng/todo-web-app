import { prisma } from "@/lib/prismaClient";

export default async function updateTodo({ id, name, content, checked }) {
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
