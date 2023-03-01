export default function NavButton({ children, action, href }) {
  return (
    <a href={href}>
      <button
        onClick={() => {
          if (action) {
            // prevent invocation to undefined props
            action();
          }
        }}
        className="w-max px-3 py-2 font-bold border-2 border-slate-600 hover:bg-slate-200 active:bg-slate-500 active:text-white rounded-full text-center duration-200 ease-in-out text-slate-600"
      >
        {children}
      </button>
    </a>
  );
}
