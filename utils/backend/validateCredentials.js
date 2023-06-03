import { Validator } from "node-input-validator";

async function validateCredentials({ credentials, type: { signup } }) {
  if (signup) {
    const credentialsValidator = new Validator(credentials, {
      email: "required|email",
      name: "required|maxLength:50",
      username: "required|maxLength:30|alphaNumeric",
      password: "required|minLength:8|maxLength:50",
    });
    const valid = await credentialsValidator.check();
    return {
      valid: valid,
      message: credentialsValidator.errors,
    };
  }

  throw new Error("Invalid type of validation");
}

export { validateCredentials };
