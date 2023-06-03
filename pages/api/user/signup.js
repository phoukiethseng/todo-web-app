import { addNewUser } from "@/utils/backend/addNewUser";
import { getUserByUsername } from "@/utils/backend/getUserByUsername";
import { verifyCsrfToken } from "@/utils/backend/verifyCsrfToken";
import { validateCredentials } from "@/utils/backend/validateCredentials";

export default async function handler(req, res) {
  const { username, password, email, name, csrfToken } = req.body;

  // Validate csrf token
  if (!(await verifyCsrfToken({ csrfToken, req })) || !csrfToken) {
    res.status(403);
    res.end();
    return;
  }

  // Validate credentials
  const { valid, message } = await validateCredentials({
    credentials: { username, password, email, name },
    type: {
      signup: true,
    },
  });
  if (!valid) {
    res.status(400);
    res.send({ message: message });
  }
  if (await getUserByUsername(username)) {
    // There is an existing user, deny request
    res.status(400);
    res.send({
      message: {
        username: {
          message: "Username already existed, Please choose another one!",
        },
      },
    });
    return;
  }

  // Add new user
  if (await addNewUser({ name, username, password, email })) {
    res.status(200);
    res.send({ message: "Sign up success!" });
  } else {
    res.status(500);
  }
  res.end();
}
