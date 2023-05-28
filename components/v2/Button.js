import { colorPalette } from "@/lib/colors";
export default function Button({
  children,
  onClick = () => {},
  style = 0,
  textSize = 0,
  padding = 0,
  ...rest
}) {
  const styleList = [
    "border border-secondary bg-secondary text-white hover:border-secondary-800 hover:bg-secondary-800",
    "border border-secondary text-secondary hover:border-secondary hover:bg-secondary hover:text-white",
    "border-0 text-black-800 hover:text-secondary",
  ];
  const textSizeList = ["", "lg", "xl", "2xl", "3xl"];
  const paddingList = ["px-[20px] py-[8px]", "px-[10px] py-[4px]"];

  return (
    <button
      onClick={onClick}
      className={`
      ${styleList[style % styleList.length]}
      text-${
        textSizeList[textSize % textSizeList.length]
      } font-medium rounded-[30px] ${
        paddingList[padding % paddingList.length]
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
