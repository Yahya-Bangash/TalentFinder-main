import SearchForm2 from "../../common/job-search/SearchForm2";
import PopularSearch from "../PopularSearch";
import ImageBox from "./ImageBox";
import { useTranslation } from "@/app/hooks/useTranslation";

const index = () => {
  const { t } = useTranslation('home');

  return (
    <section className="banner-section-three">
      <div className="auto-container">
        <div className="row">
          <div className="content-column col-lg-7 col-md-12 col-sm-12">
            <div className="inner-column">
              <div className="title-box" data-aos="fade-up">
                <h3>
                  {t('hero3.title')}
                </h3>
                <div className="text">
                  {t('hero3.subtitle')}
                </div>
              </div>

              {/* <!-- Job Search Form --> */}
              <div
                className="job-search-form-two"
                data-aos-delay="500"
                data-aos="fade-up"
              >
                <SearchForm2 />
              </div>
              {/* <!-- Job Search Form --> */}

              {/* <!-- Popular Search --> */}
              <PopularSearch />
              {/* <!-- End Popular Search --> */}
            </div>
          </div>

          <div className="image-column col-lg-5 col-md-12">
            <ImageBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
