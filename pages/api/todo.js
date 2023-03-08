import { authOptions } from "@/config/nextAuthConfig";
import addTodo from "@/utils/addTodo";
import deleteTodo from "@/utils/deleteTodo";
import fetchSingleTodo from "@/utils/fetchUserSingleTodo";
import updateTodo from "@/utils/updateTodo";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(403).end();
    return;
  }
  // TODO: Prevent request to todo that does not belong to currently logged-in user

  switch (req.method) {
    case "GET":
      handleGET(req, res);
      break;
    case "POST":
      handlePOST(req, res, session.user.id);
      break;
    case "DELETE":
      handleDELETE(req, res);
      break;
    case "PUT":
      handlePUT(req, res);
      break;
    default:
      res.status(405).end();
  }
}

async function handlePUT(req, res) {
  console.log("handlePUT", req.body);
  const todo = await updateTodo(req.body);
  res.status(todo ? 200 : 500).end();
}

async function handleGET(req, res) {
  const result = await fetchSingleTodo(req.body.id);
  if (result === null) {
    res.status(404).end();
    return;
  }
  res.send(JSON.stringify(result));
}

async function handlePOST(req, res, userId) {
  console.log("handlePOST", req.body.name);
  const result = await addTodo({
    userId: userId,
    todo: {
      name: req.body.name,
      content: req.body.content,
    },
  });
  res.status(result ? 200 : 500).end();
}

async function handleDELETE(req, res) {
  const result = await deleteTodo(req.body.id);
  res.status(result ? 200 : 500).end();
}
