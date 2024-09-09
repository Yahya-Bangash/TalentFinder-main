'use client';

import Link from "next/link";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDestination,
  addFoundationDate,
  addKeyword,
  addLocation,
  addPerPage,
  addSort,
} from "../../../features/filter/employerFilterSlice";
import Image from "next/image";
import { useQuery } from "react-query";
import { initializeStorageServices } from "@/appwrite/Services/storageServices";
import initializeDB from "@/appwrite/Services/dbServices";
import * as sdk from "node-appwrite";
import { useState, useEffect } from "react";

const FilterTopBox = () => {
  const {
    keyword,
    location,
    destination,
    category,
    foundationDate,
    sort,
    perPage,
  } = useSelector((state) => state.employerFilter) || {};
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

  // Fetch companies and jobs data using useQuery
  const { data: companies, isLoading, error } = useQuery(
    "companies",
    async () => {
      if (dbServices?.companies && storageServices?.images) {
        const response = await dbServices.companies.list();

        // Fetch profile image and job count for each company
        const companiesData = await Promise.all(
          response.documents.map(async (company) => {
            let profileImgUrl = null;
            if (company.profileImg) {
              try {
                const imageFile = await storageServices.images.getFilePreview(company.profileImg);
                profileImgUrl = imageFile.href;
              } catch (error) {
                console.error(`Error fetching profile image for ${company.name}:`, error);
              }
            }

            // Fetch the number of open jobs for the company
            const jobResponse = await dbServices.jobs.list([
              sdk.Query.equal("userId", company.userId),
            ]);
            const jobCount = jobResponse.total;

            return {
              ...company,
              img: profileImgUrl,
              location: `${company.city}, ${company.country}`,
              jobNumber: jobCount,
            };
          })
        );

        return companiesData;
      }
      return [];
    },
    { enabled: !!dbServices && !!storageServices }
  );

  // Apply filters
  const keywordFilter = (item) =>
    keyword !== ""
      ? item?.name?.toLowerCase().includes(keyword?.toLowerCase()) && item
      : item;

  // location filter
  const locationFilter = (item) =>
    location !== ""
      ? item?.location?.toLowerCase().includes(location?.toLowerCase())
      : item;

  // destination filter
  const destinationFilter = (item) =>
    item?.destination?.min >= destination?.min &&
    item?.destination?.max <= destination?.max;

  // category filter
  const categoryFilter = (item) =>
    category !== ""
      ? item?.category?.toLocaleLowerCase() === category?.toLocaleLowerCase()
      : item;

  // foundation date filter
  const foundationDataFilter = (item) =>
    item?.foundationDate?.min >= foundationDate?.min &&
    item?.foundationDate?.max <= foundationDate?.max;

  // sort filter
  const sortFilter = (a, b) =>
    sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1;

  let filteredCompanies = companies
    ?.filter(keywordFilter)
    // ?.filter(locationFilter)
    // ?.filter(destinationFilter)
    // ?.filter(categoryFilter)
    // ?.filter(foundationDataFilter)
    // ?.sort(sortFilter);

  let content = filteredCompanies
    ?.slice(
      perPage.start !== 0 ? perPage.start : 0,
      perPage.end !== 0 ? perPage.end : filteredCompanies.length
    )
    ?.map((company) => (
      <div
        className="company-block-four col-xl-3 col-lg-6 col-md-6 col-sm-12"
        key={company.$id}
      >
        <div className="inner-box">
          <button className="bookmark-btn">
            <span className="flaticon-bookmark"></span>
          </button>

          <div className="content-inner">
            <span className="featured">Featured</span>
            <span className="company-logo">
              {company.img ? (
                <Image
                  width={50}
                  height={50}
                  src={company.img}
                  alt="company brand"
                />
              ) : (
                <Image
                  width={50}
                  height={50}
                  src="/images/default-company.png" // Ensure this path is correct
                  alt="default company brand"
                />
              )}
            </span>
            <h4>
              <Link href={`/employers-single-v1/${company.$id}`}>
                {company.name}
              </Link>
            </h4>
            <ul className="job-info flex-column">
              <li className="me-0">
                <span className="icon flaticon-map-locator"></span>
                {company.location}
              </li>
              <li className="me-0">
                <span className="icon flaticon-briefcase"></span>
                {company.primaryIndustry}
              </li>
            </ul>
          </div>

          <div className="job-type me-0">
            Open Jobs – {company.jobNumber} {company.jobNumber !== 1 ? "Positions" : "Position"}
          </div>
        </div>
      </div>
    ));

  // per page handler
  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    dispatch(addPerPage(pageData));
  };

  // sort handler
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  // clear handler
  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addDestination({ min: 0, max: 100 }));
    dispatch(addCategory(""));
    dispatch(addFoundationDate({ min: 1900, max: 2028 }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
  };

  return (
    <>
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="text">
            <strong>{filteredCompanies?.length}</strong> companies
          </div>
        </div>
        {/* End showing-result */}
        <div className="sort-by">
          {(keyword !== "" ||
            location !== "" ||
            destination.min !== 0 ||
            destination.max !== 100 ||
            category !== "" ||
            foundationDate.min !== 1900 ||
            foundationDate.max !== 2028 ||
            sort !== "" ||
            perPage.start !== 0 ||
            perPage.end !== 0) && (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{
                minHeight: "45px",
                marginBottom: "15px",
              }}
            >
              Clear All
            </button>
          )}

          <select
            value={sort}
            className="chosen-single form-select"
            onChange={sortHandler}
          >
            <option value="">Sort by default</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>
          {/* End select */}

          <select
            onChange={perPageHandler}
            className="chosen-single form-select ms-3 "
            value={JSON.stringify(perPage)}
          >
            <option
              value={JSON.stringify({
                start: 0,
                end: 0,
              })}
            >
              All
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 10,
              })}
            >
              10 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 20,
              })}
            >
              20 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 24,
              })}
            >
              24 per page
            </option>
          </select>
          {/* End select */}
        </div>
      </div>
      {/* End top filter bar box */}

      <div className="row">{content}</div>
      {/* End .row */}

      <Pagination />
      {/* <!-- Pagination --> */}
    </>
  );
};

export default FilterTopBox;
