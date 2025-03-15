"use client";  // Make sure this is at the very top

import { useTranslation } from "@/app/hooks/useTranslation";

const FormContent2 = () => {
  const { t } = useTranslation('common');
  
  return (
    <form method="post" action="add-parcel.html">
      <div className="form-group">
        <label>{t('RegisterForm.email')}</label>
        <input 
          type="email" 
          name="username" 
          placeholder={t('RegisterForm.email_placeholder')} 
          required 
        />
      </div>
      {/* name */}

      <div className="form-group">
        <label>{t('RegisterForm.password')}</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder={t('RegisterForm.password_placeholder')}
        />
      </div>
      {/* password */}

      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit">
          {t('RegisterForm.register_button')}
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent2;
