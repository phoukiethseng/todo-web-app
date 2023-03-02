import { prisma } from "@/lib/prismaClient";

async function fetchUserTodos(userId) {
  let todos = await prisma.todo.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      name: true,
      content: true,
    },
  });
  if (!todos) {
    return null;
  }
  todos = todos.map((todo) => {
    const { id: todoId, name: todoName, content: todoContent } = todo;
    return { todoId, todoName, todoContent };
  });
  console.log("fetchUserTodos", todos);
  return todos;
}

export { fetchUserTodos };
