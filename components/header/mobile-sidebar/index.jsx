"use client";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import mobileMenuData from "../../../data/mobileMenuData";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveLink,
  isActiveParentChaild,
} from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import employerMenuData from "@/data/employerMenuData";
import candidatesMenuData from "@/data/candidatesMenuData";
import { signOutUser } from "@/appwrite/Services/authServices";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect, useState } from "react";

const Index = () => {
  const { user, setUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOutUser();
      // Clear auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      setUser(null);
      setIsAuthenticated(false);
      
      // Close the mobile menu
      const offcanvasElement = document.getElementById('offcanvasMenu');
      if (offcanvasElement) {
        // Use the data-bs-dismiss attribute to close the offcanvas
        offcanvasElement.classList.remove('show');
        document.body.classList.remove('offcanvas-open');
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      }
      
      router.push('/'); // Redirect to home after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleLogin = () => {
    // Close the mobile menu
    const offcanvasElement = document.getElementById('offcanvasMenu');
    if (offcanvasElement) {
      // Use the data-bs-dismiss attribute to close the offcanvas
      offcanvasElement.classList.remove('show');
      document.body.classList.remove('offcanvas-open');
      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
    
    router.push('/login');
  };

  const handleRegister = () => {
    // Close the mobile menu
    const offcanvasElement = document.getElementById('offcanvasMenu');
    if (offcanvasElement) {
      // Use the data-bs-dismiss attribute to close the offcanvas
      offcanvasElement.classList.remove('show');
      document.body.classList.remove('offcanvas-open');
      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
    
    router.push('/register');
  };

  const handleMenuItemClick = (path) => {
    // Close the mobile menu
    const offcanvasElement = document.getElementById('offcanvasMenu');
    if (offcanvasElement) {
      // Use the data-bs-dismiss attribute to close the offcanvas
      offcanvasElement.classList.remove('show');
      document.body.classList.remove('offcanvas-open');
      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
    
    router.push(path);
  };

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}

      <Sidebar>
        <Menu>
          {/* Basic navigation items - always visible */}
          <MenuItem className={`${pathname === "/" ? "menu-active-link" : ""}`} onClick={() => handleMenuItemClick("/")}>
            {t('HeaderNavContent.home')}
          </MenuItem>
          <MenuItem className={`${pathname === "/about" ? "menu-active-link" : ""}`} onClick={() => handleMenuItemClick("/about")}>
            {t('HeaderNavContent.about_us')}
          </MenuItem>
          <MenuItem className={`${pathname === "/skills" ? "menu-active-link" : ""}`} onClick={() => handleMenuItemClick("/skills")}>
            {t('HeaderNavContent.skills')}
          </MenuItem>

          {/* Additional navigation items - only when logged in */}
          {isAuthenticated ? (
            <> 
              {/* Show Companies link only for job seekers */}
              {user?.team === "jobSeekers" && (
                <MenuItem className={`${pathname === "/employers-list-v3" ? "menu-active-link" : ""}`} onClick={() => handleMenuItemClick("/employers-list-v3")}>
                  {t('HeaderNavContent.company_listings')}
                </MenuItem>
              )}

              {/* Show Job Listings for both roles */}
              <MenuItem className={`${pathname === "/job-list-v5" ? "menu-active-link" : ""}`} onClick={() => handleMenuItemClick("/job-list-v5")}>
                {t('HeaderNavContent.job_listings')}
              </MenuItem>

              {/* Show Candidate Listings only for employers */}
              {user?.team === "companies" && (
                <MenuItem className={`${pathname === "/candidates-list-v3" ? "menu-active-link" : ""}`} onClick={() => handleMenuItemClick("/candidates-list-v3")}>
                  {t('HeaderNavContent.candidate_listings')}
                </MenuItem>
              )}

              {/* Show appropriate dashboard link based on user role */}
              <MenuItem className={`${pathname.includes("dashboard") ? "menu-active-link" : ""}`}> 
                {user?.team === "companies" ? (
                  <span onClick={() => handleMenuItemClick("/employers-dashboard/company-profile")}>
                    {t('HeaderNavContent.company_dashboard')}
                  </span>
                ) : (
                  <span onClick={() => handleMenuItemClick("/candidates-dashboard/my-profile")}>
                    {t('HeaderNavContent.candidate_dashboard')}
                  </span>
                )}
              </MenuItem>

              {/* Logout option */}
              <MenuItem onClick={handleLogout}>
                {user?.team === "companies" ? t('EmployerSidebar.logout') : t('CandidateSidebar.logout')}
              </MenuItem>
            </>
          ) : (
            // Login/Register options for non-authenticated users
            <>
              {/* <MenuItem onClick={handleLogin}>
                {t('login')}
              </MenuItem>
              <MenuItem onClick={handleRegister}>
                {t('signup')}
              </MenuItem> */}
            </>
          )}
        </Menu>
      </Sidebar>

      <SidebarFooter />
    </div>
  );
};

export default Index;