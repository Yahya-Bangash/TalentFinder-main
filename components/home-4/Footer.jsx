"use client";

import Image from "next/image";
import CopyrightFooter from "../footer/common-footer/CopyrightFooter";
import FooterApps from "../footer/FooterApps";
import FooterContent3 from "../footer/FooterContent3";
import SearchForm2 from "../footer/SearchForm2";
import { useTranslation } from "@/app/hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation('common');
  
  return (
    <footer
      className="main-footer style-three"
      style={{ backgroundImage: "url(/images/background/3.png)" }}
    >
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="newsletter-form wow fadeInUp">
            <div className="sec-title light text-center">
              <h2>Subscribe Our Newsletter</h2>
              <div className="text">We don't send spam so don't worry.</div>
            </div>
            <SearchForm2 />
          </div>
          {/* End .newsletter-form */}

          <div className="row">
            <div className="big-column col-xl-3 col-lg-3 col-md-12">
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
            {/* End footer address left widget */}

            <div className="big-column col-xl-9 col-lg-9 col-md-12">
              <div className="row">
                <FooterContent3 />

                <div className="footer-column col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget">
                    <h4 className="widget-title">Mobile Apps</h4>
                    <FooterApps />
                  </div>
                </div>
              </div>
              {/* End .row */}
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
