import Image from "next/image";
import Link from "next/link";
import useAuth from "@/app/hooks/useAuth";
import { usePathname } from "next/navigation";
import employerMenuData from "@/data/employerMenuData";
import candidatesMenuData from "@/data/candidatesMenuData";
import { isActiveLink } from "@/utils/linkActiveChecker";

const SidebarHeader = () => {
  const { user } = useAuth(); // Get user authentication status
  const pathname = usePathname(); // Get current pathname

  return (
    <div className="pro-header">
      <Link href="/">
        <Image width={154} height={50} src="/images/jordii-logo.png" alt="brand" />
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
            <Link href="/">Home</Link>
          </li>
          <li className={`${pathname === "/about" ? "current" : ""}`}> 
            <Link href="/about">About Us</Link>
          </li>
          <li className={`${pathname === "/skills" ? "current" : ""}`}> 
            <Link href="/skills">Skills</Link>
          </li>

          {/* Additional navigation items - only when logged in */}
          {user && (
            <> 
              {/* Show Companies link only for job seekers */}
              {user.team === "jobSeekers" && (
                <li className={`${pathname === "/employers-list-v3" ? "current" : ""}`}> 
                  <Link href="/employers-list-v3">Company Listings</Link>
                </li>
              )}

              {/* Show Job Listings for both roles */}
              <li className={`${pathname === "/job-list-v5" ? "current" : ""}`}> 
                <Link href="/job-list-v5">Job Listings</Link>
              </li>

              {/* Show Candidate Listings only for employers */}
              {user.team === "companies" && (
                <li className={`${pathname === "/candidates-list-v3" ? "current" : ""}`}> 
                  <Link href="/candidates-list-v3">Candidate Listings</Link>
                </li>
              )}

              {/* Show appropriate dashboard link based on user role */}
              <li className={`${pathname.includes("dashboard") ? "current" : ""}`}> 
                {user.team === "companies" ? (
                  <Link href="/employers-dashboard/dashboard">Company Dashboard</Link>
                ) : (
                  <Link href="/candidates-dashboard/my-profile">Candidate Dashboard</Link>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarHeader;
