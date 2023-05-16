import LoadingPage from "components/loading/LoadingPage";
import { TodoCard } from "../v2/TodoCard";

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
    <ul className="grid grid-cols-3 justify-start items-stretch gap-2">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          title={todo.name}
          completed={todo.checked}
          onComplete={onCheckChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
