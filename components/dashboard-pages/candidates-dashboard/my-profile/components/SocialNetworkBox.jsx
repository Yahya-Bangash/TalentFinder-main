'use client';

import { useState, useEffect } from "react";
import * as sdk from "node-appwrite";
import useAuth from "@/app/hooks/useAuth";  // Use the Auth hook to get userId
import initializeDB from "@/appwrite/Services/dbServices";
import { useTranslation } from "@/app/hooks/useTranslation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SocialNetworkBox = () => {
    const { t } = useTranslation('candidateListings');
    const [db, setDb] = useState(null);
    const [documentId, setDocumentId] = useState(null);  // To track if a document already exists
    const [formData, setFormData] = useState({
        linkedin: "",
        github: "",
        twitter: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = useAuth();  // Access the logged-in userId from global auth context

    // Fetch the document from Appwrite based on userId and populate the form
    useEffect(() => {
      const fetchData = async () => {
          const initializedDb = await initializeDB();  // Await the database initialization
          setDb(initializedDb);  // Set the db state
          
          console.log("Database initialized:", initializedDb); // Debug log
  
          if (user?.userId && initializedDb) {
              initializedDb.jobSeekers?.list([sdk.Query.equal('userId', user.userId)])
                  .then((response) => {
                      if (response.documents.length > 0) {
                          const document = response.documents[0];
                          setDocumentId(document.$id);  // Set the document ID
  
                          setFormData({
                              linkedin: document.linkedin || "",
                              github: document.github || "",
                              twitter: document.twitter || "",
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
  

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission (save data to Appwrite)
    const handleSave = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      console.log("Save button clicked!");
  
      const updatedData = {
          linkedin: formData.linkedin,
          github: formData.github,
          twitter: formData.twitter,
          userId: user.userId
      };
  
      console.log("Updated Data:", updatedData);
      console.log("Document ID:", documentId);
      console.log("DB object:", db);
  
      try {
          if (documentId && db.jobSeekers) {
              // Update existing document
              const response = await db.jobSeekers.update(documentId, updatedData);
              console.log("Document updated successfully:", response);
              toast.success(t('socialNetwork.toasts.updateSuccess'));
          } else if (db.jobSeekers) {
              // Create a new document
              const newDoc = await db.jobSeekers.create(updatedData);
              setDocumentId(newDoc.$id);
              console.log("Document created successfully:", newDoc);
              toast.success(t('socialNetwork.toasts.createSuccess'));
          } else {
              console.error("jobSeekers collection not found in db");
              toast.error(t('socialNetwork.toasts.updateError'));
          }
      } catch (error) {
          console.error("Error during save operation:", error);
          toast.error(t('socialNetwork.toasts.updateError'));
      } finally {
          setIsSubmitting(false);
      }
  };
  
  

    return (
        <>
            <form className="default-form" onSubmit={handleSave}>
                <div className="row">
                    {/* LinkedIn Input */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('socialNetwork.form.linkedin')}</label>
                        <input
                            type="text"
                            name="linkedin"
                            placeholder={t('socialNetwork.form.linkedinPlaceholder')}
                            value={formData.linkedin}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Twitter Input */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('socialNetwork.form.twitter')}</label>
                        <input
                            type="text"
                            name="twitter"
                            placeholder={t('socialNetwork.form.twitterPlaceholder')}
                            value={formData.twitter}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* GitHub Input */}
                    <div className="form-group col-lg-6 col-md-12">
                        <label>{t('socialNetwork.form.github')}</label>
                        <input
                            type="text"
                            name="github"
                            placeholder={t('socialNetwork.form.githubPlaceholder')}
                            value={formData.github}
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Save Button */}
                    <div className="form-group col-lg-12 col-md-12">
                        <button 
                            className="theme-btn btn-style-one" 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? t('myProfile.form.savingButton') : t('socialNetwork.form.saveButton')}
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default SocialNetworkBox;
