import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/app/hooks/useTranslation";

const About = () => {
  const { t } = useTranslation('aboutUs');
  
  return (
    <>
      <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
        <div className="" data-aos="fade-left">
          <div className="sec-title">
            <h2>{t('about.title')}</h2>
            <div className="text">
              {t('about.description')}
            </div>
          </div>
          <ul className="list-style-one">
            {t('about.features') && Array.isArray(t('about.features')) ? 
              t('about.features').map((feature, index) => (
                <li key={index}>{feature}</li>
              )) : 
              <>
                <li>Bring to the table win-win survival</li>
                <li>Capitalize on low hanging fruit to identify</li>
                <li>But I must explain to you how all this</li>
              </>
            }
          </ul>
          <Link href="/register" className="theme-btn btn-style-one bg-blue">
            <span className="btn-title">{t('about.cta_button')}</span>
          </Link>
        </div>
      </div>
      {/* End .col about left content */}

      <div className="image-column col-lg-6 col-md-12 col-sm-12">
        <figure className="image" data-aos="fade-right">
          <Image
            width={500}
            height={500}
            src="/images/resource/image-2.jpg"
            alt={t('about.image.alt') || "about"}
          />
        </figure>

        {/* <!-- Count Employers --> */}
        {/* <div className="count-employers " data-aos="flip-right">
          <div className="check-box">
            <span className="flaticon-tick"></span>
          </div>
          <span className="title">300k+ Employers</span>
          <figure className="image">
            <Image
              width={234}
              height={61}
              layout="responsive"
              src="/images/resource/multi-logo.png"
              alt="resource"
            />
          </figure>
        </div> */}
      </div>
      {/* <!-- Image Column --> */}
    </>
  );
};

export default About;
