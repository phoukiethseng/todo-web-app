import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  return (
    <div>
      <h1>TODOs Web Application</h1>
      <p>Save your important tasks on cloud</p>
      <button onClick={() => router.push("/home")}>Get started</button>
    </div>
  );
}
