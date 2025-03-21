'use client';

import { useState, useEffect } from "react";
import * as sdk from "node-appwrite";
import useAuth from "@/app/hooks/useAuth";  // Use the Auth hook to get userId
import initializeDB from "@/appwrite/Services/dbServices";
import { useTranslation } from "@/app/hooks/useTranslation";

const ContactInfoBox = () => {
    const { user } = useAuth();  // Access the logged-in userId from global auth context
    const [db, setDb] = useState(null);
    const [documentId, setDocumentId] = useState(null);  // Track document ID
    const [contactInfo, setContactInfo] = useState({
        country: '',
        city: '',
        address: ''
    });
    const { t } = useTranslation('companyListings');

    // Fetch the document from Appwrite based on userId and populate the form
    useEffect(() => {
        const fetchData = async () => {
            const initializedDb = await initializeDB();  // Await the database initialization
            setDb(initializedDb);  // Set the db state
            
            if (user?.userId && initializedDb) {
                initializedDb.companies?.list([sdk.Query.equal('userId', user.userId)])
                    .then((response) => {
                        if (response.documents.length > 0) {
                            const document = response.documents[0];
                            setDocumentId(document.$id);
                            setContactInfo({
                                country: document.country || '',
                                city: document.city || '',
                                address: document.address || '',
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

    // Update state on form field change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission (save data directly to Appwrite)
    const handleSave = (e) => {
        e.preventDefault();

        const updatedData = {
            country: contactInfo.country,
            city: contactInfo.city,
            address: contactInfo.address,
            userId: user.userId  // Ensure userId is included in the document
        };

        if (documentId && db) {
            // Update existing document
            db.companies?.update(documentId, updatedData)
                .then(() => {
                    console.log("Contact information updated successfully");
                })
                .catch((error) => {
                    console.error("Error updating contact information:", error);
                });
        } 
    };

    return (
        <form className="default-form" onSubmit={handleSave}>
            <div className="row">
                <div className="form-group col-lg-6 col-md-12">
                    <label>{t('companyProfile.contactInfo.country')}</label>
                    <input
                        type="text"
                        name="country"
                        placeholder={t('companyProfile.contactInfo.countryPlaceholder')}
                        value={contactInfo.country}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>{t('companyProfile.contactInfo.city')}</label>
                    <input
                        type="text"
                        name="city"
                        placeholder={t('companyProfile.contactInfo.cityPlaceholder')}
                        value={contactInfo.city}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <label>{t('companyProfile.contactInfo.address')}</label>
                    <input
                        type="text"
                        name="address"
                        placeholder={t('companyProfile.contactInfo.addressPlaceholder')}
                        value={contactInfo.address}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group col-lg-12 col-md-12">
                    <button type="submit" className="theme-btn btn-style-one">
                        {t('companyProfile.contactInfo.saveButton')}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ContactInfoBox;
