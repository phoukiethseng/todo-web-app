import { addTodo } from "@/utils/backend/addTodo";
import { deleteTodo } from "@/utils/backend/deleteTodo";
import { fetchUserSingleTodo } from "@/utils/backend/fetchUserSingleTodo";
import { updateTodo } from "@/utils/backend/updateTodo";

async function handlePUT(req, res) {
  console.log("handlePUT", req.body);
  const result = await updateTodo(req.body);
  console.log("handlePUT result", result);
  res.status(result ? 200 : 500);
  res.send(JSON.stringify(result));
}

async function handleGET(req, res) {
  const result = await fetchUserSingleTodo(req.body.id);
  res.status(result ? 200 : 500);
  res.send(JSON.stringify(result));
}

async function handlePOST(req, res, userId) {
  console.log("handlePOST", req.body);
  const result = await addTodo({
    userId: userId,
    todo: {
      ...req.body,
    },
  });
  res.status(result ? 200 : 500);
  res.send(JSON.stringify(result));
}

async function handleDELETE(req, res) {
  const result = await deleteTodo(req.body.id);
  res.status(result ? 200 : 500);
  res.send(result);
}

export { handleGET, handlePOST, handleDELETE, handlePUT };
