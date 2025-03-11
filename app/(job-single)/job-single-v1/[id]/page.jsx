'use client';

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import MobileMenu from "@/components/header/MobileMenu";
import RelatedJobs from "@/components/job-single-pages/related-jobs/RelatedJobs";
import JobOverView from "@/components/job-single-pages/job-overview/JobOverView";
import JobSkills from "@/components/job-single-pages/shared-components/JobSkills";
import CompanyInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import MapJobFinder from "@/components/job-listing-pages/components/MapJobFinder";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import { initializeStorageServices } from "@/appwrite/Services/storageServices";
import initializeDB from "@/appwrite/Services/dbServices";
import * as sdk from "node-appwrite";
import moment from "moment"; // For time formatting

const JobSingleDynamicV1 = ({ params }) => {
  const jobId = params.id;
  const [storageServices, setStorageServices] = useState(null);
  const [dbServices, setDbServices] = useState(null);

  useEffect(() => {
    const initializeServices = async () => {
      try {
        const storage = await initializeStorageServices();
        setStorageServices(storage);

        const db = await initializeDB();
        setDbServices(db);
      } catch (error) {
        console.error("Error initializing services:", error);
      }
    };

    initializeServices();
  }, []);

  const { data: job, isLoading, error } = useQuery(
    ['job', jobId],
    async () => {
      if (dbServices?.jobs && dbServices?.companies && storageServices?.images) {
        const jobResponse = await dbServices.jobs.get(jobId);

        const companyResponse = await dbServices.companies.list([
          sdk.Query.equal("userId", jobResponse.userId),
        ]);

        const company = companyResponse.documents[0];

        let companyLogoUrl = null;
        if (company?.profileImg) {
          try {
            const imageFile = await storageServices.images.getFilePreview(company.profileImg);
            companyLogoUrl = imageFile.href;
          } catch (error) {
            console.error(`Error fetching company logo: ${error}`);
          }
        }

        const creationTime = moment(jobResponse.creationTime);
        const now = moment();
        const duration = moment.duration(now.diff(creationTime));
        let timeDifference;
        if (duration.asMinutes() < 60) {
          timeDifference = `${Math.floor(duration.asMinutes())} minutes ago`;
        } else if (duration.asHours() < 24) {
          timeDifference = `${Math.floor(duration.asHours())} hours ago`;
        } else {
          timeDifference = `${Math.floor(duration.asDays())} days ago`;
        }

        return {
          jobTitle: jobResponse.jobTitle,
          time: timeDifference,
          salary: jobResponse.rate,
          jobType: jobResponse.jobType,
          skills: jobResponse.skills,
          jobDescription: jobResponse.jobDescription,
          company: company?.name || "Unknown Company",
          location: `${company?.city}, ${company?.country}` || "Unknown Location",
          companyLogo: companyLogoUrl,
          website: company?.website,
          primaryIndustry: company?.primaryIndustry,
          companySize: company?.companySize,
          estSince: company?.estSince,
          email: company?.email,
          linkedin: company?.linkedin,
          twitter: company?.twitter,
          instagram: company?.instagram,
          facebook: company?.facebook,
        };
      }
      return null;
    },
    { enabled: !!dbServices && !!storageServices && !!jobId }
  );

  if (isLoading) return <div>Loading job details...</div>;
  if (error) return <div>Error fetching job details</div>;

  return (
    <>
      <span className="header-span"></span>

      <LoginPopup />

      <DefaulHeader2 />
      <MobileMenu />

      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    {job?.companyLogo ? (
                      <Image
                        width={100}
                        height={98}
                        src={job.companyLogo}
                        alt="company logo"
                      />
                    ) : (
                      <Image
                        width={100}
                        height={98}
                        src="/images/default-company.png"
                        alt="default company logo"
                      />
                    )}
                  </span>
                  <h4>{job?.jobTitle}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {job?.company}
                    </li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {job?.location}
                    </li>
                    <li>
                      <span className="icon flaticon-clock-3"></span>{" "}
                      {job?.time}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>{" "}
                      {job?.salary}
                    </li>
                  </ul>

                  <ul className="job-other-info">
                    {job?.jobType?.map((type, i) => (
                      <li key={i} className="bg-blue-100">
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="btn-box">
                  <a
                    href="#"
                    className="theme-btn btn-style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#applyJobModal"
                  >
                    Apply For Job
                  </a>
                  <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>

                <div
                  className="modal fade"
                  id="applyJobModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">Apply for this job</h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <ApplyJobModalContent />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <div className="job-detail">
              <h4>Job Description</h4>
              <p>{job?.jobDescription}</p>
              </div>
              </div>

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <h4 className="widget-title">Job Overview</h4>
                    <JobOverView
                      datePosted={job?.time}
                      location={job?.location}
                      jobTitle={job?.jobTitle}
                      rate={job?.salary}
                    />
                    <h4 className="widget-title mt-10">Required Skills</h4>
                    <div className="widget-content ">
                      <JobSkills skills={job?.skills} />
                    </div>
                  </div>

                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <Image
                            width={54}
                            height={53}
                            src={job?.companyLogo || "/images/default-company.png"}
                            alt="company logo"
                          />
                        </div>
                        <h5 className="company-name">{job?.company}</h5>
                        <a href="#" className="profile-link">
                          View company profile
                        </a>
                      </div>

                      <CompanyInfo
                        primaryIndustry={job?.primaryIndustry}
                        companySize={job?.companySize}
                        estSince={job?.estSince}
                        email={job?.email}
                        location={job?.location}
                        linkedin={job?.linkedin}
                        twitter={job?.twitter}
                        instagram={job?.instagram}
                        facebook={job?.facebook}
                      />

                      <div className="btn-box">
                        <a
                          href={job?.website || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          {job?.website || "Visit Website"}
                        </a>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV1), {
  ssr: false,
});
