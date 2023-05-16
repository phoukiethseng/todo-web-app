import { colorPalette } from "@/lib/colors";
export default function Button({
  children,
  onClick = () => {},
  type = "",
  style = 0,
  textSize = 0,
}) {
  const styleList = [
    "border border-secondary bg-secondary text-white hover:border-secondary-800 hover:bg-secondary-800",
    "border border-secondary text-secondary hover:border-secondary hover:bg-secondary hover:text-white",
    "border-0 text-black-800 hover:text-secondary",
  ];
  const textSizeList = ["base", "lg", "xl", "2xl", "3xl"];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-${
        textSizeList[textSize % textSizeList.length]
      } font-medium rounded-[30px] px-[20px] py-[8px] ${
        styleList[style % styleList.length]
      }`}
    >
      {children}
    </button>
  );
}
