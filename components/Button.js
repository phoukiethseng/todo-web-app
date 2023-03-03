export default function Button({ onClick, children }) {
  console.log("button render");
  return (
    <button
      onClick={onClick}
      className="border-2 border-[#00C071] hover:border-[#005261] bg-[#00C071] hover:bg-[#005261] rounded-xl px-4 py-3 font-bold text-white col-span-1 drop-shadow-md duration-100"
    >
      {children}
    </button>
  );
}
