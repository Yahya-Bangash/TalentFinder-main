import * as sdk from "node-appwrite";
import { account, companiesTeamId, jobSeekersTeamId, teams } from "../config";

import {
  createCompanyCollectionAndDocument,
  createJobSeekerCollectionAndDocument,
} from "@/global-functions/functions";
import { ID } from "appwrite";
// Function to register a new user and automatically assign to a team
export async function registerUser(
  email,
  password,
  isEmployer,
  profileData = {}
) {
  try {
    // Step 1: Register the user
    const user = await account.create(ID.unique(), email, password);
    localStorage.setItem("authToken", user.$id);

    // Step 2: Authenticate the user (log in to create a session)
    try {
      await account.createEmailPasswordSession(email, password);
      console.log('Session created successfully for user:', email);
    } catch (sessionError) {
      console.error('Error creating session:', sessionError);
      throw new Error('Session creation failed. Please log in again.');
    }

    // Step 3: Assign the user to a team
    await assignUserToTeam(user.$id, email, isEmployer);

    // Step 4: If the user is an employer, create the company collection and document, otherwise create JobSeeker collection
    if (isEmployer) {
      await createCompanyCollectionAndDocument(user.$id, profileData);
    } else {
      await createJobSeekerCollectionAndDocument(user.$id, profileData);
    }

    return user;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

// Function to sign in the user by email and password, return user details and team membership
export const signIn = async (email, password) => {
  try {
    // Step 1: Authenticate the user (create a session)
    const session = await account.createEmailPasswordSession(email, password);
    localStorage.setItem("authToken", session.$id); // Store the session ID
    localStorage.setItem("userId", session.userId);
    // Step 2: Extract user ID from session
    const userId = session.userId;
    console.log("User ID:", userId);

    // Check team membership
    const isUserInTeam = async (teamId) => {
      let isInTeam = false;
      let page = 0;
      const limit = 25;

      try {
        while (true) {
          const response = await teams.listMemberships(teamId, [
            sdk.Query.limit(limit),
            sdk.Query.offset(page * limit),
          ]);

          const memberships = response.memberships;

          if (memberships.some((membership) => membership.userId === userId)) {
            isInTeam = true;
            break;
          }

          if (memberships.length < limit) {
            break;
          }

          page += 1;
        }
      } catch (error) {
        console.error(`Error fetching memberships for team ${teamId}:`, error);
      }

      return isInTeam;
    };

    const isInJobSeekersTeam = await isUserInTeam(jobSeekersTeamId);
    const isInCompaniesTeam = await isUserInTeam(companiesTeamId);

    let team = null;
    if (isInJobSeekersTeam) {
      team = "jobSeekers";
    } else if (isInCompaniesTeam) {
      team = "companies";
    }

    localStorage.setItem("team", team);

    // Fetch user profile data based on team
    const db = await initializeDB();
    const collection = team === "companies" ? db.companies : db.jobSeekers;
    const userProfile = await collection.get(userId);

    // Store user profile data
    if (userProfile) {
      localStorage.setItem("userName", userProfile.name || "");
      localStorage.setItem("userProfileImg", userProfile.profileImg || "");
    }

    return {
      session,
      userId,
      team,
      name: userProfile?.name,
      profileImg: userProfile?.profileImg
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Function to assign the authenticated user to a team (can be called separately)
export async function assignUserToTeam(userId, email, isEmployer) {
  try {
    // Determine which team to add the user to based on the selection
    const teamId = isEmployer ? companiesTeamId : jobSeekersTeamId;
    // Define roles (optional, based on your team setup)
    const roles = ["member"];

    // Define redirect URL after accepting the invite
    const redirectUrl = "http://localhost:3000/";

    // Add the authenticated user to the appropriate team
    await teams.createMembership(
      teamId, // The team ID
      roles, // Roles, e.g., ["member"]
      email, // The user's email (optional if using userId)
      userId, // The user's ID (optional if using email)
      undefined, // Phone number (not provided)
      redirectUrl // The URL for redirecting after invitation acceptance
    );
  } catch (error) {
    console.error("Error during team assignment:", error);
    throw error;
  }
}

export const signOutUser = async () => {
  try {
    await account.deleteSession('current');
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("team");
    localStorage.removeItem("userName");
    localStorage.removeItem("userProfileImg");
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};

// Function to get the currently authenticated user
export const getCurrentUser = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const team = localStorage.getItem("team");
    const name = localStorage.getItem("userName");
    const profileImg = localStorage.getItem("userProfileImg");

    if (!userId || !team) {
      // Instead of throwing an error, return null to indicate no user
      return null;
    }

    return { userId, team, name, profileImg };
  } catch (error) {
    console.error("Error fetching current user from localStorage:", error);
    return null; // Return null instead of throwing an error
  }
};

// Function to check if the user is authenticated
export const checkAuth = async () => {
  try {
    // Check if there's a session token in localStorage
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    
    if (!authToken || !userId) {
      return false;
    }
    
    // Verify the session with Appwrite
    try {
      const session = await account.getSession('current');
      return session && session.$id === authToken;
    } catch (error) {
      // Session might be invalid or expired
      console.error("Session verification error:", error);
      // Clear invalid session data
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("team");
      localStorage.removeItem("userName");
      localStorage.removeItem("userProfileImg");
      return false;
    }
  } catch (error) {
    console.error("Authentication check error:", error);
    return false;
  }
};

// Function to send a password recovery email
export const sendPasswordRecoveryEmail = async (email) => {
  const resetPasswordUrl = `${window.location.origin}/reset-password`; // Construct reset URL
  try {
    await account.createRecovery(email, resetPasswordUrl);
  } catch (error) {
    throw error;
  }
};
