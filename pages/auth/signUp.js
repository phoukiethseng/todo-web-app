import Link from "next/link";
import Button from "@/components/v2/Button";
import { useState, useEffect, useRef } from "react";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
export default function SignUpPage() {
  const name = useRef();
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const [csrfToken, setCsrfToken] = useState();

  // Keep track of each field validity state and its invalid messages
  const [validationList, setValidationList] = useState({
    name: {
      invalid: false,
      message: "",
    },
    email: {
      invalid: false,
      message: "",
    },
    username: {
      invalid: false,
      message: "",
    },
    password: {
      invalid: false,
      message: "",
    },
  });

  const router = useRouter();

  const handleSignInSubmit = async () => {
    const response = await fetch("/api/user/signup", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        name: name.current.value,
        email: email.current.value,
        username: username.current.value,
        password: password.current.value,
        csrfToken: csrfToken,
      }),
    });
    const body = await response.json();
    if (response.ok) {
      router.push("/auth/signIn");
    } else {
      const currentValidationList = { ...validationList };
      for (const [key, value] of Object.entries(body.message)) {
        currentValidationList[key].invalid = true;
        currentValidationList[key].message = value.message;
      }
      setValidationList(currentValidationList);
    }
  };

  useEffect(() => {
    getCsrfToken().then((result) => {
      setCsrfToken(result);
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh]">
      <div className="flex flex-row justify-center items-center w-full gap-[80px] py-[37px] bg-primary">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center gap-[10px]">
            <img src="/appIcon.png" className="w-[60px] h-[60px]" />
            <p className="font-SecularOne text-4xl text-white">TODOs Web App</p>
          </div>
          <img
            src="/Character-Sitting-Working.png"
            className="w-[400px] h-[400]"
          />
        </div>
        <div className="px-[30px] py-[40px] flex flex-col justify-start items-center gap-[26px] bg-white rounded-[25px]">
          <div className="flex flex-col justify-center items-center gap-[3px]">
            <p className="text-3xl text-Roboto font-bold">
              Create a new account
            </p>
            <p className="text-xs">
              Already have an account?{" "}
              <Link href="/auth/signIn" className="text-primary">
                Sign In
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-[12px]">
            <div>
              <div className="flex flex-row justify-start items-center border rounded-[8px] w-[270px] h-[35px] pl-[7px] gap-[20px]">
                <input
                  ref={name}
                  type="name"
                  name="name"
                  placeholder="Name"
                  className="outline-0 w-full"
                />
              </div>
              {validationList["name"].invalid && (
                <p className="pl-[5px] m-[0px] text-secondary text-xs">
                  {validationList["name"].message}
                </p>
              )}
            </div>
            <div>
              <div className="flex flex-row justify-start items-center border rounded-[8px] w-[270px] h-[35px] px-[7px] gap-[10px]">
                <input
                  ref={email}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="outline-0 w-full"
                />
              </div>
              {validationList["email"].invalid && (
                <p className="pl-[5px] m-[0px] text-secondary text-xs">
                  {validationList["email"].message}
                </p>
              )}
            </div>
            <div>
              <div className="flex flex-row justify-start items-center border rounded-[8px] w-[270px] h-[35px] px-[7px] gap-[10px]">
                <input
                  ref={username}
                  type="username"
                  name="username"
                  placeholder="Username"
                  className="outline-0 w-full"
                />
              </div>
              {validationList["username"].invalid && (
                <p className="pl-[5px] m-[0px] text-secondary text-xs">
                  {validationList["username"].message}
                </p>
              )}
            </div>
            <div>
              <div className="flex flex-row justify-start items-center border rounded-[8px] w-[270px] h-[35px] px-[7px] gap-[10px]">
                <input
                  ref={password}
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="outline-0 w-full"
                />
              </div>
              {validationList["password"].invalid && (
                <p className="pl-[5px] m-[0px] text-secondary text-xs">
                  {validationList["password"].message}
                </p>
              )}
            </div>
          </div>
          <Button
            style={3}
            textSize={2}
            onClick={() => {
              handleSignInSubmit();
            }}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
