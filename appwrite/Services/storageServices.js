import { simpleStorage, storage } from "../config"; // Ensure you have initialized Appwrite client and storage service
import { ID, Permission, Role } from "appwrite";

let createdBuckets = {}; // Cache for created buckets

// Initialize required bucket configurations
const requiredBuckets = [
  {
    name: "images",
    attributes: {
      fileSizeLimit: 50 * 1000 * 1000, // 50MB
      allowedFileTypes: ["jpg", "jpeg", "png", "gif"],
    },
  },
  {
    name: "files",
    attributes: {
      fileSizeLimit: 50 * 1000 * 1000, // 50MB
      allowedFileTypes: ["pdf", "doc", "docx", "txt"],
    },
  },
  {
    name: "videos",
    attributes: {
      fileSizeLimit: 50 * 1000 * 1000, // 50MB
      allowedFileTypes: ["mp4", "mov", "avi"],
    },
  },
];

const createBucketIfNotExists = async (bucketName, attributes) => {
  if (createdBuckets[bucketName]) {
    console.log(`Bucket already exists in cache: ${bucketName}`);
    return createdBuckets[bucketName];
  }

  try {
    // Fetch all buckets once
    if (!createdBuckets.bucketsList) {
      createdBuckets.bucketsList = await storage.listBuckets();
    }

    // Check if the bucket already exists
    const bucketExists = createdBuckets.bucketsList.buckets.some(
      (bucket) => bucket.name === bucketName
    );

    if (!bucketExists) {
      console.log(`Creating new bucket: ${bucketName}`);

      // Lock this bucket creation to prevent race conditions
      createdBuckets[bucketName] = new Promise(async (resolve, reject) => {
        try {
          const bucket = await storage.createBucket(
            ID.unique(), // bucketId
            bucketName, // name
            [
              Permission.read(Role.any()),
              Permission.create(Role.any()),
              Permission.update(Role.any()),
              Permission.delete(Role.any()),
            ], // permissions
            true, // fileSecurity
            true, // enabled
            attributes.fileSizeLimit, // maximumFileSize
            attributes.allowedFileTypes, // allowedFileExtensions
            undefined, // compression (optional)
            true, // encryption
            true // antivirus
          );
          console.log(`Bucket created: ${bucketName}`);
          createdBuckets.bucketsList.buckets.push(bucket); // Add to the list to avoid future duplication
          resolve(bucket);
        } catch (error) {
          reject(error);
        }
      });

      return await createdBuckets[bucketName];
    } else {
      console.log(createdBuckets);
      console.log(`Bucket already exists: ${bucketName}`);
      const existingBucket = createdBuckets.bucketsList.buckets.find(
        (bucket) => bucket.name === bucketName
      );
      createdBuckets[bucketName] = existingBucket;
      return existingBucket;
    }
  } catch (error) {
    console.error(`Error creating or fetching bucket ${bucketName}:`, error);
    throw error;
  }
};

// Initialize storage services
const fetchAllBuckets = async () => {
  try {
    const storageServices = {};

    for (const bucketConfig of requiredBuckets) {
      const bucket = await createBucketIfNotExists(
        bucketConfig.name,
        bucketConfig.attributes
      );

      storageServices[bucketConfig.name] = {
        bucketId: bucket.$id,
        createFile: async (file, id = ID.unique()) =>
          await simpleStorage.createFile(bucket.$id, id, file),
        deleteFile: async (fileId) =>
          await simpleStorage.deleteFile(bucket.$id, fileId),
        getFile: async (fileId) => await storage.getFile(bucket.$id, fileId),
        getFileDownload: async (fileId) =>
          await simpleStorage.getFileDownload(bucket.$id, fileId),
        getFilePreview: async (fileId) =>
          await simpleStorage.getFilePreview(bucket.$id, fileId),
        getFileView: async (fileId) =>
          await simpleStorage.getFileView(bucket.$id, fileId),
        // await storage.getFileView(bucket.$id, fileId),
        listFiles: async (queries) =>
          await simpleStorage.listFiles(bucket.$id, queries),
        updateFile: async (fileId, file) =>
          await simpleStorage.updateFile(bucket.$id, fileId, file),
      };
    }

    return storageServices;
  } catch (error) {
    console.error("Error initializing storage services:", error);
    throw error;
  }
};

// Ensure buckets are fetched by returning a promise
export const initializeStorageServices = async () => {
  return await fetchAllBuckets();
};
