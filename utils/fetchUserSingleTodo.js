import { client as prisma } from "@/lib/prismaClient";
export default async function fetchSingleTodo(givenId) {
  let todo = await prisma.todo.findFirst({
    where: {
      id: givenId,
    },
    select: {
      id: true,
      name: true,
      content: true,
    },
  });
  if (!todo) {
    return null;
  }
  const { id: todoId, name: todoName, content: todoContent } = todo;
  todo = { todoId, todoName, todoContent };
  console.log("fetchSingleTodo", todo);
  return todo;
}
