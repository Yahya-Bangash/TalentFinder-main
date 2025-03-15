import Link from "next/link.js";
import jobs from "../../../../../data/job-featured.js";
import Image from "next/image.js";
import { useTranslation } from "@/app/hooks/useTranslation";

const JobFavouriteTable = () => {
  const { t } = useTranslation('candidateListings');
  
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>{t('shortlistedJobs.myFavoriteJobs')}</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>{t('appliedJobs.timePeriod.last6Months')}</option>
            <option>{t('appliedJobs.timePeriod.last12Months')}</option>
            <option>{t('appliedJobs.timePeriod.last16Months')}</option>
            <option>{t('appliedJobs.timePeriod.last24Months')}</option>
            <option>{t('appliedJobs.timePeriod.last5Years')}</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>{t('shortlistedJobs.table.jobTitle')}</th>
                  <th>{t('shortlistedJobs.table.dateAdded')}</th>
                  <th>{t('shortlistedJobs.table.status')}</th>
                  <th>{t('shortlistedJobs.table.actions')}</th>
                </tr>
              </thead>

              <tbody>
                {jobs.slice(8, 12).map((item) => (
                  <tr key={item.id}>
                    <td>
                      {/* <!-- Job Block --> */}
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <Image
                                width={48}
                                height={48}
                                src={item.logo}
                                alt="logo"
                              />
                            </span>
                            <h4>
                              <Link href={`/job-single-v3/${item.id}`}>
                                {item.jobTitle}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                Segment
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                London, UK
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>Dec 5, 2020</td>
                    <td className="status">Active</td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Aplication">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobFavouriteTable;
