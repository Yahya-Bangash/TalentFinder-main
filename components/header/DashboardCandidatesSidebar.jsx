'use client'

import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import candidatesuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import useAuth from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { usePathname, useRouter } from "next/navigation";
import { signOutUser } from "@/appwrite/Services/authServices";
import initializeDB from "@/appwrite/Services/dbServices";
import * as sdk from "node-appwrite";

const DashboardCandidatesSidebar = () => {
  const { menu } = useSelector((state) => state.toggle);
  const percentage = 30;
  const { user, loading, setUser } = useAuth();
  const [userName, setUserName] = useState("");
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  const router = useRouter();

  const dispatch = useDispatch();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  // Simple function to handle logout
  const handleLogout = async (e, itemName) => {
    if (itemName === "Logout") {
      e.preventDefault();
      try {
        await signOutUser();
        setUser(null);
        setIsAuthenticated(false);
        setComponentKey(prevKey => prevKey + 1);
        router.push('/');
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken");
      console.log("Auth Token:", authToken); // Log the auth token
      setIsAuthenticated(!!authToken);
      if (!authToken) {
        router.push('/'); // Redirect to home if not authenticated
      }
    };

    // Initial check
    checkAuth(); // Call checkAuth directly

    // Set up event listener for storage changes
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [router]);

  useEffect(() => {
    const fetchUserName = async () => {
      console.log("Fetching user name..."); // Log when fetching user name
      if (user && user.userId) {
        try {
          console.log("User ID:", user.userId); // Log the user ID
          const db = await initializeDB();
          
          if (!db) {
            console.error("Database not initialized");
            return;
          }

          if (user.team === "companies") {
            const response = await db.companies.list([sdk.Query.equal('userId', user.userId)]);
            console.log("Company Response:", response); // Log the company response
            if (response.documents.length > 0) {
              setUserName(response.documents[0].name || "My Company");
            }
          } else if (user.team === "jobSeekers") {
            const response = await db.jobSeekers.list([sdk.Query.equal('userId', user.userId)]);
            console.log("Job Seeker Response:", response); // Log the job seeker response
            if (response.documents.length > 0) {
              setUserName(response.documents[0].name || "My Profile");
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserName(user.team === "companies" ? "My Company" : "My Profile");
        }
      } else {
        console.log("User is not authenticated or user ID is missing."); // Log if user is not authenticated
      }
    };

    fetchUserName();
  }, [user]);

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`} key={componentKey}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        {/* Navigation Menu */}
        <ul className="navigation">
          {candidatesuData.map((item) => (
            <li
              className={`${
                isActiveLink(item.routePath, usePathname()) ? "active" : ""
              } mb-1`}
              key={item.id}
              onClick={item.name === "Logout" ? 
                (e) => handleLogout(e, item.name) : 
                menuToggleHandler}
            >
              <Link href={item.routePath}>
                <i className={`la ${item.icon}`}></i> {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* End navigation */}

        <div className="skills-percentage">
          <h4>Skills Percentage</h4>
          <p>
            Put value for <strong>Cover Image</strong> field to increase your
            skill up to <strong>85%</strong>
          </p>
          <div style={{ width: 200, height: 200, margin: "auto" }}>
            <CircularProgressbar
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#7367F0",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>{" "}
          {/* <!-- Pie Graph --> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardCandidatesSidebar;
