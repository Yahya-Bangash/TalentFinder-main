"use client";

import candidatesData from "../../../../../data/candidates";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/app/hooks/useTranslation";

const WidgetContentBox = () => {
  const { t } = useTranslation('companyListings');
  
  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>{t('allApplicants.content.jobTitle')}</h6>

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals"> {t('allApplicants.content.tabs.total')}</Tab>
              <Tab className="tab-btn approved"> {t('allApplicants.content.tabs.approved')}</Tab>
              <Tab className="tab-btn rejected"> {t('allApplicants.content.tabs.rejected')}</Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row">
                {candidatesData.slice(17, 23).map((candidate) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidate.id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <Image
                            width={90}
                            height={90}
                            src={candidate.avatar}
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link href={`/candidates-single-v1/${candidate.id}`}>
                            {candidate.name}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {candidate.designation}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidate.location}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span> $
                            {candidate.hourlyRate} {t('allApplicants.content.candidate.hourlyRate')}
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                          {candidate.tags.map((val, i) => (
                            <li key={i}>
                              <a href="#">{val}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* End content */}

                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.view')}>
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.approve')}>
                              <span className="la la-check"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.reject')}>
                              <span className="la la-times-circle"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.delete')}>
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            {/* End total applicants */}

            <TabPanel>
              <div className="row">
                {candidatesData.slice(17, 19).map((candidate) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidate.id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <Image
                            width={90}
                            height={90}
                            src={candidate.avatar}
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link href={`/candidates-single-v1/${candidate.id}`}>
                            {candidate.name}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {candidate.designation}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidate.location}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span> $
                            {candidate.hourlyRate} {t('allApplicants.content.candidate.hourlyRate')}
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                          {candidate.tags.map((val, i) => (
                            <li key={i}>
                              <a href="#">{val}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* End content */}

                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.view')}>
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.approve')}>
                              <span className="la la-check"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.reject')}>
                              <span className="la la-times-circle"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.delete')}>
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            {/* End approved applicants */}

            <TabPanel>
              <div className="row">
                {candidatesData.slice(17, 21).map((candidate) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidate.id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <Image
                            width={90}
                            height={90}
                            src={candidate.avatar}
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link href={`/candidates-single-v1/${candidate.id}`}>
                            {candidate.name}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {candidate.designation}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidate.location}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span> $
                            {candidate.hourlyRate} {t('allApplicants.content.candidate.hourlyRate')}
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                          {candidate.tags.map((val, i) => (
                            <li key={i}>
                              <a href="#">{val}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* End content */}

                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.view')}>
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.approve')}>
                              <span className="la la-check"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.reject')}>
                              <span className="la la-times-circle"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text={t('allApplicants.content.candidate.actions.delete')}>
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            {/* End rejected applicants */}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default WidgetContentBox;
