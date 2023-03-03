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
        className="w-max px-3 py-2 font-bold border-2 hover:border-[#F39000] hover:bg-[#F39000] rounded-full text-center duration-100 ease-in-out text-white"
      >
        {children}
      </button>
    </a>
  );
}
