import { useTranslation } from "@/app/hooks/useTranslation";

const AlertDataTable = () => {
  const { t } = useTranslation('companyListings');
  
  return (
    <table className="default-table manage-job-table">
      <thead>
        <tr>
          <th>{t('resumeAlerts.table.title')}</th>
          <th>{t('resumeAlerts.table.alertQuery')}</th>
          <th>{t('resumeAlerts.table.numberJobs')}</th>
          <th>{t('resumeAlerts.table.times')}</th>
          <th>{t('resumeAlerts.table.actions')}</th>
        </tr>
      </thead>
      {/* End thead */}

      <tbody>
        <tr>
          <td>{t('resumeAlerts.table.education')}</td>
          <td>
            {t('resumeAlerts.table.category')}: {t('resumeAlerts.table.educationTraining')}, {t('resumeAlerts.table.postedDate')}: {t('resumeAlerts.table.all')}, {t('resumeAlerts.table.salary')}: $1000 –
            $3000
          </td>
          <td>{t('resumeAlerts.table.jobsFound')} 5</td>
          <td>{t('resumeAlerts.table.weekly')}</td>
          <td>
            <button>
              <i className="la la-trash colored"></i>
            </button>
          </td>
        </tr>
        {/* End tr */}

        <tr>
          <td>{t('resumeAlerts.table.accountingFinance')}</td>
          <td>
            {t('resumeAlerts.table.category')}: {t('resumeAlerts.table.educationTraining')}, {t('resumeAlerts.table.postedDate')}: {t('resumeAlerts.table.all')}, {t('resumeAlerts.table.salary')}: $1000 –
            $3000
          </td>
          <td>{t('resumeAlerts.table.jobsFound')} 5</td>
          <td>{t('resumeAlerts.table.weekly')}</td>
          <td>
            <button>
              <i className="la la-trash colored"></i>
            </button>
          </td>
        </tr>
        {/* End tr */}

        <tr>
          <td>{t('resumeAlerts.table.education')}</td>
          <td>
            {t('resumeAlerts.table.category')}: {t('resumeAlerts.table.educationTraining')}, {t('resumeAlerts.table.postedDate')}: {t('resumeAlerts.table.all')}, {t('resumeAlerts.table.salary')}: $1000 –
            $3000
          </td>
          <td>{t('resumeAlerts.table.jobsFound')} 5</td>
          <td>{t('resumeAlerts.table.weekly')}</td>
          <td>
            <button>
              <i className="la la-trash colored"></i>
            </button>
          </td>
        </tr>
        {/* End tr */}

        <tr>
          <td>{t('resumeAlerts.table.accountingFinance')}</td>
          <td>
            {t('resumeAlerts.table.category')}: {t('resumeAlerts.table.educationTraining')}, {t('resumeAlerts.table.postedDate')}: {t('resumeAlerts.table.all')}, {t('resumeAlerts.table.salary')}: $1000 –
            $3000
          </td>
          <td>{t('resumeAlerts.table.jobsFound')} 5</td>
          <td>{t('resumeAlerts.table.weekly')}</td>
          <td>
            <button>
              <i className="la la-trash colored"></i>
            </button>
          </td>
        </tr>
        {/* End tr */}

        <tr>
          <td>{t('resumeAlerts.table.education')}</td>
          <td>
            {t('resumeAlerts.table.category')}: {t('resumeAlerts.table.educationTraining')}, {t('resumeAlerts.table.postedDate')}: {t('resumeAlerts.table.all')}, {t('resumeAlerts.table.salary')}: $1000 –
            $3000
          </td>
          <td>{t('resumeAlerts.table.jobsFound')} 5</td>
          <td>{t('resumeAlerts.table.weekly')}</td>
          <td>
            <button>
              <i className="la la-trash colored"></i>
            </button>
          </td>
        </tr>
        {/* End tr */}

        <tr>
          <td>{t('resumeAlerts.table.accountingFinance')}</td>
          <td>
            {t('resumeAlerts.table.category')}: {t('resumeAlerts.table.educationTraining')}, {t('resumeAlerts.table.postedDate')}: {t('resumeAlerts.table.all')}, {t('resumeAlerts.table.salary')}: $1000 –
            $3000
          </td>
          <td>{t('resumeAlerts.table.jobsFound')} 5</td>
          <td>{t('resumeAlerts.table.weekly')}</td>
          <td>
            <button>
              <i className="la la-trash colored"></i>
            </button>
          </td>
        </tr>
        {/* End tr */}
      </tbody>
    </table>
  );
};

export default AlertDataTable;
