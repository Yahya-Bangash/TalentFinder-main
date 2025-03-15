"use client";  // Make sure this is at the very top

import { useTranslation } from "@/app/hooks/useTranslation";

const LoginWithSocial = () => {
  const { t } = useTranslation('common');
  
  return (
    <div className="btn-box row">
      <div className="col-lg-6 col-md-12">
        <a href="#" className="theme-btn social-btn-two facebook-btn">
          <i className="fab fa-facebook-f"></i> {t('LoginWithSocial.facebook')}
        </a>
      </div>
      <div className="col-lg-6 col-md-12">
        <a href="#" className="theme-btn social-btn-two google-btn">
          <i className="fab fa-google"></i> {t('LoginWithSocial.google')}
        </a>
      </div>
    </div>
  );
};

export default LoginWithSocial;
