import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import PageIcon from "../icon/PageIcon";
import NavButton from "../NavButton";
export default function MainLayout({ children }) {
  console.log("MainLayout");
  const { status, data } = useSession();
  return (
    <>
      <nav className="fixed top-0 w-screen h-16 flex flex-row justify-between items-center drop-shadow-md pl-4 pr-6 bg-gradient-to-r from-[#00C071] to-[#9DDC10] bg-transparent ">
        <div className="flex flex-row h-full items-center space-x-8">
          <a href="/">
            <div className="flex flex-row justify-center items-center w-max space-x-4">
              <PageIcon />
              <label className="text-lg font-extrabold text-white drop-shadow-lg">
                TODOs Web App
              </label>
            </div>
          </a>
          <div className="space-x-4 font-bold text-white drop-shadow-lg text-lg">
            <Link href="/home" className="hover:drop-shadow-xl duration-100">
              Home
            </Link>
            <Link href="/todos" className="hover:drop-shadow-xl duration-100">
              Todos
            </Link>
          </div>
        </div>
        {status === "authenticated" && (
          <div className="flex flex-row space-x-3 justify-end items-center">
            <img
              src={data.user.image}
              className="w-10 h-10 rounded-full object-center shadow-lg hover:border-2 hover:border-white duration-100"
            />
            <p className="font-bold text-white drop-shadow-xl text-md">
              {data.user.name}
            </p>
            <NavButton href="/api/auth/signout">Sign out</NavButton>
          </div>
        )}
        {status === "unauthenticated" && (
          <NavButton action={signIn} className="text-slate-600">
            Sign in
          </NavButton>
        )}
      </nav>
      <main className="mt-20">{children}</main>
    </>
  );
}
