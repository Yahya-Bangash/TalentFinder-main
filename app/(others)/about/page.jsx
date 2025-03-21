import dynamic from "next/dynamic";

import About from "@/components/pages-menu/about";

export const metadata = {
  title: 'About || DIGI-X-TECH - Job Board React NextJS Template',
  description: 'DIGI-X-TECH - Job Board React NextJS Template',
}

const index = () => {
  return (
    <>
      <About />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
