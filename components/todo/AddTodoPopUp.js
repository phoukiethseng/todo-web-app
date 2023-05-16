import { useCallback, useRef } from "react";
import Button from "../Button";

export default function AddTodoPopUp({ onClose, onSubmit }) {
  const name = useRef();
  const content = useRef();
  const outter = useRef();

  const handleSubmit = useCallback((e) => {
    console.log(name, content);
    e.preventDefault();
    if (name.current.value !== "") {
      onSubmit(name.current.value, content.current.value);
    }
  });

  const handleCancel = useCallback((e) => {
    onClose();
  });

  return (
    <div
      ref={outter}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === outter.current) {
          onClose();
        }
      }}
      className="fixed inset-0 w-screen h-screen flex justify-center items-center z-50 bg-slate-900 bg-opacity-50 backdrop-blur-sm"
    >
      <div className="p-5 rounded-md bg-[#EFFDF3] flex flex-col justify-center items-stretch space-y-3">
        <input
          ref={name}
          name="name"
          required
          type="text"
          placeholder="Title"
          className="w-[50vw] h-10 pl-3 rounded-md drop-shadow"
        />
        <textarea
          rows={10}
          cols={50}
          ref={content}
          name="content"
          className="w-[50vw] h-[50vh] pl-3 py-6 rounded-md drop-shadow"
        />
        <Button onClick={handleSubmit}>Add</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
}
