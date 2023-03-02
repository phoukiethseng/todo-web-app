import PageIcon from "@/components/icon/PageIcon";
import NavButton from "@/components/NavButton";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-[#00C071] to-[#9DDC10] flex flex-col justify-center items-center space-y-5 drop-shadow-lg">
      <PageIcon size={20} />
      <h1 className="font-bold text-6xl text-white drop-shadow-xl">
        TODOs Web Application
      </h1>
      <p className="font-base text-3xl text-white drop-shadow-lg">
        Save your important tasks on cloud
      </p>
      <NavButton textSize="xl" action={() => router.push("/home")}>
        Get Started
      </NavButton>
    </div>
  );
}
