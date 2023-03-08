// Display content of all user's todos

import Button from "@/components/Button";
import AddTodoPopUp from "@/components/todo/AddTodoPopUp";
import TodoList from "@/components/todo/TodoList";
import { authOptions } from "@/config/nextAuthConfig";
import { getServerSession } from "next-auth";
import { useCallback, useEffect, useState } from "react";

export default function TodosPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [PopupIsOpen, setOpenAddTodoPopup] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);

  console.log("TodosPage render!");
  // Fetching all todos, refetch if refreshToggle has changed
  useEffect(() => {
    console.log("fetching todos");
    fetch("/api/user/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [refreshToggle]);

  // Make a POST request to backend, upon completion toggle refreshToggle which will trigger refetching data
  const addTodo = useCallback(async (name, content) => {
    const response = await fetch("api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        content: content,
      }),
    });
    console.log(response);
    if (response.ok) {
      console.log("added a new todo");
      setOpenAddTodoPopup(false);
      setRefreshToggle((prevVal) => !prevVal);
    }
  }, []);

  // Make a DELETE request to backend, upon completion toggle refreshToggle which will trigger refetching data
  const deleteTodo = useCallback(async (todoId) => {
    const response = await fetch("/api/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todoId,
      }),
    });
    if (response.ok) {
      console.log("deleted a todo");
      setRefreshToggle((prevVal) => !prevVal);
    }
  }, []);

  const handleOnCheckChange = useCallback(
    async (todoId) => {
      // Get corresponding todo item from todos state
      console.log("handleOnCheckChange todoId", todoId);
      const todoItem = todos.find((e) => e.todoId === todoId);
      console.log("handleOnCheckChange todoItem", todoItem);

      // Make a PUT fetch request to /api/todo to update todo item, then refresh todos data
      const response = await fetch("/api/todo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todoId,
          name: todoItem.todoName,
          content: todoItem.todoContent,
          checked: !todoItem.todoChecked,
        }),
      });
      if (response.ok) {
        console.log("handleOnCheckChange response.ok", response.ok);
        setRefreshToggle((prevVal) => !prevVal);
      }
    },
    [todos]
  );

  return (
    <>
      {PopupIsOpen && (
        <AddTodoPopUp
          onSubmit={addTodo}
          onClose={() => {
            setOpenAddTodoPopup(false);
          }}
        />
      )}
      <div className="flex flex-col justify-center px-6 pt-2 gap-4 max-w-3xl mx-auto">
        <div className="p-4 flex flex-col justify-start items-center border-2 rounded-xl drop-shadow-md bg-gray-100">
          <Button onClick={() => setOpenAddTodoPopup(true)}>New Todos</Button>
        </div>
        <div className="flex flex-col justify-start items-stretch border-2 rounded-xl drop-shadow-md space-y-3 p-5 bg-gray-100">
          <TodoList
            onDelete={deleteTodo}
            isLoading={isLoading}
            onCheckChange={handleOnCheckChange}
            todos={todos}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
