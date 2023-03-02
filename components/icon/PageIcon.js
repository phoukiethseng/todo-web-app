import { FiClipboard } from "react-icons/fi";

export default function PageIcon({ size = 8 }) {
  return (
    <div
      className={`w-max h-max p-1.5 bg-gradient-to-b from-cyan-200 to-fuchsia-200 shadow-xl rounded-xl border-2 border-teal-500`}
    >
      <FiClipboard className={`w-${size} h-${size} text-slate-800`} />
    </div>
  );
}
