'use client';

import { useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from 'react-query';
import { initializeStorageServices } from "@/appwrite/Services/storageServices";
import initializeDB from "@/appwrite/Services/dbServices";
import * as sdk from "node-appwrite";
import { toast } from "react-toastify";

const TopCompany = () => {
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
        toast.error("Failed to initialize services.");
      }
    };

    initializeServices();
  }, []);

  // Fetch companies and their job counts from the database using react-query
  const { data: companies, isLoading, error } = useQuery(
    'topCompanies',
    async () => {
      if (dbServices?.companies && storageServices?.images) {
        const companyResponse = await dbServices.companies.list();

        const companyData = await Promise.all(
          companyResponse.documents.map(async (company) => {
            // Fetch the image from the storage
            let profileImgUrl = null;
            if (company.profileImg) {
              try {
                const imageFile = await storageServices.images.getFilePreview(company.profileImg);
                profileImgUrl = imageFile.href; // Get the image URL
              } catch (error) {
                console.error(`Error fetching profile image for company ${company.name}:`, error);
              }
            }

            // Fetch the number of open jobs for the company
            const jobResponse = await dbServices.jobs.list([
              sdk.Query.equal("userId", company.userId),
            ]);
            const jobCount = jobResponse.total;

            return {
              id: company.$id,
              name: company.name,
              location: `${company.city}, ${company.country}`,
              img: profileImgUrl,
              jobNumber: jobCount,
            };
          })
        );
        return companyData;
      }
      return [];
    },
    { enabled: !!dbServices && !!storageServices } // Ensure services are initialized before fetching
  );

  // Slider settings
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: companies?.length > 4 ? 4 : companies?.length, // Show only the number of slides available if less than 4
    slidesToScroll: 4,
    autoplay: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: companies?.length > 4 ? 4 : companies?.length } },
      { breakpoint: 768, settings: { slidesToShow: companies?.length > 3 ? 3 : companies?.length } },
      { breakpoint: 600, settings: { slidesToShow: companies?.length > 2 ? 2 : companies?.length } },
      { breakpoint: 500, settings: { slidesToShow: 1 } },
    ],
  };

  if (isLoading) return <div>Loading companies...</div>;
  if (error) return <div>Error fetching companies</div>;

  return (
    <Slider {...settings} arrows={false}>
      {companies?.slice(0, 12).map((company) => (
        <div className="company-block" key={company.id}>
          <div className="inner-box">
            <figure className="image">
              {company.img ? (
                <Image
                  width={90}
                  height={90}
                  src={company.img}
                  alt="top company"
                />
              ) : (
                <div>No Image</div>
              )}
            </figure>
            <h4 className="name">
              <Link href={`/employers-single-v1/${company.id}`}>
                {company.name}
              </Link>
            </h4>
            <div className="location">
              <i className="flaticon-map-locator"></i> {company.location}
            </div>
            <Link
              href={`/employers-single-v1/${company.id}`}
              className="theme-btn btn-style-three"
            >
              {company.jobNumber} Open Position{company.jobNumber !== 1 ? "s" : ""}
            </Link>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TopCompany;
