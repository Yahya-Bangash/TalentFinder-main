import Link from "next/link";
import ApplicantsList from "./ApplicantsList";
import Image from "next/image";
import { useTranslation } from "@/app/hooks/useTranslation";

const About2 = () => {
  const { t } = useTranslation('common');

  return (
    <>
      {/* <!-- Content Column --> */}
      <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
        <div className="inner-column" data-aos="fade-left">
          <div className="sec-title">
            <h2>
              {t('About2.company_name')}
            </h2>
            <div className="text">
              {t('About2.description')}
            </div>
            <div className="font-semibold mt-6">
              {t('About2.subtitle')}
            </div>
          </div>
          {/* <ul className="list-style-one">
            <li>Bring to the table win-win survival</li>
            <li>Capitalize on low hanging fruit to identify</li>
            <li>But I must explain to you how all this</li>
          </ul> */}
          <Link
            href="/register"
            className="theme-btn btn-style-one"
          >
            {t('About2.signup_button')}
          </Link>
        </div>
      </div>
      {/* End .content-column */}

      {/* <!-- Image Column --> */}
      <div className="image-column col-lg-6 col-md-12 col-sm-12">
        <figure className="image-box" data-aos="fade-right">
          <Image
            width={660}
            height={540}
            src="/images/resource/image-3.png"
            alt="resource"
          />
        </figure>

        {/* <!-- Count Employers --> */}
        {/* <div className="applicants-list" data-aos="fade-up">
          <div className="title-box">
            <h4>Applicants List</h4>
          </div>
          <ul className="applicants">
            <ApplicantsList />
          </ul>
        </div> */}
      </div>
      {/* End image-column */}
    </>
  );
};

export default About2;
