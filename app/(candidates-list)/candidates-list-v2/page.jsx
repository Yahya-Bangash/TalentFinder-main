import dynamic from "next/dynamic";

import CandidatesList from "@/components/candidates-listing-pages/candidates-list-v2";

export const metadata = {
  title: 'Candidates List V2 || DIGI-X-TECH - Job Borad React NextJS Template',
  description:
    'DIGI-X-TECH - Job Borad React NextJS Template',
  
}


const index = () => {
  return (
    <>
     
      <CandidatesList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
