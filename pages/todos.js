// Display content of all user's todos

import Button from "@/components/Button";
import AddTodoPopUp from "@/components/todo/AddTodoPopUp";
import TodoList from "@/components/todo/TodoList";
import { authOptions } from "@/config/nextAuthConfig";
import { getServerSession } from "next-auth";
import { useCallback, useEffect, useState, useRef } from "react";

export default function TodosPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [PopupIsOpen, setOpenAddTodoPopup] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const searchInputRef = useRef();

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

  // Whenever todos changes, update the filtered search result
  useEffect(() => {
    handleSearch();
    return () => {};
  }, [todos]);

  // Make a POST request to backend, upon completion toggle refreshToggle which will trigger refetching data
  const addTodo = useCallback(
    async (name, content) => {
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
        const newTodo = await response.json();
        setOpenAddTodoPopup(false);
        setTodos([...todos, newTodo]);
      }
    },
    [todos]
  );

  // Make a DELETE request to backend, upon completion toggle refreshToggle which will trigger refetching data
  const deleteTodo = useCallback(
    async (todoId) => {
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
        const { id } = await response.json();
        if (id === todoId) {
          setTodos(todos.filter((todo) => todo.id !== id));
        }
      }
    },
    [todos]
  );

  const handleOnCheckChange = useCallback(
    async (targetTodoId) => {
      // Get corresponding todo item from todos state
      const targetTodoItem = todos.find((e) => e.id === targetTodoId);

      // Make a PUT fetch request to /api/todo to update todo item, then update todos state
      const response = await fetch("/api/todo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...targetTodoItem,
          checked: !targetTodoItem.checked,
        }),
      });
      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(
          todos.map((todo) => (todo.id === targetTodoId ? updatedTodo : todo))
        );
      }
    },
    [todos]
  );

  const handleSearch = useCallback(() => {
    const searchText = searchInputRef.current.value.toLowerCase();
    if (searchText === "") {
      setFilteredTodos(todos);
      return;
    }
    const newFilteredTodos = todos.filter((todo) =>
      todo.name.toLowerCase().includes(searchText)
    );
    setFilteredTodos(newFilteredTodos);
  }, [searchInputRef, todos]);

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
        <div className="p-4 flex flex-row justify-center items-center border-2 rounded-xl drop-shadow-md bg-gray-100 gap-4">
          <input
            ref={searchInputRef}
            type="text"
            className="w-56 h-10 pl-2 rounded-lg drop-shadow-sm border-2 border-slate-300"
          />
          <Button onClick={() => handleSearch()}>Search</Button>
          <Button onClick={() => setOpenAddTodoPopup(true)}>New Todos</Button>
        </div>
        <div className="flex flex-col justify-start items-stretch border-2 rounded-xl drop-shadow-md space-y-3 p-5 bg-gray-100">
          <TodoList
            onDelete={deleteTodo}
            isLoading={isLoading}
            onCheckChange={handleOnCheckChange}
            todos={filteredTodos}
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
