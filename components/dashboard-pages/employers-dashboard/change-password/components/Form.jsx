import { useTranslation } from "@/app/hooks/useTranslation";

const Form = () => {
  const { t } = useTranslation('companyListings');
  
  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>{t('changePassword.form.oldPassword')}</label>
          <input type="password" name="name" required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>{t('changePassword.form.newPassword')}</label>
          <input type="password" name="name" required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>{t('changePassword.form.confirmPassword')}</label>
          <input type="password" name="name" required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            {t('changePassword.form.updateButton')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
