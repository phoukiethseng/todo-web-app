import { FiTrash2 } from "react-icons/fi";
export default function TodoItem({ id, name, content, onDelete }) {
  return (
    <div className="grid grid-cols-3 min-h-[4rem] text-center items-center border-2 shadow-sm rounded-lg pl-4 hover:bg-slate-100 duration-100">
      <label className="overflow-x-hidden">{name}</label>
      <p className="overflow-x-hidden">{content}</p>
      <FiTrash2
        onClick={() => {
          console.log("todoitem clicked");
          onDelete(id);
        }}
        className="w-8 h-8 p-1 mx-auto my-0 duration-100 rounded-md border-2 border-slate-800 hover:text-red-600 hover:border-red-600"
      />
    </div>
  );
}
