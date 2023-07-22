import { TodoCard } from "@/components/v2/TodoCard";
import { authOptions } from "@/config/nextAuthConfig";
import { getServerSession } from "next-auth";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/v2/Button";
import { GET, PUT, DELETE, POST } from "@/utils/frontend/api";

export default function TodosPage() {
  const addTodoInputBox = useRef();
  const [todosList, setTodosList] = useState([]);
  const [isAddTodoLoading, setIsAddTodoLoading] = useState(false);
  const fetchTodos = async () => {
    const { statusCode, data } = await GET("/api/user/todos");
    if (statusCode === 200) {
      setTodosList(data);
    }
  };

  useEffect(() => {
    setTimeout(fetchTodos, 0);
    return () => {};
  }, []);

  const handleTodoComplete = async (id, newState) => {
    const { statusCode, data: newTodo } = await PUT("/api/todo", {
      id: id,
      completed: newState,
    });
    if (statusCode === 200) {
      const newTodosList = todosList.map((todo) =>
        todo.id === id ? newTodo : todo
      );
      setTodosList(newTodosList);
    }
  };

  const handleTodoDelete = async (id) => {
    const { statusCode, data } = await DELETE("/api/todo", {
      id: id,
    });
    if (statusCode === 200) {
      const { id: resultId } = data;
      const newTodosList = todosList.filter((todo) =>
        todo.id === resultId ? false : true
      );
      setTodosList(newTodosList);
    }
  };

  const handleTodoPriorityChanged = async (id, priority) => {
    const { statusCode, data: newTodo } = await PUT("/api/todo", {
      id: id,
      priority: priority,
    });
    if (statusCode === 200) {
      const newTodosList = todosList.map((todo) =>
        todo.id === id ? newTodo : todo
      );
      setTodosList(newTodosList);
    }
  };

  const handleTodoTitleChanged = async (id, newTitle) => {
    const { statusCode, data } = await PUT("/api/todo", {
      id: id,
      title: newTitle,
    });
    if (statusCode === 200) {
      const newTodosList = todosList.map((todo) => {
        if (todo.id === id) {
          todo.title = newTitle;
        }
        return todo;
      });
      setTodosList(newTodosList);
    }
  };

  const handleAddNewTodo = async () => {
    if (addTodoInputBox.current.value === "") {
      return;
    }
    setIsAddTodoLoading(true);
    const { statusCode, data: newTodo } = await POST("/api/todo", {
      title: addTodoInputBox.current.value,
    });
    if (statusCode === 200) {
      const newTodoList = [...todosList, newTodo];
      setTodosList(newTodoList);
      addTodoInputBox.current.value = "";
    }
    setIsAddTodoLoading(false);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center pt-[20px]">
      <main className="w-[900px] flex flex-col gap-[25px] justify-start items-center">
        <div className="flex flex-row gap-[12px] justify-center items-center">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTimeout(() => {
                  handleAddNewTodo();
                }, 0);
              }
            }}
            ref={addTodoInputBox}
            type="textbox"
            placeholder="What do you need to do?"
            className="bg-gray rounded-[8px] text-center w-[500px] h-[45px]"
          />
          <Button
            isLoading={isAddTodoLoading}
            onClick={() => {
              setTimeout(() => {
                handleAddNewTodo();
              }, 0);
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-col justify-start items-start gap-[10px]">
          <section className="flex flex-col gap-[10px]">
            <p className="text-2xl font-Roboto font-bold">Todos</p>
            <ul className="todos-list scrollbar-hidden flex flex-row h-[125px] hover:h-[200px] w-[900px] gap-[15px] overflow-x-auto transition-height duration-150 ease-in-out">
              {todosList
                .filter((todo) => (todo.completed ? false : true))
                .map((todo) => {
                  return (
                    <li key={todo.id}>
                      <TodoCard
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        deadline={new Date(todo.deadline)}
                        priority={todo.priority}
                        onComplete={handleTodoComplete}
                        onDelete={handleTodoDelete}
                        onPriorityChanged={handleTodoPriorityChanged}
                        onTitleChanged={handleTodoTitleChanged}
                      />
                    </li>
                  );
                })}
            </ul>
          </section>
          <section className="flex flex-col gap-[10px]">
            <p className="text-2xl font-Roboto font-bold">Completed</p>
            <ul className="completed-list scrollbar-hidden flex flex-row h-[125px] hover:h-[200px] w-[900px] gap-[15px] overflow-x-auto transition-height duration-150 ease-in-out">
              {todosList
                .filter((todo) => (todo.completed ? true : false))
                .map((todo) => {
                  return (
                    <li key={todo.id}>
                      <TodoCard
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        deadline={todo.deadline}
                        priority={todo.priority}
                        onComplete={handleTodoComplete}
                        onDelete={handleTodoDelete}
                        onPriorityChanged={handleTodoPriorityChanged}
                        onTitleChanged={handleTodoTitleChanged}
                      />
                    </li>
                  );
                })}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  return {
    redirect: !session
      ? {
          destination: "/v2/home",
          permanent: false,
        }
      : undefined,
    props: {
      useLayout: true,
      session: session,
      navMenuEnable: false,
    },
  };
}
