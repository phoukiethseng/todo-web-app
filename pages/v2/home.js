import Button from "@/components/v2/Button";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <nav className="flex flex-row justify-between items-center px-[30px] py-[15px]">
        <Link href="/v2/home">
          <div className="flex flex-row gap-x-[5px] items-center">
            <img
              id="appIcon"
              src="/appIcon.png"
              className="w-[40px] h-[40px]"
            />
            <label for="appIcon" className="font-SecularOne text-lg text-black">
              TODOs Web App
            </label>
          </div>
        </Link>
        <ul
          className="flex flex-row gap-x-9
        "
        >
          <li>
            <Link href="/v2/about" className="font-medium hover:text-secondary">
              About
            </Link>
          </li>
          <li>
            <Link href="/v2/help" className="font-medium hover:text-secondary">
              Help
            </Link>
          </li>
        </ul>
        <div>
          <Button style={2}>Sign In</Button>
          <Button style={1}>Sign Up</Button>
        </div>
      </nav>
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
          <Button textSize={2}>Getting Started</Button>
          <Link href="/v2/signIn" className="mt-[-15px]">
            or Sign In
          </Link>
        </section>
      </main>
    </>
  );
}
