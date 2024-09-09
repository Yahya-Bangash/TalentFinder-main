'use client';

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "react-query";
import { initializeStorageServices } from "@/appwrite/Services/storageServices";
import initializeDB from "@/appwrite/Services/dbServices";
import { useState, useEffect } from "react";
import * as sdk from "node-appwrite";
import moment from "moment"; // For time formatting

const JobFeatured1 = () => {
  const [storageServices, setStorageServices] = useState(null);
  const [dbServices, setDbServices] = useState(null);

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

  // Fetch jobs and related company data
  const { data: jobs, isLoading, error } = useQuery(
    'jobs',
    async () => {
      if (dbServices?.jobs && dbServices?.companies && storageServices?.images) {
        // Fetch jobs data
        const jobResponse = await dbServices.jobs.list();

        // Fetch company data
        const companiesResponse = await dbServices.companies.list();
        const companies = companiesResponse.documents.reduce((acc, company) => {
          acc[company.userId] = company; // Map companies by userId
          return acc;
        }, {});

        // Map jobs and enrich with company data and logo
        const jobsData = await Promise.all(
          jobResponse.documents.map(async (job) => {
            // Calculate the time difference
            const creationTime = moment(job.creationTime);
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

            // Get the corresponding company
            const company = companies[job.userId];

            // Fetch the company logo
            let companyLogoUrl = null;
            if (company?.profileImg) {
              try {
                const imageFile = await storageServices.images.getFilePreview(company.profileImg);
                companyLogoUrl = imageFile.href;
              } catch (error) {
                console.error(`Error fetching company logo for ${company?.name}:`, error);
              }
            }

            return {
              jobId: job.$id,
              jobTitle: job.jobTitle,
              timeDifference,
              company: company?.name || "Unknown Company",
              logo: companyLogoUrl,
              location: `${company?.city}, ${company?.country}` || "Unknown Location",
              rate: job.rate,
              jobType: job.jobType, // Array of job types
            };
          })
        );

        return jobsData;
      }
      return [];
    },
    { enabled: !!dbServices && !!storageServices }
  );

  if (isLoading) return <div>Loading jobs...</div>;
  if (error) return <div>Error fetching jobs</div>;

  return (
    <>
      {jobs?.slice(0, 6).map((item) => (
        <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.jobId}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                {item.logo ? (
                  <Image
                    width={50}
                    height={50}
                    src={item.logo}
                    alt={`${item.company} logo`}
                  />
                ) : (
                  <Image
                    width={50}
                    height={50}
                    src="/images/default-company.png" // Ensure default image path is correct
                    alt="default company logo"
                  />
                )}
              </span>
              <h4>
                <Link href={`/job-single-v1/${item.jobId}`}>{item.jobTitle}</Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {item.company}
                </li>
                {/* company info */}
                {/* <li>
                  <span className="icon flaticon-map-locator"></span>
                  {item.location}
                </li> */}
                {/* location info */}
                <li>
                  <span className="icon flaticon-clock-3"></span>
                  {item.timeDifference}
                </li>
                {/* time info */}
                <li>
                  <span className="icon flaticon-money"></span> {item.rate}
                </li>
                {/* salary info */}
              </ul>
              {/* End .job-info */}

              <ul className="job-other-info">
  {item.jobType.map((val, i) => (
    <li key={i} className=" bg-blue-100">
      {val} {/* Directly show the string value */}
    </li>
  ))}
</ul>

              {/* End .job-other-info */}

              <button className="bookmark-btn">
                <span className="flaticon-bookmark"></span>
              </button>
            </div>
          </div>
        </div>
        // End job-block
      ))}
    </>
  );
};

export default JobFeatured1;
