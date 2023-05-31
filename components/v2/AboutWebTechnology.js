export default function AboutWebTechnology() {
  return (
    <div className="flex flex-row flex-wrap gap-[40px] justify-start items-center">
      <div className="flex flex-row justify-center items-center rounded-[15px] cursor-pointer w-[190px] h-[190px] p-[20px] hover:bg-gray-lightest">
        <a href="https://reactjs.org">
          <img src="/react-logo.svg" className="object-contain object-center" />
        </a>
      </div>
      <div className="flex flex-row justify-center items-center rounded-[15px] cursor-pointer w-[190px] h-[190px] p-[20px] hover:bg-gray-lightest">
        <a href="https://nextjs.org">
          <img
            src="/Nextjs-logo.svg"
            className="object-contain object-center"
          />
        </a>
      </div>
      <div className="flex flex-row justify-center items-center rounded-[15px] cursor-pointer w-[190px] h-[190px] p-[20px] hover:bg-gray-lightest">
        <a href="https://tailwindcss.com">
          <img
            src="/TailwindCSS-logo.svg"
            className="object-contain object-center"
          />
        </a>
      </div>
      <div className="flex flex-row justify-center items-center rounded-[15px] cursor-pointer w-[190px] h-[190px] p-[20px] hover:bg-gray-lightest">
        <a href="https://prisma.io">
          <img
            src="/prismaORM-logo.svg"
            className="object-contain object-center"
          />
        </a>
      </div>
      <div className="flex flex-row justify-center items-center rounded-[15px] cursor-pointer w-[190px] h-[190px] p-[20px] hover:bg-gray-lightest">
        <a href="https://postgresql.org">
          <img
            src="/postgresql-logo.svg"
            className="object-contain object-center"
          />
        </a>
      </div>
    </div>
  );
}
