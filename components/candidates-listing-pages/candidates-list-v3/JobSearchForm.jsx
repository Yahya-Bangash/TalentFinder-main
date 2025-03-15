import Categories from "../components/Categories";
import JobTitleBox from "../components/JobTitleBox";
import SearchBox from "../components/SearchBox";
import { useTranslation } from "@/app/hooks/useTranslation";

const JobSearchForm = () => {
  const { t } = useTranslation('candidateListings');
  
  return (
    <div className="job-search-form">
      <div className="row">
        <div className="form-group col-lg-4 col-md-12 col-sm-12">
          <SearchBox />
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
          <JobTitleBox/>
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
          <Categories />
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">
            {t('searchBox.title')}
          </button>
        </div>
        {/* <!-- Form Group --> */}
      </div>
    </div>
    // End job Search form
  );
};

export default JobSearchForm;
