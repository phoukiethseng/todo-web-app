import { AiOutlineLoading } from "react-icons/ai";
export default function LoadingPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center animate animate-pulse">
      <AiOutlineLoading className="animate-spin w-20 h-20" />
    </div>
  );
}
