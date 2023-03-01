import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiClipboard } from "react-icons/fi";
import NavButton from "../NavButton";
export default function MainLayout({ children }) {
  console.log("MainLayout");
  const { status } = useSession();
  return (
    <>
      <nav className="fixed top-0 w-screen h-16 flex flex-row justify-between items-center drop-shadow-md border-x-2 pl-3 pr-6 bg-gradient-to-br from-cyan-200 to-green-200 bg-transparent ">
        <div className="flex flex-row h-full items-center space-x-8">
          <a href="/">
            <div className="flex flex-row justify-center items-center w-max space-x-2">
              <FiClipboard className="w-9 h-9 text-slate-800" />
              <label className="text-xl font-extrabold text-slate-800">
                TODOs Web App
              </label>
            </div>
          </a>
          <div className="space-x-4 font-bold text-slate-600 text-lg">
            <Link href="/home" className="hover:text-slate-900">
              Home
            </Link>
            <Link href="/todos" className="hover:text-slate-900">
              Todos
            </Link>
          </div>
        </div>
        {status === "authenticated" && (
          <NavButton href="/api/auth/signout">Sign out</NavButton>
        )}
        {status === "unauthenticated" && (
          <NavButton action={signIn}>Sign in</NavButton>
        )}
      </nav>
      <main className="mt-16 p-4">{children}</main>
    </>
  );
}
