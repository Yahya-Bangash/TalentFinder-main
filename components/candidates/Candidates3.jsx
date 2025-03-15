import Link from "next/link";
import candidates from "../../data/candidates";
import Image from "next/image";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect, useState } from "react";

const Candidates3 = () => {
  const { t } = useTranslation('aboutUs');
  const [teamMembers, setTeamMembers] = useState([]);
  
  useEffect(() => {
    const candidatesData = t('candidates3.candidates');
    if (Array.isArray(candidatesData) && candidatesData.length > 0) {
      setTeamMembers(candidatesData);
    } else {
      // Fallback to static data if translations not available
      setTeamMembers(candidates.slice(12, 17));
    }
  }, [t]);
  
  return (
    <>
      {candidates.slice(12, 17).map((candidate) => (
        <div
          className="candidate -type-1 col-xl-auto col-lg-3 col-md-6 col-sm-12"
          key={candidate.id}
        >
          <div className="image">
            <Image
              width={230}
              height={301}
              src={candidate.avatar}
              alt="image"
            />
          </div>

          <div className="content">
            <h4>
              <Link href={`/candidates-single-v1/${candidate.id}`}>
                {candidate.name}
              </Link>
            </h4>
            <p>{candidate.designation}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Candidates3;
