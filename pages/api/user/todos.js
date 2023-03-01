import { fetchUserTodos } from "@/utils/fetchTodos";
import { authOptions } from "@/config/nextAuthConfig";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

export default async function getUserTodosList(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(403).end();
    return;
  }
  const token = await getToken({ req });
  const result = await fetchUserTodos(token.sub);
  if (result === null) {
    console.log("api/user/todos 500 code", result);
    // Fetch error
    res.status(500).end();
    return;
  }
  res.send(JSON.stringify(result));
}
