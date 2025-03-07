'use client'

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import useAuth from "@/app/hooks/useAuth";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import db from "@/appwrite/Services/dbServices";
import * as sdk from "node-appwrite";
import { signOutUser } from "@/appwrite/Services/authServices";
import candidatesMenuData from "@/data/candidatesMenuData";
import { useRouter } from "next/navigation";

const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);
  const { user, loading, setUser } = useAuth();
  const [userName, setUserName] = useState("");
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [componentKey, setComponentKey] = useState(0);
  
  const router = useRouter();

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

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      console.log("Fetching user name..."); // Log when fetching user name
      if (user && user.userId) {
        try {
          console.log("User ID:", user.userId); // Log the user ID
          if (user.team === "companies") {
            const response = await db.company.list([sdk.Query.equal('userId', user.userId)]);
            console.log("Company Response:", response); // Log the company response
            if (response.documents.length > 0) {
              setUserName(response.documents[0].name || "My Company");
            }
          } else if (user.team === "jobSeekers") {
            const response = await db.jobSeeker.list([sdk.Query.equal('userId', user.userId)]);
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
    // <!-- Main Header-->
    <header
      className={`main-header  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
      key={componentKey}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link href="/">
                <Image
                  width={98}
                  height={98}
                  src="/images/jordii-logo.png"
                  alt="brand"
                />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent handleLogout={handleLogout} />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Login/Register or User Account --> */}
          <div className="btn-box">
            {loading ? (
              <span className="theme-btn btn-style-three">Loading...</span>
            ) : user && isAuthenticated ? (
              <div className="dropdown dashboard-option">
                <a
                  className="dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      alt="logo"
                      src="/images/jordii-logo.png"
                      width={50}
                      height={50}
                      style={{ 
                        objectFit: "contain",
                        borderRadius: "20%",
                        overflow: "hidden"
                      }}
                    />
                    <span style={{ 
                      marginLeft: "10px",
                      fontSize: "18px", 
                      fontWeight: "500",
                      color: "#202124",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      {userName || (user.team === "companies" ? "My Company" : "My Profile")}
                    </span>
                  </div>
                </a>

                <ul className="dropdown-menu">
                  {(user.team === "companies" ? employerMenuData : candidatesMenuData).map((item) => (
                    <li
                      className={`$ {
                        isActiveLink(
                          item.routePath,
                          pathname
                        )
                          ? "active"
                          : ""
                      } mb-1`}
                      key={item.id}
                    >
                      <Link href={item.routePath} onClick={(e) => handleLogout(e, item.name)}>
                        <i
                          className={`la ${item.icon}`}
                          
                        ></i>{" "}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link href="/login" className="theme-btn btn-style-three">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;