import Button from "@/components/Button";
import LoadingPage from "@/components/loading/LoadingPage";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
      <div className="w-full min-h-[150px] flex flex-col justify-center items-center gap-6">
        {session && (
          <>
            <p className="text-2xl font-bold text-slate-700">
              Welcome {session?.user?.name}!
            </p>
            <Button onClick={() => router.push("/todos")}>View Todos</Button>
          </>
        )}

        {!session && (
          <>
            <p className="text-2xl font-bold text-slate-700">
              You are not signed in
            </p>
            <div className="flex flex-row gap-3 justify-center items-center">
              <Link href="/api/auth/signin">
                <Button>Sign in</Button>
              </Link>
              <p className="text-xl">or</p>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: {
      useLayout: true,
    },
  };
}
