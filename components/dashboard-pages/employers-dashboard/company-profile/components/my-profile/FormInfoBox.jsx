'use client'
import { useState, useEffect } from "react";
import Select from "react-select";
import * as sdk from "node-appwrite";
import useAuth from "@/app/hooks/useAuth"; // Use the Auth hook to get userId
import initializeDB from "@/appwrite/Services/dbServices";
import categories from "@/data/categories";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useUserProfile from '@/app/hooks/useUserProfile';
import { useTranslation } from "@/app/hooks/useTranslation";

const FormInfoBox = () => {
  const [db, setDb] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [documentId, setDocumentId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    profileImg: "",
    name: "",
    city: "",
    country: "",
    primaryIndustry: "",
    email: "",
    companySize: "",
    estSince: "",
    website: "",
    listingVisibilityPermission: "Yes",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    description: "",
    categoryTags: [],
  });

  const { user } = useAuth();
  const { refreshProfile } = useUserProfile();
  const { t } = useTranslation('companyListings');

  useEffect(() => {
    const fetchData = async () => {
      const initializedDb = await initializeDB();
      setDb(initializedDb);

      if (user?.userId && initializedDb) {
        initializedDb.companies?.list([sdk.Query.equal('userId', user.userId)])
          .then((response) => {
            if (response.documents.length > 0) {
              const document = response.documents[0];
              setDocumentId(document.$id);
              
              // Match the fetched categories with the options in catOptions
              const selectedCategories = [];
              const selectedSubCategories = [];

              document.categoryTags?.forEach(tag => {
                const mainCategory = categories.find(category => category.subOptions.find(sub => sub.value === tag));
                if (mainCategory) {
                  selectedCategories.push({ value: mainCategory.value, label: mainCategory.label });
                  const subCategory = mainCategory.subOptions.find(sub => sub.value === tag);
                  if (subCategory) {
                    selectedSubCategories.push({ value: subCategory.value, label: subCategory.label });
                  }
                }
              });

              setSelectedCategory(selectedCategories[0]);
              setSubCategories(selectedCategories[0]?.subOptions || []);

              setFormData({
                userId: document.userId || "",
                profileImg: document.profileImg || "",
                name: document.name || "",
                city: document.city || "",
                country: document.country || "",
                primaryIndustry: document.primaryIndustry || "",
                email: document.email || "",
                companySize: document.companySize || "",
                estSince: document.estSince || "",
                website: document.website || "",
                listingVisibilityPermission: document.listingVisibilityPermission || "Yes",
                linkedin: document.linkedin || "",
                twitter: document.twitter || "",
                instagram: document.instagram || "",
                facebook: document.facebook || "",
                description: document.description || "",
                categoryTags: document.categoryTags || [],
              });
            } else {
              console.error("No document found for this user.");
            }
          })
          .catch((error) => {
            console.error("Error fetching document:", error);
          });
      }
    };

    fetchData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setSubCategories(selectedOption.subOptions || []);
  };

  const handleSubCategoryChange = (selectedSubCategories) => {
    setFormData((prevData) => ({
      ...prevData,
      categoryTags: [...formData.categoryTags, ...selectedSubCategories]
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.info('Saving your information...', { autoClose: false });

    const updatedData = {
      userId: formData.userId,
      profileImg: formData.profileImg,
      name: formData.name,
      city: formData.city,
      country: formData.country,
      primaryIndustry: formData.primaryIndustry,
      email: formData.email,
      companySize: formData.companySize,
      estSince: formData.estSince,
      website: formData.website,
      listingVisibilityPermission: formData.listingVisibilityPermission,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
      instagram: formData.instagram,
      facebook: formData.facebook,
      description: formData.description,
      categoryTags: formData.categoryTags.map((cat) => cat.value),
    };

    if (documentId && db) {
      try {
        await db.companies?.update(documentId, updatedData);
        toast.update(toastId, { 
          render: "Profile updated successfully!", 
          type: toast.TYPE.SUCCESS, 
          autoClose: 3000 
        });
        refreshProfile(); // Refresh profile data after successful update
      } catch (error) {
        console.error("Error updating document:", error);
        toast.update(toastId, { 
          render: "Error updating profile. Please try again.", 
          type: toast.TYPE.ERROR, 
          autoClose: 5000 
        });
      }
    } else if (db) {
      try {
        const newDoc = await db.companies?.create(updatedData);
        setDocumentId(newDoc.$id);
        toast.update(toastId, { 
          render: "Profile created successfully!", 
          type: toast.TYPE.SUCCESS, 
          autoClose: 3000 
        });
        refreshProfile(); // Refresh profile data after successful creation
      } catch (error) {
        console.error("Error creating document:", error);
        toast.update(toastId, { 
          render: "Error creating profile. Please try again.", 
          type: toast.TYPE.ERROR, 
          autoClose: 5000 
        });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <form className="default-form" onSubmit={handleSave}>
      <div className="row">
        {/* Company Name Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.companyName')}</label>
          <input
            type="text"
            name="name"
            placeholder={t('companyProfile.form.companyNamePlaceholder')}
            value={formData.name}
            required
            onChange={handleInputChange}
          />
        </div>

        {/* Email Address Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.emailAddress')}</label>
          <input
            type="email"
            name="email"
            placeholder={t('companyProfile.form.emailAddressPlaceholder')}
            value={formData.email}
            required
            onChange={handleInputChange}
          />
        </div>

        {/* City Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.city')}</label>
          <input
            type="text"
            name="city"
            placeholder={t('companyProfile.form.cityPlaceholder')}
            value={formData.city}
            required
            onChange={handleInputChange}
          />
        </div>

        {/* Country Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.country')}</label>
          <input
            type="text"
            name="country"
            placeholder={t('companyProfile.form.countryPlaceholder')}
            value={formData.country}
            required
            onChange={handleInputChange}
          />
        </div>

        {/* Primary Industry Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.primaryIndustry')}</label>
          <input
            type="text"
            name="primaryIndustry"
            placeholder={t('companyProfile.form.primaryIndustryPlaceholder')}
            value={formData.primaryIndustry}
            required
            onChange={handleInputChange}
          />
        </div>

        {/* Company Size Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.companySize')}</label>
          <select
            name="companySize"
            className="chosen-single form-select"
            value={formData.companySize}
            required
            onChange={handleInputChange}
          >
            <option value="50 - 100">{t('companyProfile.form.companySizeOptions.50_100')}</option>
            <option value="100 - 150">{t('companyProfile.form.companySizeOptions.100_150')}</option>
            <option value="200 - 250">{t('companyProfile.form.companySizeOptions.200_250')}</option>
            <option value="300 - 350">{t('companyProfile.form.companySizeOptions.300_350')}</option>
            <option value="500 - 1000">{t('companyProfile.form.companySizeOptions.500_1000')}</option>
          </select>
        </div>

        {/* Website Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.website')}</label>
          <input
            type="url"
            name="website"
            placeholder={t('companyProfile.form.websitePlaceholder')}
            value={formData.website}
            required
            onChange={handleInputChange}
          />
        </div>

        {/* Est. Since Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.estSince')}</label>
          <input
            type="date"
            name="estSince"
            placeholder={t('companyProfile.form.estSincePlaceholder')}
            value={formData.estSince}
            required
            onChange={handleInputChange}
            className="form-control h-14"
          />
        </div>

        {/* Category Select */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.category')}</label>
          <Select
            value={selectedCategory}
            name="categoryTags"
            options={categories}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={handleCategoryChange}
            placeholder={t('companyProfile.form.categoryPlaceholder')}
          />
        </div>

        {/* Subcategory Select (shows only if a Category is selected) */}
        {subCategories.length > 0 && (
          <div className="form-group col-lg-6 col-md-12">
            <label>{t('companyProfile.form.subcategories')}</label>
            <Select
              value={formData.categoryTags}
              isMulti
              name="subcategory"
              options={subCategories}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSubCategoryChange}
              placeholder={t('companyProfile.form.subcategoriesPlaceholder')}
            />
          </div>
        )}

        {/* Allow In Search & Listing Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.allowInSearch')}</label>
          <select
            name="listingVisibilityPermission"
            className="chosen-single form-select"
            value={formData.listingVisibilityPermission}
            onChange={handleInputChange}
          >
            <option value="Yes">{t('companyProfile.form.allowInSearchOptions.yes')}</option>
            <option value="No">{t('companyProfile.form.allowInSearchOptions.no')}</option>
          </select>
        </div>

        {/* LinkedIn Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.linkedin')}</label>
          <input
            type="url"
            name="linkedin"
            placeholder={t('companyProfile.form.linkedinPlaceholder')}
            value={formData.linkedin}
            onChange={handleInputChange}
          />
        </div>

        {/* Twitter Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.twitter')}</label>
          <input
            type="url"
            name="twitter"
            placeholder={t('companyProfile.form.twitterPlaceholder')}
            value={formData.twitter}
            onChange={handleInputChange}
          />
        </div>

        {/* Instagram Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.instagram')}</label>
          <input
            type="url"
            name="instagram"
            placeholder={t('companyProfile.form.instagramPlaceholder')}
            value={formData.instagram}
            onChange={handleInputChange}
          />
        </div>

        {/* Facebook Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>{t('companyProfile.form.facebook')}</label>
          <input
            type="url"
            name="facebook"
            placeholder={t('companyProfile.form.facebookPlaceholder')}
            value={formData.facebook}
            onChange={handleInputChange}
          />
        </div>

        {/* About Company Textarea */}
        <div className="form-group col-lg-12 col-md-12">
          <label>{t('companyProfile.form.aboutCompany')}</label>
          <textarea
            name="description"
            placeholder={t('companyProfile.form.aboutCompanyPlaceholder')}
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Save Button */}
        <div className="form-group col-lg-6 col-md-12">
          <button 
            className="theme-btn btn-style-one" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('companyProfile.form.savingButton') : t('companyProfile.form.saveButton')}
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default FormInfoBox;