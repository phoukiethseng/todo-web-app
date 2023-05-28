export default function AboutPage() {
  return (
    <main className="flex flex-col justify-start items-center mt-[80px] mx-auto w-[583px] gap-[30px]">
      <h1 className="font-Roboto text-4xl font-light">Who made this?</h1>
      <section className="flex flex-col justify-start items-center gap-[10px]">
        <img
          className="w-[120px] h-[120px] rounded-full"
          src="/phou-kiethseng.jpeg"
        />
        <p className="font-Roboto text-3xl font-semibold">Phou Kiethseng</p>
        <p className="text-center text-xl leading-7">
          <b>Age:</b> 23
          <br />
          <b>Location:</b> XinXiang, Henan, China
          <br />
          <em>
            Currently studying Computer Science at{" "}
            <b>Henan Normal University</b>
          </em>
        </p>
      </section>
      <section>
        <p className="font-Roboto font-light text-xl">
          Hi I am an Cambodian 🇰🇭 aspiring web developer. This is my first
          project intended to expand my skill and knowledge about modern web
          development
        </p>
      </section>
      <section className="flex flex-row gap-[10px] justify-between gap-[5px]">
        <a href="https://github.com/phoukiethseng/">
          <img className="w-[43px] h-[43px]" src="/github-logo.png" />
        </a>
        <img className="w-[40px] h-[40px]" src="/twitter-logo.png" />
      </section>
    </main>
  );
}

export function getServerSideProps() {
  return {
    props: {
      useLayout: true,
      navMenuEnable: true,
    },
  };
}
