import Link from "next/link";
import { useTranslation } from "@/app/hooks/useTranslation";

const CallToAction11 = () => {
  const { t } = useTranslation('home');
  
  return (
    <>
      <section className="subscribe-section-two -type-5">
        <div className="auto-container" data-aos="fade-up">
          <div
            className="background-image"
            style={{ backgroundImage: "url(/images/index-17/cta/bg.png)" }}
          ></div>
          {/* End bg-image */}

          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 offset-lg-1">
              <div className="sec-title pb-16">
                <h2 className="">{t('callToAction11.title')}</h2>
                {/* <div className="text">
                  Advertise your jobs to millions of monthly
                  <br /> users and search 15.8 million CVs in our
                  <br /> database.
                </div> */}

                <div className="mt-20">
                  <Link
                    href="/register"
                    className="theme-btn"
                  >
                    {t('callToAction11.button')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End auto-container */}
      </section>
    </>
  );
};

export default CallToAction11;
