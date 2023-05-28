import Button from "@/components/v2/Button";
import NavBar from "@/components/v2/layout/NavBar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/nextAuthConfig";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <main className="flex flex-col justify-start overflow-x-clip">
      <section className="relative flex flex-col gap-y-6 justify-center items-center w-full">
        <h1 className="font-SecularOne relative mt-[160px] text-5xl font-bold text-black-800 leading-[55px]">
          Keeping track of your{" "}
          <em className="not-italic text-secondary">todos</em>
          <br />
          has never been this easy
          <img
            src="/male_character_1.png"
            className="absolute left-[75%] top-[-100%]"
          />
          <div className="absolute h-[300px] w-[50vw] bg-primary border-0 rounded-[30px] -z-50 left-[105%] top-0"></div>
        </h1>
        <Button
          textSize={2}
          onClick={() => {
            if (session) {
              router.push("/v2/todos");
            } else {
              router.push("/api/auth/signin");
            }
          }}
        >
          Getting Started
        </Button>
        {!session && (
          <Link href="/auth/signIn" className="mt-[-15px]">
            or Sign In
          </Link>
        )}
      </section>
    </main>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/v2/todos",
        permanent: false,
      },
    };
  }
  return {
    props: {
      useLayout: true,
      session: session,
      navMenuEnable: true,
    },
  };
}
