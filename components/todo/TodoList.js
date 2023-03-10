import LoadingPage from "components/loading/LoadingPage";
import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  isLoading,
  onDelete,
  onCheckChange,
}) {
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ul className="flex flex-col justify-start items-stretch gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          name={todo.name}
          content={todo.content}
          checked={todo.checked}
          onCheckChange={onCheckChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
