import { addNewUser } from "@/utils/backend/addNewUser";
import { getUserByUsername } from "@/utils/backend/getUserByUsername";
import { getCsrfToken } from "next-auth/react";
import { Validator } from "node-input-validator";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  //TODO: verify csrfToken
  const { csrfToken: clientCsrfToken } = req.body;
  const serverCsrfToken = await getCsrfToken({ req });
  if (!clientCsrfToken || clientCsrfToken !== serverCsrfToken) {
    res.status(403).end();
    return;
  }
  // Validate request
  const { username, password, email, name } = req.body;
  const credentialsValidator = new Validator(req.body, {
    email: "required|email",
    name: "required|maxLength:50",
    username: "required|maxLength:30|alphaNumeric",
    password: "required|minLength:8|maxLength:50",
  });
  const valid = await credentialsValidator.check();
  if (!valid) {
    console.log("credentialsValidator.errors", credentialsValidator.errors);
    res.status(400).send({
      message: credentialsValidator.errors,
    });
    return;
  }
  if (await getUserByUsername(username)) {
    // There is an existing user, deny request
    res.status(400).send({
      message: {
        username: {
          message: "Username already existed, Please choose another one!",
        },
      },
    });
    return;
  }

  // Salt and hash password
  const saltRound = 12;
  const hashedPassword = await bcrypt.hash(password, saltRound);

  // Add new user
  if (await addNewUser({ name, username, password: hashedPassword, email })) {
    res.status(200).send({ message: "Sign up success!" });
  }
}
