'use client';

import Link from "next/link";
import categories from "../../data/categories";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import initializeDB from "@/appwrite/Services/dbServices";

const JobCategorie1 = () => {
  const [dbServices, setDbServices] = useState(null);

  // Initialize database services
  useEffect(() => {
    const initializeServices = async () => {
      try {
        const db = await initializeDB();
        setDbServices(db);
      } catch (error) {
        console.error("Error initializing services:", error);
      }
    };

    initializeServices();
  }, []);

  // Fetch jobs to count categories
  const { data: categoryJobCounts, isLoading } = useQuery(
    'categoryJobCounts',
    async () => {
      if (dbServices?.jobs) {
        // Fetch all jobs
        const jobResponse = await dbServices.jobs.list();
        const jobs = jobResponse.documents;

        // Initialize counts object
        const counts = {};

        // Count jobs for each category
        jobs.forEach(job => {
          if (job.categoryTags && Array.isArray(job.categoryTags)) {
            categories.forEach(category => {
              // Check if job has main category tag
              if (job.categoryTags.includes(category.value)) {
                counts[category.value] = (counts[category.value] || 0) + 1;
              }

              // Check if job has any subcategory tags
              category.subOptions.forEach(subOption => {
                if (job.categoryTags.includes(subOption.value)) {
                  counts[category.value] = (counts[category.value] || 0) + 1;
                }
              });
            });
          }
        });

        return counts;
      }
      return {};
    },
    { enabled: !!dbServices }
  );

  if (isLoading) return <div>Loading categories...</div>;

  return (
    <>
      {categories.map((category) => (
        <div
          className="category-block col-lg-4 col-md-6 col-sm-12"
          key={category.value}
        >
          <div className="inner-box">
            <div className="content">
              <span className={`icon ${category.icon}`}></span>
              <h4>
                <Link href="/job-list-v5">{category.label}</Link>
              </h4>
              <p>({categoryJobCounts?.[category.value] || 0} open positions)</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobCategorie1;
