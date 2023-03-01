import { useRef } from "react";

export default function AddTodoPopUp({ onClose }) {
  const popup = useRef();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (e.target.id === "popup") {
          return;
        }
        onClose();
      }}
      className="fixed inset-0 w-screen h-screen flex justify-center items-center z-50 bg-slate-900 bg-opacity-50 backdrop-blur-sm"
    >
      <div
        id="popup"
        ref={popup}
        className="w-1/2 h-1/2 rounded-md bg-green-400"
      ></div>
    </div>
  );
}
