"use client";

import Image from "next/image";
import CopyrightFooter from "../footer/common-footer/CopyrightFooter";
import FooterContent2 from "../footer/FooterContent2";
import { useTranslation } from "@/app/hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation('common');
  
  return (
    <footer className="main-footer style-two">
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-4 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <a href="#">
                    <Image
                  width={98}
                  height={1}
                  src="/images/jordii-logo.png"
                  alt="brand"
                />
                  </a>
                </div>
                <p className="phone-num">
                  <span>{t('index.footer.contact.call_us')} </span>
                  <a href={`tel:${t('index.footer.contact.phone')}`}>{t('index.footer.contact.phone')}</a>
                </p>
                <p className="address">
                  {t('index.footer.contact.address').split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < t('index.footer.contact.address').split('\n').length - 1 && <br />}
                    </span>
                  ))}
                  <br />
                  <a href={`mailto:${t('index.footer.contact.email')}`} className="email">
                    {t('index.footer.contact.email')}
                  </a>
                </p>
              </div>
            </div>
            {/* End footer left widget */}

            <div className="big-column col-xl-8 col-lg-9 col-md-12">
              <div className="row">
                <FooterContent2 />
              </div>
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      {/* <!--Bottom--> */}
    </footer>
  );
};

export default Footer;
