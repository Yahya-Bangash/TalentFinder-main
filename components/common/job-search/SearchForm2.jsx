'use client'

import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/hooks/useTranslation";

const SearchForm2 = () => {
  const router = useRouter();
  const { t } = useTranslation('home');
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onClick={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-5 col-md-12 col-sm-12">
          <label className="title">{t('hero3.search_form.what_label')}</label>
          <span className="icon flaticon-search-1"></span>
          <input
            type="text"
            name="field_name"
            placeholder={t('hero3.search_form.what_placeholder')}
          />
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-4 col-md-12 col-sm-12 location">
          <label className="title">{t('hero3.search_form.where_label')}</label>
          <span className="icon flaticon-map-locator"></span>
          <input type="text" name="field_name" placeholder={t('hero3.search_form.where_placeholder')} />
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-3 col-md-12 col-sm-12 btn-box">
          <button
            type="submit"
            className="theme-btn btn-style-one"
            onClick={() => router.push("/job-list-v5")}
          >
            <span className="btn-title">{t('hero3.search_form.find_jobs_button')}</span>
          </button>
        </div>
        {/* <!-- Form Group --> */}
      </div>
    </form>
  );
};

export default SearchForm2;
