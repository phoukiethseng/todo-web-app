import { authOptions } from "@/config/nextAuthConfig";
import { getServerSession } from "next-auth";
import {
  handleGET,
  handlePOST,
  handleDELETE,
  handlePUT,
} from "@/utils/backend/todo/methodHandler";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(403);
    res.end();
    return;
  }
  // TODO: Prevent request to todo that does not belong to currently logged-in user

  switch (req.method) {
    case "GET":
      await handleGET(req, res);
      break;
    case "POST":
      await handlePOST(req, res, session.user.id);
      break;
    case "DELETE":
      await handleDELETE(req, res);
      break;
    case "PUT":
      await handlePUT(req, res);
      break;
    default:
      res.status(405);
      res.end();
  }
  res.end();
}
