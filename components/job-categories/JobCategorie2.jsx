import Link from "next/link";
import membershipServices from "../../data/membershipServices";
import { useTranslation } from "@/app/hooks/useTranslation";

const JobCategorie2 = () => {
  const { t } = useTranslation('skills');

  return (
    <>
      {membershipServices.slice(0, 8).map((item) => (
        <div
          className="category-block-two col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex"
          key={item.id}
        >
          <div className="inner-box  flex-column h-100">
            <div className="content flex-grow-1">
              <span className={`icon ${item.icon}`}></span>
              <h4>
                <Link href="/job-list-v2">{t(`membershipServices.services.${item.id - 1}.title`)}</Link>
              </h4>
              <p>{t(`membershipServices.services.${item.id - 1}.content`)}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobCategorie2;
