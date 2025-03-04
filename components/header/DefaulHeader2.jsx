'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import { checkAuth, getCurrentUser } from '@/appwrite/Services/authServices';
import candidatesMenuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import employerMenuData from "../../data/employerMenuData";

const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultProfileImage = "/images/icons/user.svg";

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    
    const fetchUser = async () => {
      try {
        // First check if user is authenticated
        const isAuthenticated = await checkAuth();
        
        if (isAuthenticated) {
          try {
            const currentUser = await getCurrentUser();
            if (currentUser) {
              setUser(currentUser);
            } else {
              setUser(null);
            }
          } catch (error) {
            console.error("Error getting current user:", error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
    
    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <header
      className={`main-header ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="main-box">
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link href="/">
                <Image
                  width={98}
                  height={1}
                  src="/images/jordii-logo.png"
                  alt="brand"
                />
              </Link>
            </div>
          </div>

          <HeaderNavContent />
        </div>

        <div className="outer-box">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : user ? (
            <div className="dropdown dashboard-option">
              <a
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Image
                  alt="avatar"
                  className="thumb rounded-full"
                  src={user.profileImg || defaultProfileImage}
                  width={40}
                  height={40}
                  style={{
                    objectFit: 'cover'
                  }}
                />
                <div className="name-wrapper" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0px'
                }}>
                  <span className="name" style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#202124',
                    lineHeight: '1.2'
                  }}>{user.name || 'User'}</span>
                  <span className="user-type" style={{
                    fontSize: '12px',
                    color: '#666',
                    lineHeight: '1.2'
                  }}>{user.team === "companies" ? "Company" : "Job Seeker"}</span>
                </div>
              </a>

              <ul className="dropdown-menu">
                {user.team === 'jobSeekers' 
                  ? candidatesMenuData.map((item) => (
                      <li
                        className={`${
                          isActiveLink(item.routePath, usePathname()) ? "active" : ""
                        } mb-1`}
                        key={item.id}
                      >
                        <Link href={item.routePath}>
                          <i className={`la ${item.icon}`}></i> {item.name}
                        </Link>
                      </li>
                    ))
                  : employerMenuData.map((item) => (
                      <li
                        className={`${
                          isActiveLink(item.routePath, usePathname()) ? "active" : ""
                        } mb-1`}
                        key={item.id}
                      >
                        <Link href={item.routePath}>
                          <i className={`la ${item.icon}`}></i> {item.name}
                        </Link>
                      </li>
                    ))
                }
              </ul>
            </div>
          ) : (
            <div className="btn-box">
              <Link href="/register" className="theme-btn btn-style-three">
                Login / Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
