// Display content of all user's todos

import AddTodoPopUp from "@/components/todo/AddTodoPopUp";
import TodoList from "@/components/todo/TodoList";
import { authOptions } from "@/config/nextAuthConfig";
import { getServerSession } from "next-auth";
import { useCallback, useState } from "react";
import { BsPlusSquare } from "react-icons/bs";

export default function TodosPage() {
  const [openAddTodoPopup, setOpenAddTodoPopup] = useState(false);
  const fetchData = useCallback(async () => {
    const response = await fetch("/api/user/todos");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log(response);
    }
  }, []);
  return (
    <>
      {openAddTodoPopup && (
        <AddTodoPopUp onClose={() => setOpenAddTodoPopup(false)} />
      )}
      <div className="flex flex-col justify-start items-stretch space-y-3">
        <TodoList fetchTodoList={fetchData} />
        <BsPlusSquare
          onClick={() => setOpenAddTodoPopup(true)}
          className="w-7 h-7 mx-auto text-gray-700 hover:text-green-700 hover:bg-slate-100 duration-100"
        />
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
