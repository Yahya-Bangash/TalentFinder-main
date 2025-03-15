'use client';

import { useState, useEffect } from "react";
import Select from "react-select";
import * as sdk from "node-appwrite";
import useAuth from "@/app/hooks/useAuth";  
import initializeDB from "@/appwrite/Services/dbServices";
import catOptions from "@/data/categories"; 
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useUserProfile from '@/app/hooks/useUserProfile';
import { useTranslation } from "@/app/hooks/useTranslation";

const FormInfoBox = () => {
    const { t } = useTranslation('candidateListings');
    const [db, setDb] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [skillsOptions, setSkillsOptions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        jobTitle: "",
        country: "",
        city: "",
        expectedSalaryRange: "", 
        categoryTags: [], 
        experience: 0,  
        age: 0,
        gender: "",
        languages: "",
        educationalLevel: "",
        skills: [],
        description: "",
    });

    const { user } = useAuth();  
    const [documentId, setDocumentId] = useState(null);  
    const { refreshProfile } = useUserProfile();

    useEffect(() => {
        const fetchData = async () => {
            const initializedDb = await initializeDB();  
            setDb(initializedDb);  
            
            if (user?.userId && initializedDb) {
                initializedDb.jobSeekers?.list([sdk.Query.equal('userId', user.userId)])
                    .then((response) => {
                        if (response.documents.length > 0) {
                            const document = response.documents[0];
                            setDocumentId(document.$id);  

                            const selectedCategories = [];
                            const selectedSkills = [];

                            document.categoryTags?.forEach(tag => {
                                const mainCategory = catOptions.find(category => category.value === tag);
                                if (mainCategory) {
                                    selectedCategories.push({ value: mainCategory.value, label: mainCategory.label });
                                }
                            });

                            document.skills?.forEach(skill => {
                                const skillOption = catOptions.find(option => option.value === skill);
                                if (skillOption) {
                                    selectedSkills.push({ value: skillOption.value, label: skillOption.label });
                                }
                            });

                            setSelectedCategory(selectedCategories);
                            setSkillsOptions(selectedSkills);

                            setFormData({
                                name: document.name || "",
                                jobTitle: document.jobTitle || "",
                                country: document.country || "",
                                city: document.city || "",
                                expectedSalaryRange: document.expectedSalaryRange || "",  
                                categoryTags: selectedCategories || [],
                                experience: document.experience || 0,  
                                age: document.age || 0,
                                gender: document.gender || "",
                                languages: document.languages || "",
                                educationalLevel: document.educationalLevel || "",
                                skills: selectedSkills || [],
                                description: document.description || "",
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
            [name]: name === "experience" || name === "age" 
                ? isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10) 
                : value,
        }));
    };

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
        setFormData((prevData) => ({
            ...prevData,
            categoryTags: selectedOption ? selectedOption.map(cat => cat.value) : [],
        }));
    };

    const handleSkillsChange = (selectedSkills) => {
        setSkillsOptions(selectedSkills);
        setFormData((prevData) => ({
            ...prevData,
            skills: selectedSkills ? selectedSkills.map(skill => skill.value) : [],
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const toastId = toast.info(t('myProfile.toasts.saving'), { autoClose: false });

        const updatedData = {
            name: formData.name,
            jobTitle: formData.jobTitle,
            country: formData.country,
            city: formData.city,
            expectedSalaryRange: formData.expectedSalaryRange,
            categoryTags: formData.categoryTags,
            experience: formData.experience,
            age: formData.age,
            gender: formData.gender,
            languages: formData.languages,
            educationalLevel: formData.educationalLevel,
            skills: formData.skills,
            description: formData.description,
            userId: user.userId  
        };

        try {
            if (documentId && db) {
                await db.jobSeekers?.update(documentId, updatedData);
                toast.update(toastId, { 
                    render: t('myProfile.toasts.updateSuccess'), 
                    type: toast.TYPE.SUCCESS, 
                    autoClose: 3000 
                });
                refreshProfile();
            } else if (db) {
                const newDoc = await db.jobSeekers?.create(updatedData);
                setDocumentId(newDoc.$id);
                toast.update(toastId, { 
                    render: t('myProfile.toasts.createSuccess'), 
                    type: toast.TYPE.SUCCESS, 
                    autoClose: 3000 
                });
                refreshProfile();
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.update(toastId, { 
                render: t('myProfile.toasts.error'), 
                type: toast.TYPE.ERROR, 
                autoClose: 5000 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form className="default-form" onSubmit={handleSave}>
                <div className="row">
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.fullName')}</label>
                        <input
                            type="text"
                            name="name"
                            placeholder={t('myProfile.form.fullNamePlaceholder')}
                            value={formData.name}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.jobTitle')}</label>
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder={t('myProfile.form.jobTitlePlaceholder')}
                            value={formData.jobTitle}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.country')}</label>
                        <input
                            type="text"
                            name="country"
                            placeholder={t('myProfile.form.countryPlaceholder')}
                            value={formData.country}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.city')}</label>
                        <input
                            type="text"
                            name="city"
                            placeholder={t('myProfile.form.cityPlaceholder')}
                            value={formData.city}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.age')}</label>
                        <input
                            type="number"
                            name="age"
                            placeholder={t('myProfile.form.agePlaceholder')}
                            value={formData.age}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.expectedSalaryRange')}</label>
                        <input
                            type="text"
                            name="expectedSalaryRange"
                            placeholder={t('myProfile.form.expectedSalaryRangePlaceholder')}
                            value={formData.expectedSalaryRange}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.experienceYears')}</label>
                        <input
                            type="number"
                            name="experience"
                            placeholder={t('myProfile.form.experienceYearsPlaceholder')}
                            value={formData.experience}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.gender')}</label>
                        <select
                            name="gender"
                            className="chosen-single form-select"
                            value={formData.gender}
                            required
                            onChange={handleInputChange}
                        >
                            <option value="Male">{t('myProfile.form.genderOptions.male')}</option>
                            <option value="Female">{t('myProfile.form.genderOptions.female')}</option>
                            <option value="Others">{t('myProfile.form.genderOptions.others')}</option>
                        </select>
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.educationLevels')}</label>
                        <input
                            type="text"
                            name="educationalLevel"
                            placeholder={t('myProfile.form.educationLevelsPlaceholder')}
                            value={formData.educationalLevel}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.categories')}</label>
                        <Select
                            value={selectedCategory}
                            isMulti
                            name="categoryTags"
                            options={catOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleCategoryChange}
                            placeholder={t('myProfile.form.categoriesPlaceholder')}
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.skills')}</label>
                        <Select
                            value={skillsOptions}
                            isMulti
                            name="skills"
                            options={catOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleSkillsChange}
                            placeholder={t('myProfile.form.skillsPlaceholder')}
                        />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('myProfile.form.languages')}</label>
                        <input
                            type="text"
                            name="languages"
                            placeholder={t('myProfile.form.languagesPlaceholder')}
                            value={formData.languages}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group col-lg-12 col-md-12">
                        <label>{t('myProfile.form.description')}</label>
                        <textarea
                            name="description"
                            placeholder={t('myProfile.form.descriptionPlaceholder')}
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                        <button 
                            className="theme-btn btn-style-one" 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? t('myProfile.form.savingButton') : t('myProfile.form.saveButton')}
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default FormInfoBox;
