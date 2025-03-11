'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from 'react-query';
import Image from "next/image";
import Link from "next/link";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import MobileMenu from "@/components/header/MobileMenu";
import RelatedJobs from "@/components/employer-single-pages/related-jobs/RelatedJobs";
import MapJobFinder from "@/components/job-listing-pages/components/MapJobFinder";
import Social from "@/components/employer-single-pages/social/Social";
import PrivateMessageBox from "@/components/employer-single-pages/shared-components/PrivateMessageBox";
import { initializeStorageServices } from "@/appwrite/Services/storageServices";
import initializeDB from "@/appwrite/Services/dbServices";
import * as sdk from "node-appwrite";

// export const metadata = {
//   title:
//     "Employers Single Dyanmic V1 || DIGI-X-TECH - Job Board React NextJS Template",
//   description: "DIGI-X-TECH - Job Board React NextJS Template",
// };

const EmployersSingleV1 = ({ params }) => {
  const [storageServices, setStorageServices] = useState(null);
  const [dbServices, setDbServices] = useState(null);
  const companyId = params.id;

  // Initialize storage and database services
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

  // Fetch company data from companies collection
  const { data: employer, isLoading, error } = useQuery(
    ['employer', companyId],
    async () => {
      if (dbServices?.companies && storageServices?.images) {
        const companyResponse = await dbServices.companies.get(companyId);

        // Fetch image from storage using profileImg ID
        let profileImgUrl = null;
        if (companyResponse.profileImg) {
          try {
            const imageFile = await storageServices.images.getFilePreview(companyResponse.profileImg);
            profileImgUrl = imageFile.href;
          } catch (error) {
            console.error("Error fetching profile image:", error);
          }
        }

        // Fetch the number of jobs for this company
        const jobResponse = await dbServices.jobs.list([
          sdk.Query.equal("userId", companyResponse.userId),
        ]);
        const jobCount = jobResponse.total;

        return {
          ...companyResponse,
          img: profileImgUrl,
          jobNumber: jobCount,
          location: `${companyResponse.city}, ${companyResponse.country}`,
        };
      }
      return null;
    },
    { enabled: !!dbServices && !!storageServices && !!companyId }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !employer) return <div>Error fetching employer data</div>;

  return (
    <>
      {/* Header Span */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Main Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* Job Detail Section */}
      <section className="job-detail-section">
        {/* Upper Box */}
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    {employer.img ? (
                      <Image
                        width={100}
                        height={100}
                        src={employer.img}
                        alt="company logo"
                      />
                    ) : (
                      <div>No Image Available</div>
                    )}
                  </span>
                  <h4>{employer.name}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {employer.location}
                    </li>
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {employer.primaryIndustry}
                    </li>
                    <li>
                      <span className="icon flaticon-mail"></span>
                      {employer.email}
                    </li>
                    <li>
                      <span className="icon flaticon-web-programming"></span>
                      <a href={employer.website ? `http://${employer.website}` : '#'}>
                        {employer.website || `www.${employer.name}.com`}
                      </a>
                    </li>
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
                    <li className="time">Open Jobs – {employer.jobNumber}</li>
                  </ul>
                  {/* End .job-other-info */}
                </div>
                {/* End .content */}

                <div className="btn-box">
                  <button
                    className="theme-btn btn-style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#privateMessage"
                  >
                    Private Message
                  </button>
                  <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>
                {/* End btn-box */}

                {/* Modal */}
                <div
                  className="modal fade"
                  id="privateMessage"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">
                          Send message to {employer.name}
                        </h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      {/* End modal-header */}

                      <PrivateMessageBox />
                      {/* End PrivateMessageBox */}
                    </div>
                  </div>
                </div>
                {/* End Modal */}
              </div>
            </div>
          </div>
        </div>
        {/* End Upper Box */}

        {/* Job Detail Outer */}
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {/* Job Details */}
                <div className="job-detail">
                  <h4>About Company</h4>
                  <p>{employer.description}</p>
                </div>
                {/* End job-detail */}

                {/* Related Jobs */}
                <div className="related-jobs">
                  <div className="title-box">
                    <h3>{employer.jobNumber} Job(s) available</h3>
                  </div>

                  <RelatedJobs />
                  {/* End RelatedJobs */}
                </div>
                {/* End Related Jobs */}
              </div>

              {/* Sidebar */}
              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      {/* Company Info */}
                      <ul className="company-info mt-0">
                        <li>
                          Primary industry: <span>{employer.primaryIndustry}</span>
                        </li>
                        <li>
                          Company size: <span>{employer.companySize}</span>
                        </li>
                        <li>
                          Founded in: <span>{employer.estSince}</span>
                        </li>
                        <li>
                          Email: <span>{employer.email}</span>
                        </li>
                        <li>
                          Location: <span>{employer.location}</span>
                        </li>
                        <li>
                          Social media:
                          <Social />
                        </li>
                      </ul>

                      <div className="btn-box">
                        <a
                          href={employer.website ? `http://${employer.website}` : '#'}
                          className="theme-btn btn-style-three"
                          style={{ textTransform: "lowercase" }}
                        >
                          {employer.website || `www.${employer.name}.com`}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <div className="sidebar-widget">
                    <h4 className="widget-title">Job Location</h4>
                    <div className="widget-content">
                      <div style={{ height: "300px", width: "100%" }}>
                        <MapJobFinder />
                      </div>
                    </div>
                  </div> */}
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

export default dynamic(() => Promise.resolve(EmployersSingleV1), {
  ssr: false,
});
