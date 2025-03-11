'use client';

import { useState, useEffect } from "react";
import { initializeStorageServices } from "@/appwrite/Services/storageServices"; 
import initializeDB from "@/appwrite/Services/dbServices";
import useAuth from "@/app/hooks/useAuth";
import * as sdk from "node-appwrite";
import { ID } from "node-appwrite"; // Importing ID from node-appwrite
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useUserProfile from '@/app/hooks/useUserProfile';

const LogoCoverUploader = () => {
  const [storageServices, setStorageServices] = useState(null);
  const [dbServices, setDbServices] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [previousCoverImgId, setPreviousCoverImgId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { user } = useAuth(); // Get current user
  const { refreshProfile } = useUserProfile();

  // Initialize storage and database services
  useEffect(() => {
    const initializeServices = async () => {
      try {
        const storage = await initializeStorageServices();
        setStorageServices(storage);

        const db = await initializeDB();
        setDbServices(db);

        // Fetch the company document for the current user (by userId)
        if (user && db.companies) {
          const response = await db.companies.list([
            sdk.Query.equal("userId", user.userId),
          ]);

          if (response.total > 0) {
            const doc = response.documents[0];
            setDocumentId(doc.$id);

            // Fetch and set the current cover image if it exists
            if (doc.profileImg) {
              const coverImageFile = await storage.images.getFile(doc.profileImg);
              setCoverImage({ name: coverImageFile.name, id: doc.profileImg });
              setPreviousCoverImgId(doc.profileImg); // Store previous cover image ID
            }
          } else {
            console.log('No company document found for this user.');
          }
        }
      } catch (error) {
        console.error("Error initializing services:", error);
        toast.error("Failed to initialize services.");
      }
    };

    initializeServices();
  }, [user]);

  // Handler for cover image selection
  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  // Function to delete previous file
  const deletePreviousFile = async (fileId, service) => {
    try {
      if (fileId) {
        await service.deleteFile(fileId);
        console.log(`File ${fileId} deleted successfully.`);
      }
    } catch (error) {
      console.error(`Error deleting file ${fileId}:`, error);
    }
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const toastId = toast.info('Uploading...', { autoClose: false });

    if (!storageServices || !dbServices || !documentId) {
      console.error("Services not initialized properly");
      toast.update(toastId, { render: "Services not initialized properly. Please try again.", type: toast.TYPE.ERROR, autoClose: 5000 });
      setUploading(false);
      return;
    }

    try {
      const updates = {};

      const uploadFile = async (file, service, type, previousFileId, setPreviousFileId) => {
        if (file && !file.id) {
          console.log(`Previous ${type} ID: `, previousFileId);

          toast.update(toastId, { render: `Uploading ${type}...`, type: toast.TYPE.INFO });

          // Delete the previous file if it exists
          if (previousFileId) {
            await deletePreviousFile(previousFileId, service);
          }

          const uploadedFile = await service.createFile(file, ID.unique());

          toast.update(toastId, { render: `${type} uploaded successfully.`, type: toast.TYPE.SUCCESS, autoClose: 5000 });

          // Update the previous file ID to the new file's ID
          setPreviousFileId(uploadedFile.$id);

          return uploadedFile.$id;
        }
        return null;
      };

      // Upload Cover Image
      const coverImgId = await uploadFile(coverImage, storageServices.images, "Cover Image", previousCoverImgId, setPreviousCoverImgId);
      if (coverImgId) updates.profileImg = coverImgId;

      // Update companies document
      if (Object.keys(updates).length > 0) {
        await dbServices.companies.update(documentId, updates);
        console.log("Companies document updated successfully.");
        toast.update(toastId, { render: "Cover image uploaded and data updated successfully!", type: toast.TYPE.SUCCESS, autoClose: 5000 });
        refreshProfile(); // Refresh profile data after successful update
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.update(toastId, { render: `An error occurred during upload: ${error}.`, type: toast.TYPE.ERROR, autoClose: 5000 });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload} className="default-form">
        {/* Cover Image Upload */}
        <div className="uploading-outer">
          <div className="uploadButton mr-6">
            <input
              className="uploadButton-input"
              type="file"
              accept="image/*"
              id="uploadCoverImage"
              onChange={handleCoverImageChange}
            />
            <label
              className={`uploadButton-button ripple-effect ${coverImage && coverImage.name ? "uploadButton-green" : ""}`}
              htmlFor="uploadCoverImage"
            >
              <div className={`${coverImage && coverImage.name ? "text-green-500" : ""}`}>
                {coverImage && coverImage.name ? coverImage.name : "Upload Cover Image"}
              </div>
            </label>
          </div>
          <div className="text">
            Max file size: 50MB. Allowed types: jpg, jpeg, png, gif.
          </div>
        </div>

        <div className="form-group col-lg-12 col-md-12 mb-12">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={uploading || !coverImage}
          >
            {uploading ? "Uploading..." : "Upload Cover Image"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LogoCoverUploader;
