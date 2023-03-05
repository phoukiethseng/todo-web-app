import Button from "@/components/Button";
import { authOptions } from "@/config/nextAuthConfig";
import { getServerSession } from "next-auth";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRef, useState, useCallback } from "react";

export default function SignUpPage({ crsfToken }) {
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [inputValid, setInputValid] = useState({
    email: true,
    name: true,
    username: true,
    password: true,
  });
  const emailRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSignUpSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await Promise.resolve().then(() => setShowMessage(false));
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crsfToken: crsfToken,
          email: emailRef.current.value,
          name: nameRef.current.value,
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      const body = await response.json();
      let message = "";
      const newInputValid = {
        email: true,
        name: true,
        username: true,
        password: true,
      };
      if (response.ok) {
        // Sign up success
        message = body.message;
      } else {
        // Sign up failed

        for (const [key, value] of Object.entries(body.message)) {
          newInputValid[key] = false;
          message = message.concat(body.message[key].message + "\n");
        }
      }
      setInputValid(newInputValid);
      setSignUpSuccess(response.ok);
      setMessage(message);
      setShowMessage(true);
      if (response.ok) {
        setTimeout(() => {
          signIn();
        }, 2000);
      }
    },
    [inputValid]
  );
  return (
    <div className="flex flex-col gap-4 py-8 justify-center items-center border-2 w-[50vw] mx-auto rounded-xl">
      <form
        onSubmit={handleSignUpSubmit}
        className="flex flex-col gap-5 justify-center items-strech w-[80%] text-slate-700"
      >
        <fieldset className="flex flex-col justify-center items-stretch gap-2">
          <label htmlFor="email" className="font-bold text-lg">
            Email
          </label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="text"
            className={`py-2 pl-3 rounded-lg font-semibold border-2 ${
              inputValid.email ? "border-slate-300" : "border-red-500"
            }`}
          />
        </fieldset>
        <fieldset className="flex flex-col justify-center items-stretch gap-2">
          <label htmlFor="name" className="font-bold text-lg">
            Name
          </label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            type="text"
            className={`py-2 pl-3 rounded-lg font-semibold border-2 ${
              inputValid.name ? "border-slate-300" : "border-red-500"
            }`}
          />
        </fieldset>
        <fieldset className="flex flex-col justify-center items-stretch gap-2">
          <label htmlFor="username" className="font-bold text-lg">
            Username
          </label>
          <input
            ref={usernameRef}
            id="username"
            name="username"
            type="text"
            className={`py-2 pl-3 rounded-lg font-semibold border-2 ${
              inputValid.username ? "border-slate-300" : "border-red-500"
            }`}
          />
        </fieldset>
        <fieldset className="flex flex-col justify-center items-stretch gap-2">
          <label htmlFor="password" className="font-bold text-lg">
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
            className={`py-2 pl-3 rounded-lg font-semibold border-2 ${
              inputValid.password ? "border-slate-300" : "border-red-500"
            }`}
          />
        </fieldset>
        <Button type="submit" className="mt-2">
          Sign up
        </Button>
      </form>
      {showMessage && signUpSuccess && (
        <p className="font-bold text-lg text-slate-700 w-[80%]">{message}</p>
      )}
      {showMessage && !signUpSuccess && (
        <p className="font-bold text-lg text-red-500 w-[80%]">{message}</p>
      )}
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const crsfToken = await getCsrfToken({ req });
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: {
      crsfToken,
    },
  };
}
