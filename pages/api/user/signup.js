import { addNewUser } from "@/utils/addNewUser";
import getUserByUsername from "@/utils/getUserByUsername";
import { getCsrfToken } from "next-auth/react";

export default async function handler(req, res) {
  //TODO: verify csrfToken
  const { crsfToken: clientCsrfToken } = req.body;
  const serverCsrfToken = await getCsrfToken({ req });
  if (!clientCsrfToken || clientCsrfToken !== serverCsrfToken) {
    res.status(403).end();
    return;
  }
  //TODO: query database, if there is exisiting username, deny request
  const { username, password, email, name } = req.body;
  if (!username || !password || !email || !name) {
    // Invalid request body
    res.status(400).send({ message: "Please check your information again!" });
    return;
  }
  if (await getUserByUsername(username)) {
    // There is an existing user, deny request
    res.status(400).send({
      message: "Username already existed, Please choose another one!",
    });
    return;
  }

  // Add new user
  if (await addNewUser({ name, username, password, email })) {
    res.status(200).send({ message: "Sign up success!" });
  }
}
