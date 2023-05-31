import AboutMe from "@/components/v2/AboutMe";
import AboutWebTechnology from "@/components/v2/AboutWebTechnology";
import Tab from "@/components/v2/Tab";
import { useState } from "react";

export default function AboutPage() {
  const [tabSelection, setTabSelection] = useState(0);
  return (
    <Tab
      itemComponents={[<AboutMe />, <AboutWebTechnology />]}
      currentSelection={tabSelection}
      itemNames={["About Me", "Web Technology"]}
      onSelectionChange={(newSelection) => setTabSelection(newSelection)}
    />
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
