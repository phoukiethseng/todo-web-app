import { authOptions } from "@/config/nextAuthConfig";
import fetchSingleTodo from "@/utils/fetchUserSingleTodo";
import { getServerSession } from "next-auth";

export default async function getSingleTodo(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(403).end();
    return;
  }
  // TODO: Prevent request to todo that does not belong to currently logged-in user
  const result = await fetchSingleTodo(req.query.todoId);
  if (result === null) {
    res.status(404).end();
    return;
  }

  res.send(JSON.stringify(result));
}
