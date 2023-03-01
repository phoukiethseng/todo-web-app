import TodoView from "./TodoView";
import { useState, useEffect } from "react";
import LoadingPage from "components/loading/LoadingPage";

export default function TodoList({ fetchTodoList }) {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    // Fetch todos list
    console.log("running fetchTodoList");
    fetchTodoList()
      .then((data) => {
        setIsLoading(false);
        setTodos(data);
      })
      .catch((err) => console.log);
    return () => {};
  }, []);
  useEffect(() => {
    console.log("fetchTodoList has changed");
  }, [fetchTodoList]);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ul className="flex flex-col justify-start items-stretch gap-2">
      {todos.map((todo) => (
        <TodoView
          key={todo.todoId}
          name={todo.todoName}
          content={todo.todoContent}
        />
      ))}
    </ul>
  );
}
