'use client';

import { useQuery, useQueryClient } from 'react-query';
import useAuth from './useAuth';
import initializeDB from '@/appwrite/Services/dbServices';
import * as sdk from 'node-appwrite';
import { initializeStorageServices } from '@/appwrite/Services/storageServices';

const useUserProfile = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Define the fetch function separately so we can reuse it
    const fetchProfileData = async () => {
        try {
            const db = await initializeDB();
            const storage = await initializeStorageServices();

            if (!user?.userId) {
                return null;
            }

            let response;
            if (user.team === 'companies') {
                response = await db.companies.list([sdk.Query.equal('userId', user.userId)]);
            } else if (user.team === 'jobSeekers') {
                response = await db.jobSeekers.list([sdk.Query.equal('userId', user.userId)]);
            }

            if (response?.documents?.length > 0) {
                const profileDoc = response.documents[0];
                let profileImageUrl = null;

                // If profile image exists, get its URL
                if (profileDoc.profileImg) {
                    try {
                        const imageResult = await storage.images.getFileDownload(profileDoc.profileImg);
                        profileImageUrl = imageResult.href;
                    } catch (error) {
                        console.error('Error fetching profile image:', error);
                    }
                }

                return {
                    ...profileDoc,
                    profileImageUrl
                };
            }
            
            return null;
        } catch (error) {
            console.error('Error fetching profile data:', error);
            throw error;
        }
    };

    // Use React Query to handle the data fetching with caching
    const { data: profileData, isLoading: loading, error, refetch } = useQuery(
        ['profile', user?.userId, user?.team], // Query key includes user ID and team for proper cache invalidation
        fetchProfileData,
        {
            enabled: !!user?.userId, // Only run the query if we have a user ID
            staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
            cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
            refetchOnWindowFocus: true, // Refetch when window regains focus
            refetchOnMount: true, // Refetch when component mounts
            retry: 2, // Retry failed requests 2 times
            onError: (error) => {
                console.error('Profile data fetch error:', error);
            }
        }
    );

    // Function to manually refresh the profile data
    const refreshProfile = () => {
        return refetch();
    };

    return {
        profileData,
        loading,
        error,
        refreshProfile
    };
};

export default useUserProfile;