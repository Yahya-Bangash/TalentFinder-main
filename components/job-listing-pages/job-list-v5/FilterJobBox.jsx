'use client';

import Link from "next/link";
import Pagination from "../components/Pagination";
import JobSelect from "../components/JobSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDatePosted,
  addExperienceSelect,
  addJobTypeSelect,
  addKeyword,
  addLocation,
  addPerPage,
  addSalary,
  addSort,
} from "../../../features/filter/filterSlice";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { initializeStorageServices } from "@/appwrite/Services/storageServices";
import initializeDB from "@/appwrite/Services/dbServices";
import * as sdk from "node-appwrite";
import moment from "moment"; // For date handling

const FilterJobBox = () => {
  const { jobList, jobSort } = useSelector((state) => state.filter);
  const {
    keyword,
    location,
    category,
    datePosted,
    jobTypeSelect,
    experienceSelect,
    salary,
  } = jobList || {};

  const { sort, perPage } = jobSort;

  const dispatch = useDispatch();

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
        const jobResponse = await dbServices.jobs.list();
        const companiesResponse = await dbServices.companies.list();
        
        // Create a mapping of companies by userId
        const companies = companiesResponse.documents.reduce((acc, company) => {
          acc[company.userId] = company;
          return acc;
        }, {});

        const jobsData = await Promise.all(
          jobResponse.documents.map(async (job) => {
            const company = companies[job.userId];

            // Get company logo if exists
            let companyLogoUrl = null;
            if (company?.profileImg) {
              try {
                const imageFile = await storageServices.images.getFilePreview(company.profileImg);
                companyLogoUrl = imageFile.href;
              } catch (error) {
                console.error(`Error fetching company logo for ${company?.name}:`, error);
              }
            }

            // Calculate job posting time difference
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

            return {
              ...job,
              company: company?.name || "Unknown Company",
              location: `${company?.city}, ${company?.country}`,
              logo: companyLogoUrl,
              time: timeDifference,
              salary: job.rate, // Assuming 'rate' is the salary field
              jobType: job.jobType || [], // Assuming jobType is an array
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
  if (error) return <div>Error fetching jobs data</div>;

  // Apply filters dynamically
  const keywordFilter = (item) =>
    keyword !== "" ? item.jobTitle.toLowerCase().includes(keyword.toLowerCase()) : true;

  const locationFilter = (item) =>
    location !== "" ? item.location.toLowerCase().includes(location.toLowerCase()) : true;

  const categoryFilter = (item) =>
    category !== "" ? item.category?.toLowerCase() === category.toLowerCase() : true;

  const jobTypeFilter = (item) =>
    jobTypeSelect !== "" ? item.jobType?.includes(jobTypeSelect) : true;

  const experienceFilter = (item) =>
    experienceSelect !== "" ? item.experience?.toLowerCase() === experienceSelect.toLowerCase() : true;

  const datePostedFilter = (item) => {
    const jobDate = moment(item.creationTime);
    if (datePosted === "all") return true;
    if (datePosted === "last-24-hours") return jobDate.isAfter(moment().subtract(1, 'days'));
    if (datePosted === "last-7-days") return jobDate.isAfter(moment().subtract(7, 'days'));
    return true;
  };

  const salaryFilter = (item) =>
    item.salary >= salary.min && item.salary <= salary.max;

  const sortFilter = (a, b) => (sort === "des" ? b.creationTime - a.creationTime : a.creationTime - b.creationTime);

  let content = jobs
    ?.filter(keywordFilter)
    // ?.filter(locationFilter)
    // ?.filter(categoryFilter)
    // ?.filter(jobTypeFilter)
    // ?.filter(experienceFilter)
    // ?.filter(datePostedFilter)
    // ?.filter(salaryFilter)
    // ?.sort(sortFilter)
    ?.slice(perPage.start, perPage.end !== 0 ? perPage.end : 16)
    ?.map((item) => (
      <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.$id}>
        <div className="inner-box">
          <div className="content">
            <span className="company-logo">
              {item.logo ? (
                <Image width={50} height={49} src={item.logo} alt="company logo" />
              ) : (
                <Image width={50} height={49} src="/images/default-company.png" alt="default logo" />
              )}
            </span>
            <h4>
              <Link href={`/job-single-v3/${item.$id}`}>{item.jobTitle}</Link>
            </h4>

            <ul className="job-info">
              <li>
                <span className="icon flaticon-briefcase"></span>
                {item.company}
              </li>
              <li>
                <span className="icon flaticon-map-locator"></span>
                {item.location}
              </li>
              <li>
                <span className="icon flaticon-clock-3"></span> {item.time}
              </li>
              <li>
                <span className="icon flaticon-money"></span> {item.salary}
              </li>
            </ul>

            <ul className="job-other-info">
              {item.jobType?.map((val, i) => (
                <li key={i} className="bg-blue-100">
                  {val}
                </li>
              ))}
            </ul>

            <button className="bookmark-btn">
              <span className="flaticon-bookmark"></span>
            </button>
          </div>
        </div>
      </div>
    ));

  // sort handler
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  // per page handler
  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    dispatch(addPerPage(pageData));
  };

  // clear all filters
  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addCategory(""));
    dispatch(addJobTypeSelect(""));
    dispatch(addDatePosted(""));
    dispatch(addExperienceSelect(""));
    dispatch(addSalary({ min: 0, max: 20000 }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
  };

  return (
    <>
      <div className="ls-switcher">
        <JobSelect />

        <div className="sort-by">
          {(keyword !== "" ||
            location !== "" ||
            category !== "" ||
            jobTypeSelect !== "" ||
            datePosted !== "" ||
            experienceSelect !== "" ||
            salary?.min !== 0 ||
            salary?.max !== 20000 ||
            sort !== "" ||
            perPage.start !== 0 ||
            perPage.end !== 0) && (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
            >
              Clear All
            </button>
          )}

          <select
            value={sort}
            className="chosen-single form-select"
            onChange={sortHandler}
          >
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>

          <select
            onChange={perPageHandler}
            className="chosen-single form-select ms-3 "
            value={JSON.stringify(perPage)}
          >
            <option value={JSON.stringify({ start: 0, end: 0 })}>All</option>
            <option value={JSON.stringify({ start: 0, end: 10 })}>10 per page</option>
            <option value={JSON.stringify({ start: 0, end: 20 })}>20 per page</option>
            <option value={JSON.stringify({ start: 0, end: 30 })}>30 per page</option>
          </select>
        </div>
      </div>

      <div className="row">{content}</div>

      <Pagination />
    </>
  );
};

export default FilterJobBox;
