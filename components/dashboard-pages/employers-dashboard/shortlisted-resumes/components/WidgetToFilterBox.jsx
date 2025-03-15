import { useTranslation } from "@/app/hooks/useTranslation";

const WidgetToFilterBox = () => {
  const { t } = useTranslation('companyListings');
  
  return (
    <div className="chosen-outer">
      {/* <!--search box--> */}
      <div className="search-box-one">
        <form method="post" action="blog.html">
          <div className="form-group">
            <span className="icon flaticon-search-1"></span>
            <input
              type="search"
              name="search-field"
              placeholder={t('shortlistedResumes.filterBox.searchPlaceholder')}
              required
            />
          </div>
        </form>
      </div>
      {/* End searchBox one */}

      {/* <!--Tabs Box--> */}
      <select className="chosen-single form-select chosen-container">
        <option>{t('shortlistedResumes.filterBox.timeFilter.newest')}</option>
        <option>{t('shortlistedResumes.filterBox.timeFilter.last12Months')}</option>
        <option>{t('shortlistedResumes.filterBox.timeFilter.last16Months')}</option>
        <option>{t('shortlistedResumes.filterBox.timeFilter.last24Months')}</option>
        <option>{t('shortlistedResumes.filterBox.timeFilter.last5Years')}</option>
      </select>
    </div>
  );
};

export default WidgetToFilterBox;
