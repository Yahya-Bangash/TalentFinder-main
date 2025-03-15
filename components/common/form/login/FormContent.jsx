"use client";  // Make sure this is at the very top

import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import { useTranslation } from "@/app/hooks/useTranslation";

const FormContent = () => {
  const { t } = useTranslation('common');
  
  return (
    <div className="form-inner">
      <h3>{t('LoginForm.title')}</h3>

      {/* <!--Login Form--> */}
      <form method="post">
        <div className="form-group">
          <label>{t('LoginForm.username')}</label>
          <input 
            type="text" 
            name="username" 
            placeholder={t('LoginForm.username_placeholder')} 
            required 
          />
        </div>
        {/* name */}

        <div className="form-group">
          <label>{t('LoginForm.password')}</label>
          <input
            type="password"
            name="password"
            placeholder={t('LoginForm.password_placeholder')}
            required
          />
        </div>
        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> {t('LoginForm.remember_me')}
              </label>
            </div>
            <a href="#" className="pwd">
              {t('LoginForm.forgot_password')}
            </a>
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
          >
            {t('LoginForm.login_button')}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          {t('LoginForm.no_account')}{" "}
          <Link
            href="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            {t('LoginForm.signup_link')}
          </Link>
        </div>

        <div className="divider">
          <span>{t('LoginForm.or')}</span>
        </div>

        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
