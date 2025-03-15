import Breadcrumb from "../../common/Breadcrumb";
import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import DefaulHeader from "../../header/DefaulHeader";
import MobileMenu from "../../header/MobileMenu";
import FaqChild from "./FaqChild";
import { useTranslation } from "@/app/hooks/useTranslation";

const index = () => {
  const { t } = useTranslation('common');

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title={t('FAQ.title', 'Frequently Asked Questions')} meta={t('FAQ.meta', 'FAQ')} />
      {/* <!--End Page Title--> */}

      <section className="faqs-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{t('FAQ.title', 'Frequently Asked Questions')}</h2>
            <div className="text">Home / Faq</div>
          </div>

          <h3>{t('FAQ.payments_title', 'Payments')}</h3>
          {/* <!--Accordian Box--> */}
          <ul className="accordion-box">
            <FaqChild namespace="common" translationKey="FAQ.items" />
          </ul>

          <h3>{t('FAQ.suggestions_title', 'Suggestions')}</h3>
          {/* <!--Accordian Box--> */}
          <ul className="accordion-box mb-0">
            <FaqChild namespace="common" translationKey="FAQ.items" />
          </ul>
        </div>
      </section>
      {/* <!-- End Faqs Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
