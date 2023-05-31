import Loading from "./Loading";

export default function Button({
  children,
  onClick = () => {},
  style = 0,
  textSize = 0,
  padding = 0,
  isLoading = false,
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
      disabled={isLoading}
      onClick={onClick}
      className={`
      min-w-[100px]
      ${styleList[style % styleList.length]}
      text-${
        textSizeList[textSize % textSizeList.length]
      } font-medium rounded-[30px] ${
        paddingList[padding % paddingList.length]
      }`}
      {...rest}
    >
      {!isLoading && children}
      {isLoading && (
        <div className="w-full h-full flex flex-row justify-center items-center">
          <Loading width={25} height={25} />
        </div>
      )}
    </button>
  );
}
