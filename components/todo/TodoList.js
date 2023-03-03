import LoadingPage from "components/loading/LoadingPage";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, isLoading, onDelete }) {
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ul className="flex flex-col justify-start items-stretch gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.todoId}
          id={todo.todoId}
          name={todo.todoName}
          content={todo.todoContent}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
