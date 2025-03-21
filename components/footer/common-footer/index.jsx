"use client"
import Image from "next/image";
import CopyrightFooter from "./CopyrightFooter";
import FooterContent from "./FooterContent";
import { useTranslation } from "@/app/hooks/useTranslation";

const index = ({ footerStyle = "" }) => {
  const { t } = useTranslation('common');
  
  return (
    <footer className={`main-footer ${footerStyle}`}>
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-4 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <a href="#">
                    <Image
                      width={154}
                      height={50}
                      src="/images/jordii-logo.png"
                      alt="brand"
                    />
                  </a>
                </div>
                <p className="phone-num">
                  <span>{t('index.footer.contact.call_us')} </span>
                  <a href="tel:1234567890">{t('index.footer.contact.phone')}</a>
                </p>
                <p className="address">
                  {t('index.footer.contact.address')}
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
                <FooterContent />
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
    //   {/* <!-- End Main Footer --> */}
  );
};

export default index;
