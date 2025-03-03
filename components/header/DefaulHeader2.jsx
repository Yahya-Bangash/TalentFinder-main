'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import { getCurrentUser } from '@/appwrite/Services/authServices';
import candidatesMenuData from "../../data/candidatesMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import employerMenuData from "../../data/employerMenuData";

const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
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
                  height={1}
                  src="/images/jordii-logo.png"
                  alt="brand"
                />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          <div className="dropdown dashboard-option">
            <a className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></div>
                </div>
              ) : (
                <Image
                  alt="avatar"
                  className="thumb"
                  src={user && user.team === 'jobSeekers' ? "/images/jordii-logo.png" : "/images/resource/company-6.png"}
                  width={50}
                  height={50}
                />
              )}
              <span className="name">
                {user ? (user.team === 'jobSeekers' ? 'Candidate' : 'Company') : ''}
              </span>
            </a>
            <ul className="dropdown-menu">
              {user ? (
                user.team === 'jobSeekers' ? (
                  candidatesMenuData.map((item) => (
                    <li className={`${isActiveLink(item.routePath, usePathname()) ? "active" : ""}`} key={item.id}>
                      <Link href={item.routePath}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  employerMenuData.map((item) => (
                    <li className={`${isActiveLink(item.routePath, usePathname()) ? "active" : ""}`} key={item.id}>
                      <Link href={item.routePath}>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </Link>
                    </li>
                  ))
                )
              ) : null
            }
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
