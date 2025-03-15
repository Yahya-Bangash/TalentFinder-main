import Social from "./Social";
import { useTranslation } from "@/app/hooks/useTranslation";

const CopyrightFooter = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="footer-bottom">
      <div className="auto-container">
        <div className="outer-box">
          <div className="copyright-text">
            {t('CopyrightFooter.copyright_text', { year: currentYear })}{" "}
            {/* <a
              href={t('CopyrightFooter.company_link.url')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('CopyrightFooter.company_link.text')}
            </a> */}
            . {t('CopyrightFooter.rights_text')}
          </div>
          <div className="social-links">  
            <Social />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightFooter;
