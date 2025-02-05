'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Select from 'react-select';
import initializeDB from '@/appwrite/Services/dbServices';
import useAuth from '@/app/hooks/useAuth';
import MobileMenu from "@/components/header/MobileMenu";
import DashboardHeader from "@/components/header/DashboardHeader";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import DashboardEmployerSidebar from "@/components/header/DashboardEmployerSidebar";
import BreadCrumb from '@/components/dashboard-pages/BreadCrumb';
import CopyrightFooter from '@/components/dashboard-pages/CopyrightFooter';
import MenuToggler from '@/components/dashboard-pages/MenuToggler';
import categories from '@/data/categories';

const flattenOptions = (options) => {
  return options.reduce((acc, option) => {
    acc.push(option);
    if (option.subOptions) {
      acc.push(...option.subOptions.map(sub => ({ ...sub, parent: option.value })));
    }
    return acc;
  }, []);
};

const EditJobPage = () => {
  const router = useRouter();
  const { jobId } = useParams();
  const { user } = useAuth();
  const [jobData, setJobData] = useState(null);
  const [db, setDb] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const flatOptions = flattenOptions(categories);

  useEffect(() => {
    const fetchJobData = async () => {
      if (!jobId) return;

      try {
        const initializedDb = await initializeDB();
        setDb(initializedDb);

        if (user?.userId && jobId && initializedDb) {
          // Get the job document from the Jobs collection
          const response = await initializedDb.jobs.get(jobId);
          setJobData(response);

          // Set the selected options based on fetched job data
          if (response.categoryTags) {
            const selectedOptions = flatOptions.filter(option => 
              response.categoryTags.includes(option.value)
            );
            setSelectedOptions(selectedOptions);
          }
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [user, jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSpecialismChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);

    // Update jobData with selected options
    const updatedTags = selectedOptions.map(option => option.value);
    setJobData((prevData) => ({
      ...prevData,
      categoryTags: updatedTags,
    }));
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();

    if (db && jobData) {
      try {
        // Remove Appwrite system fields before updating
        const { $databaseId, $collectionId, $id, $permissions, ...validJobData } = jobData;

        // Update the job document
        await db.jobs.update(jobId, validJobData);
        console.log('Job updated successfully');
        router.push('/employers-dashboard/manage-jobs');
      } catch (error) {
        console.error('Error updating job:', error);
      }
    }
  };

  if (loading) {
    return <p>Loading job data...</p>;
  }

  if (!jobData) {
    return <p>Job not found</p>;
  }

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <LoginPopup />
      <DashboardHeader />
      <MobileMenu />
      <DashboardEmployerSidebar />

      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Edit Job" />
          <MenuToggler />

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Edit Job</h4>
                  </div>

                  <div className="widget-content">
                    <form className="default-form" onSubmit={handleSaveJob}>
                      <div className="row">
                        {/* Job Title */}
                        <div className="form-group col-lg-12 col-md-12">
                          <label>Job Title</label>
                          <input
                            type="text"
                            name="jobTitle"
                            placeholder="Title"
                            value={jobData.jobTitle}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        {/* Job Description */}
                        <div className="form-group col-lg-12 col-md-12">
                          <label>Job Description</label>
                          <textarea
                            name="jobDescription"
                            placeholder="Job Description"
                            value={jobData.jobDescription}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                        </div>

                        {/* Categories/Specialisms */}
                        <div className="form-group col-lg-12 col-md-12">
                          <label>Specialism</label>
                          <Select
                            value={selectedOptions}
                            isMulti
                            name="specialism"
                            options={flatOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleSpecialismChange}
                            placeholder="Select Specialism"
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            isOptionDisabled={(option) => option.subOptions && option.subOptions.length > 0}
                          />
                        </div>

                        {/* Job Type */}
                        <div className="form-group col-lg-6 col-md-12">
                          <label>Job Type</label>
                          <select
                            name="jobType"
                            className="chosen-single form-select"
                            value={jobData.jobType}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Remote">Remote</option>
                          </select>
                        </div>

                        {/* Salary */}
                        <div className="form-group col-lg-6 col-md-12">
                          <label>Offered Salary</label>
                          <input
                            type="text"
                            name="rate"
                            placeholder="$1000"
                            value={jobData.rate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="form-group col-lg-12 col-md-12 text-right">
                          <button className="theme-btn btn-style-one" type="submit">
                            Save Job
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CopyrightFooter />
    </div>
  );
};

export default EditJobPage;
