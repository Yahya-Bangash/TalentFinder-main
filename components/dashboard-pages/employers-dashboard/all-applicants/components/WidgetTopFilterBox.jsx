import { useTranslation } from "@/app/hooks/useTranslation";

const WidgetTopFilterBox = () => {
  const { t } = useTranslation('companyListings');
  
  return (
    <div className="chosen-outer">
      <select className="chosen-single form-select chosen-container">
        <option>{t('allApplicants.filterBox.selectJobs.title')}</option>
        <option>{t('allApplicants.filterBox.selectJobs.options.last12Months')}</option>
        <option>{t('allApplicants.filterBox.selectJobs.options.last16Months')}</option>
        <option>{t('allApplicants.filterBox.selectJobs.options.last24Months')}</option>
        <option>{t('allApplicants.filterBox.selectJobs.options.last5Years')}</option>
      </select>
      {/* <!--Tabs Box--> */}

      <select className="chosen-single form-select chosen-container">
        <option>{t('allApplicants.filterBox.status.title')}</option>
        <option>{t('allApplicants.filterBox.status.options.last12Months')}</option>
        <option>{t('allApplicants.filterBox.status.options.last16Months')}</option>
        <option>{t('allApplicants.filterBox.status.options.last24Months')}</option>
        <option>{t('allApplicants.filterBox.status.options.last5Years')}</option>
      </select>
      {/* <!--Tabs Box--> */}
    </div>
  );
};

export default WidgetTopFilterBox;
