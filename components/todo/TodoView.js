export default function TodoView({ name, content }) {
  return (
    <div className="grid grid-cols-3 min-h-[4rem] justify-start items-center border-2 shadow-sm rounded-lg pl-4 space-x-4 hover:bg-slate-100 duration-100">
      <label className="col-span-1">{name}</label>
      <p className="col-span-2">{content}</p>
    </div>
  );
}
