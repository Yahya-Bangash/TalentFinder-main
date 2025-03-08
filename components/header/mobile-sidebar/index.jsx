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

const Index = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push("/"); // Redirect to home after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
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
          <MenuItem className={`${pathname === "/" ? "menu-active-link" : ""}`} onClick={() => router.push("/")}>Home</MenuItem>
          <MenuItem className={`${pathname === "/about" ? "menu-active-link" : ""}`} onClick={() => router.push("/about")}>About Us</MenuItem>
          <MenuItem className={`${pathname === "/skills" ? "menu-active-link" : ""}`} onClick={() => router.push("/skills")}>Skills</MenuItem>

          {/* Additional navigation items - only when logged in */}
          {user && (
            <> 
              {/* Show Companies link only for job seekers */}
              {user.team === "jobSeekers" && (
                <MenuItem className={`${pathname === "/employers-list-v3" ? "menu-active-link" : ""}`} onClick={() => router.push("/employers-list-v3")}>Company Listings</MenuItem>
              )}

              {/* Show Job Listings for both roles */}
              <MenuItem className={`${pathname === "/job-list-v5" ? "menu-active-link" : ""}`} onClick={() => router.push("/job-list-v5")}>Job Listings</MenuItem>

              {/* Show Candidate Listings only for employers */}
              {user.team === "companies" && (
                <MenuItem className={`${pathname === "/candidates-list-v3" ? "menu-active-link" : ""}`} onClick={() => router.push("/candidates-list-v3")}>Candidate Listings</MenuItem>
              )}

              {/* Show appropriate dashboard link based on user role */}
              <MenuItem className={`${pathname.includes("dashboard") ? "menu-active-link" : ""}`}> 
                {user.team === "companies" ? (
                  <span onClick={() => router.push("/employers-dashboard/dashboard")}>Company Dashboard</span>
                ) : (
                  <span onClick={() => router.push("/candidates-dashboard/my-profile")}>Candidate Dashboard</span>
                )}
              </MenuItem>

              {/* Logout option */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          )}
        </Menu>
      </Sidebar>

      <SidebarFooter />
    </div>
  );
};

export default Index;