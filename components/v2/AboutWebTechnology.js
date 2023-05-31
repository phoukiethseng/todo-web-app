export default function AboutWebTechnology() {
  return (
    <div className="flex flex-row flex-wrap gap-[40px] justify-start items-center">
      <div className="flex flex-row justify-center items-center rounded-[15px] cursor-pointer w-[190px] h-[190px] hover:bg-gray-lightest">
        <a href="http://reactjs.org">
          <img src="/react-logo.svg" className="object-contain object-center" />
        </a>
      </div>
    </div>
  );
}
