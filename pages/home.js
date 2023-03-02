import LoadingPage from "@/components/loading/LoadingPage";
import NavButton from "@/components/NavButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading")
    return (
      <>
        <LoadingPage />
      </>
    );
  return (
    <>
      {session && (
        <>
          <div className="w-full flex flex-col justify-center items-center space-y-6">
            <p className="text-2xl font-bold">Welcome {session?.user?.name}!</p>
            <NavButton
              action={() => {
                router.push("/todos");
              }}
            >
              View Todos
            </NavButton>
          </div>
        </>
      )}

      {!session && (
        <>
          <p>You have not sign in</p>
          <a href="api/auth/signin">Sign in</a>
        </>
      )}
    </>
  );
}
