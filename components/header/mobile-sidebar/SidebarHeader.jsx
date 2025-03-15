"use client";

import Image from "next/image";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import employerMenuData from "@/data/employerMenuData";
import candidatesMenuData from "@/data/candidatesMenuData";
import { isActiveLink } from "@/utils/linkActiveChecker";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect, useState } from "react";

const SidebarHeader = () => {
  const { user } = useAuth(); // Get user authentication status
  const pathname = usePathname(); // Get current pathname
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, [user]);

  const closeOffcanvas = () => {
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
  };

  const handleLoginClick = () => {
    closeOffcanvas();
    router.push('/login');
  };

  const handleRegisterClick = () => {
    closeOffcanvas();
    router.push('/register');
  };

  const handleNavClick = (path) => {
    closeOffcanvas();
    router.push(path);
  };

  return (
    <div className="pro-header">
      <Link href="/">
        <Image width={154} height={50} src="/images/jordii-logo.png" alt={t('DefaultHeader2.brand.alt_text')} />
      </Link>
      {/* End logo */}

      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}

      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* Basic navigation items - always visible */}
          <li className={`${pathname === "/" ? "current" : ""}`}> 
            <a href="#" onClick={() => handleNavClick("/")}>{t('HeaderNavContent.home')}</a>
          </li>
          <li className={`${pathname === "/about" ? "current" : ""}`}> 
            <a href="#" onClick={() => handleNavClick("/about")}>{t('HeaderNavContent.about_us')}</a>
          </li>
          <li className={`${pathname === "/skills" ? "current" : ""}`}> 
            <a href="#" onClick={() => handleNavClick("/skills")}>{t('HeaderNavContent.skills')}</a>
          </li>

          {/* Additional navigation items - only when logged in */}
          {isAuthenticated ? (
            <> 
              {/* Show Companies link only for job seekers */}
              {user?.team === "jobSeekers" && (
                <li className={`${pathname === "/employers-list-v3" ? "current" : ""}`}> 
                  <a href="#" onClick={() => handleNavClick("/employers-list-v3")}>{t('HeaderNavContent.company_listings')}</a>
                </li>
              )}

              {/* Show Job Listings for both roles */}
              <li className={`${pathname === "/job-list-v5" ? "current" : ""}`}> 
                <a href="#" onClick={() => handleNavClick("/job-list-v5")}>{t('HeaderNavContent.job_listings')}</a>
              </li>

              {/* Show Candidate Listings only for employers */}
              {user?.team === "companies" && (
                <li className={`${pathname === "/candidates-list-v3" ? "current" : ""}`}> 
                  <a href="#" onClick={() => handleNavClick("/candidates-list-v3")}>{t('HeaderNavContent.candidate_listings')}</a>
                </li>
              )}

              {/* Show appropriate dashboard link based on user role */}
              <li className={`${pathname.includes("dashboard") ? "current" : ""}`}> 
                {user?.team === "companies" ? (
                  <a href="#" onClick={() => handleNavClick("/employers-dashboard/company-profile")}>{t('HeaderNavContent.company_dashboard')}</a>
                ) : (
                  <a href="#" onClick={() => handleNavClick("/candidates-dashboard/my-profile")}>{t('HeaderNavContent.candidate_dashboard')}</a>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="#" onClick={handleLoginClick}>{t('login')}</a>
              </li>
              <li>
                <a href="#" onClick={handleRegisterClick}>{t('signup')}</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarHeader;
