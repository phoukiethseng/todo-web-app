import LoadingPage from "@/components/loading/LoadingPage";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();
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
          <p>Welcome {session?.user?.name}</p>
          <a href="api/auth/signout">Sign out</a>
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
