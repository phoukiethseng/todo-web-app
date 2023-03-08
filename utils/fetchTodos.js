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
      checked: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  if (!todos) {
    return null;
  }
  todos = todos.map((todo) => {
    const {
      id: todoId,
      name: todoName,
      content: todoContent,
      checked: todoChecked,
    } = todo;
    return { todoId, todoName, todoContent, todoChecked };
  });
  console.log("fetchUserTodos", todos);
  return todos;
}

export { fetchUserTodos };
