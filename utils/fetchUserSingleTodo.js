import { prisma } from "@/lib/prismaClient";
export default async function fetchSingleTodo(givenId) {
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
  } catch (err) {
    console.log(err);
    return null;
  }
  if (!todo) {
    return null;
  }
  console.log("fetchSingleTodo", todo);
  return todo;
}
