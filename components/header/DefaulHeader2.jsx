'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import useAuth from "@/app/hooks/useAuth";
import useUserProfile from "@/app/hooks/useUserProfile";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import { signOutUser } from "@/appwrite/Services/authServices";
import candidatesMenuData from "@/data/candidatesMenuData";
import { useRouter } from "next/navigation";

const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);
  const { user, setUser } = useAuth();
  const { profileData, loading: profileLoading, error: profileError } = useUserProfile();
  console.log('profile url url '+ profileData?.profileImageUrl);
  
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
        // Clear auth data
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        setUser(null);
        setIsAuthenticated(false);
        setComponentKey(prev => prev + 1); // Force re-render
        router.replace('/');
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken");
      setIsAuthenticated(!!authToken);
      if (!authToken && pathname !== '/about' && pathname !== '/skills') {
        router.push('/'); // Redirect to home if not authenticated and not on about page
      }
    };

    // Initial check
    checkAuth();

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
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  // Handle profile loading and error states
  const renderProfileContent = () => {
    if (profileLoading) {
      return (
        <span className="theme-btn btn-style-three loading">
          <div className="loading-spinner"></div>
          Loading...
        </span>
      );
    }

    if (profileError) {
      console.error('Profile error:', profileError);
      return (
        <span className="theme-btn btn-style-three error">
          Error loading profile
        </span>
      );
    }

    if (!user || !isAuthenticated) {
      return (
        <Link href="/login" className="theme-btn btn-style-three">
          Login / Register
        </Link>
      );
    }

    return (
      <div className="dropdown dashboard-option">
        <a
          className="dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ 
              width: "40px", 
              height: "40px", 
              backgroundColor: "#f0f0f0",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}>
              <Image
                alt="profile"
                src={profileData?.profileImageUrl || "/images/user-profile-icon.svg"}
                width={40}
                height={40}
                style={{ 
                  objectFit: "cover",
                  width: "100%",
                  height: "100%"
                }}
                priority
              />
            </div>
            <span style={{ 
              marginLeft: "10px",
              fontSize: "16px", 
              fontWeight: "500",
              color: "#202124"
            }}>
              {profileData?.name || (user.team === "companies" ? "My Company" : "My Profile")}
            </span>
          </div>
        </a>

        <ul className="dropdown-menu">
          {(user.team === "companies" ? employerMenuData : candidatesMenuData).map((item) => (
            <li
              className={`${isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
              key={item.id}
            >
              <Link href={item.routePath} onClick={(e) => handleLogout(e, item.name)}>
                <i className={`la ${item.icon}`}></i>{" "}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <header
      className={`main-header ${navbar ? "fixed-header animated slideInDown" : ""}`}
      key={componentKey}
    >
      <div className="main-box">
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

          <HeaderNavContent handleLogout={handleLogout} />
        </div>

        <div className="outer-box">
          <div className="btn-box">
            {renderProfileContent()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;