import Button from "@/components/v2/Button";
import { authOptions } from "@/config/nextAuthConfig";
import { getServerSession } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SignInPage({ credentialsError = false }) {
  const [csrfToken, setCsrfToken] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
          <div className="flex flex-col gap-[2px] p-0 justify-center items-center">
            <p className="text-3xl font-SecularOne">Sign In</p>
            <p className="font-Roboto text-xs text-gray-600">
              Didn't have account?{" "}
              <Link href="/auth/signUp" className="text-primary">
                Sign up
              </Link>
            </p>
          </div>
          {credentialsError && (
            <p className="text-secondary text-Roboto font-medium text-xs w-[200px] text-center">
              Username or Password is incorrect, Please try again
            </p>
          )}
          <form
            onSubmit={() => {
              setIsLoading(true);
            }}
            id="signIn"
            method="post"
            action="/api/auth/callback/credentials"
          >
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <div className="flex flex-col gap-[15px]">
              <div className="flex flex-row justify-start items-center border rounded-[8px] w-[270px] h-[35px] pl-[7px] gap-[10px]">
                <img src="/profileIcon.png" />
                <input
                  type="username"
                  placeholder="Username"
                  name="username"
                  className="outline-0 w-full"
                />
              </div>

              <div className="flex flex-row justify-start items-center border rounded-[8px] w-[270px] h-[35px] pl-[7px] gap-[10px]">
                <img src="/keyIcon.png" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="outline-0 w-full"
                />
              </div>
            </div>
          </form>
          <Button
            isLoading={isLoading}
            style={3}
            textSize={2}
            type="submit"
            form="signIn"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query, req, res }) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/v2/home",
        permanent: false,
      },
    };
  }
  return {
    props: {
      credentialsError: query?.error === "CredentialsSignin",
    },
  };
}
