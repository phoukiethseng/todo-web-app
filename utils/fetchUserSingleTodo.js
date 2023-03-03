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
      },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
  if (!todo) {
    return null;
  }
  const { id: todoId, name: todoName, content: todoContent } = todo;
  todo = { todoId, todoName, todoContent };
  console.log("fetchSingleTodo", todo);
  return todo;
}
