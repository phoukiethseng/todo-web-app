import Button from "@/components/v2/Button";
import { useRouter } from "next/router";

export default function Error404Page() {
  const router = useRouter();
  return (
    <main className="flex flex-col w-full h-[100vh] py-[50px] justify-center items-center bg-primary">
      <h1 className="font-Roboto font-medium text-white text-3xl">
        Uh Oh, We can not find page you’re looking for
      </h1>
      <img src="/Character-with-404-error-message.png" />
      <Button
        textSize={1}
        onClick={() => {
          router.push("/v2/home");
        }}
      >
        Go to Homepage
      </Button>
    </main>
  );
}
