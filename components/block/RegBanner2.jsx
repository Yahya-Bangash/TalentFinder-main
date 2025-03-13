"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

const RegBanner2 = () => {
  const { t } = useTranslation('home');
  const { language } = useLanguage();
  const [regBannerContent, setRegBannerContent] = useState([]);

  useEffect(() => {
    // Get banners from translations
    const banners = t('reg_banner.banners', { returnObjects: true });
    if (Array.isArray(banners) && banners.length > 0) {
      setRegBannerContent(banners);
    } else {
      // Fallback content - keep original text exactly as it was
      setRegBannerContent([
        {
          id: 1,
          name: "Skills",
          text: `Find suitable jobs and strong employers, apply to them or let companies find you easily and conveniently.
With DIGI-X-TECH we offer you a first-class service - personalized and individual.`,
          avatar: "/images/resource/employ.png",
          bannerClass: "banner-style-one",
          width: "221",
          height: "281",
        },
        {
          id: 2,
          name: "Companies",
          text: `Reach a new, international target group of qualified and certified experts. Position yourself with a perfect company profile and job postings.
Our employees will be happy to support you.`,
          avatar: "/images/resource/candidate.png",
          bannerClass: "banner-style-two",
          width: "207",
          height: "283",
        },
      ]);
    }
  }, [t, language]);

  return (
    <>
      {regBannerContent.map((item) => (
        <div
          className={`${item.bannerClass} -type-2 col-lg-6 col-md-12 col-sm-12`}
          key={item.id}
        >
          <div className="inner-box">
            <div className="">
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <Link href="/register" className="theme-btn btn-style-five">
                {t('reg_banner.register_button') || "Register Account"}
              </Link>
            </div>
            {/* <figure className="image">
              <Image
                width={item.width}
                height={item.height}
                src={item.avatar}
                alt="resource"
              />
            </figure> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default RegBanner2;
