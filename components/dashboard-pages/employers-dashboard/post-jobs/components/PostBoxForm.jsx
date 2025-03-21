'use client';

import { useState, useEffect } from "react";
import Select from "react-select";
import { useRouter } from 'next/navigation';
import { createJobsCollectionIfNotExists } from "@/global-functions/functions";
import useAuth from "@/app/hooks/useAuth";
import initializeDB from "@/appwrite/Services/dbServices";
import { ID } from "appwrite";
import categories from "@/data/categories";
import skills from "@/data/skills";
import { useTranslation } from "@/app/hooks/useTranslation";

const PostBoxForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation('companyListings');
  const [db, setDb] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [jobData, setJobData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobType: [],
    categoryTags: [],
    rate: "",
    skills: [],
  });

  useEffect(() => {
    const fetchDBData = async () => {
      const initializedDb = await initializeDB();
      setDb(initializedDb);
    };

    createJobsCollectionIfNotExists();
    fetchDBData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedOptions) => {
    setJobData((prevData) => ({
      ...prevData,
      categoryTags: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  const handleJobTypeChange = (selectedOptions) => {
    setJobData((prevData) => ({
      ...prevData,
      jobType: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  const handleSkillsChange = (selectedOptions) => {
    setJobData((prevData) => ({
      ...prevData,
      skills: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    if (user.userId) {
      setIsSubmitting(true);
      try {
        const jobDocumentPayload = { 
          ...jobData, 
          userId: user.userId, 
          creationTime: new Date().toISOString() 
        };
        await db.jobs.create(jobDocumentPayload, ID.unique());
        setSuccessMessage(t('postJob.form.successMessage'));
        
        // Navigate to the manage jobs page after a short delay
        setTimeout(() => {
          router.push('/employers-dashboard/manage-jobs');
        }, 1500);
      } catch (error) {
        console.error("Error posting job:", error);
        setSuccessMessage("");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.error("User ID not found.");
    }
  };

  // Flatten the options for react-select for categories
  const categoriesFlattenOptions = (options) => {
    return options.reduce((acc, option) => {
      acc.push(option);
      if (option.subOptions) {
        acc.push(...option.subOptions.map(sub => ({ ...sub, parent: option.value })));
      }
      return acc;
    }, []);
  };

  const flatOptions = categoriesFlattenOptions(categories);


  const flattenOptions = (options) => {
    return options.map(option => ({
      value: option.value,
      label: option.label,
    }));
  };

  const flatSkills = flattenOptions(skills);

  const jobTypeOptions = [
    { value: "Urgent", label: t('postJob.jobTypes.urgent') },
    { value: "Full Time", label: t('postJob.jobTypes.fullTime') },
    { value: "Hybrid", label: t('postJob.jobTypes.hybrid') },
    { value: "Remote", label: t('postJob.jobTypes.remote') },
  ];

  return (
    <form className="default-form" onSubmit={handlePostJob}>
      {successMessage && (
        <div className="alert alert-success mb-4">
          {successMessage}
        </div>
      )}
      <div className="row">
        <div className="form-group col-lg-12 col-md-12">
          <label>{t('postJob.form.jobTitle')}</label>
          <input 
            type="text" 
            name="jobTitle" 
            placeholder={t('postJob.form.jobTitlePlaceholder')} 
            value={jobData.jobTitle}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>{t('postJob.form.jobDescription')}</label>
          <textarea 
            name="jobDescription"
            placeholder={t('postJob.form.jobDescriptionPlaceholder')}
            value={jobData.jobDescription}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('postJob.form.selectCategories')}</label>
          <Select
            value={flatOptions.filter(option => jobData.categoryTags.includes(option.value))}
            isMulti
            options={flatOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleCategoryChange}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            isOptionDisabled={(option) => option.subOptions && option.subOptions.length > 0}
          
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('postJob.form.jobType')}</label>
          <Select
            value={jobData.jobType.map(type => jobTypeOptions.find(option => option.value === type))}
            isMulti
            options={jobTypeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleJobTypeChange}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('postJob.form.offeredRate')}</label>
          <input 
            type="text" 
            name="rate" 
            placeholder={t('postJob.form.offeredRatePlaceholder')} 
            value={jobData.rate}
            onChange={handleInputChange}
            required
          />       
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>{t('postJob.form.skills')}</label>
          <Select
            value={flatSkills.filter(option => jobData.skills.includes(option.value))}
            isMulti
            options={flatSkills}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSkillsChange}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12 text-right">
          <button 
            className="theme-btn btn-style-one" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('postJob.form.postingButton') : t('postJob.form.postButton')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;