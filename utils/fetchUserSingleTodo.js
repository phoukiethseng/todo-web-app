import { pb } from "@/config/pocketbaseConfig";
export default async function fetchSingleTodo(id) {
  try {
    console.log("fetchSingleTodo attempt to query pocketbase");
    const todo = await pb.collection("todos").getOne(id);
    console.log("fetchSingleTodo pb return", todo);
    const { id: todoId, name: todoName, content: todoContent } = todo;
    return {
      todoId,
      todoName,
      todoContent,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
