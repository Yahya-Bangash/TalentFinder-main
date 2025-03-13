"use client";

import Link from "next/link";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import { useState, useEffect } from "react";
import employerMenuData from "../../data/employerMenuData";
import candidatesMenuData from "../../data/candidatesMenuData";
import { signOutUser } from "@/appwrite/Services/authServices";

const HeaderNavContent = () => {
  const { user, setUser, checkAuth } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Simple check for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken");
      setIsAuthenticated(!!authToken);
    };
    
    // Initial check
    checkAuth();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  

  useEffect(() => {
    checkAuth(); // Check authentication on component mount
  }, []);

  // const renderMenu = () => {
  //   const menuData = user.team === "companies" ? employerMenuData : candidatesMenuData;

  //   return menuData.map((item) => (
  //     <li key={item.name}>
  //       {item.name === "Logout" ? (
  //         <Link href={item.routePath} onClick={handleLogout}>{item.name}</Link> // Logout option
  //       ) : (
  //         <Link href={item.link}>{item.name}</Link>
  //       )}
  //     </li>
  //   ));
  // };

  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* Basic navigation itemss - always visible */}
          <li className={`${pathname === "/" ? "current" : ""}`}>
            <Link href="/">Home</Link>
          </li>
          {/* End homepage menu item */}

          <li className={`${pathname === "/about" ? "current" : ""}`}>
            <Link href="/about">About Us</Link>
          </li>
          {/* End About Page */}

          <li className={`${pathname === "/skills" ? "current" : ""}`}>
            <Link href="/skills">Skills</Link>
          </li>
          {/* End Skills */}

          {/* Additional navigation items - only when logged in */}
          {user && isAuthenticated && (
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
                {user && user.team ? (
                  <>
                    {user.team === "companies" && (
                      <Link href="/employers-dashboard/dashboard">Company Dashboard</Link>
                    )}
                    {user.team === "jobSeekers" && (
                      <Link href="/candidates-dashboard/my-profile">Candidate Dashboard</Link>
                    )}
                  </>
                ) : (
                  router.push('/')
                )}
              </li>
            </>
          )}

          {/* <li
            className={`${
              isActiveParent(findJobItems, usePathname()) ? "current" : ""
            } dropdown has-mega-menu`}
            id="has-mega-menu"
          >
            <span>Find Jobs</span>
            <div className="mega-menu">
              <div className="mega-menu-bar row">
                {findJobItems.map((item) => (
                  <div
                    className="column col-lg-3 col-md-3 col-sm-12"
                    key={item.id}
                  >
                    <h3>{item.title}</h3>
                    <ul>
                      {item.items.map((menu, i) => (
                        <li
                          className={
                            isActiveLink(menu.routePath, usePathname())
                              ? "current"
                              : ""
                          }
                          key={i}
                        >
                          <Link href={menu.routePath}>{menu.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li> */}
          {/* End findjobs menu items */}

          {/* <li
            className={`${
              isActiveParent(employerItems, usePathname()) ||
              usePathname()?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <span>Employers</span>
            <ul>
              {employerItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, usePathname())
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, usePathname())
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link href={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li
                className={
                  usePathname()?.includes("/employers-dashboard")
                    ? "current"
                    : ""
                }
              >
                <Link href="/employers-dashboard/dashboard">
                  Employers Dashboard
                </Link>
              </li>
            </ul>
          </li> */}
          {/* End Employers menu items */}

          {/* <li
            className={`${
              isActiveParent(candidateItems, usePathname()) ||
              usePathname()?.split("/")[1] === "candidates-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <span>Dashboards</span>
            <ul>
              {candidateItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={
                      isActiveParentChaild(item.items, usePathname())
                        ? "current"
                        : ""
                    }
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, usePathname())
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link href={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li
                className={
                  usePathname()?.includes("/employers-dashboard")
                    ? "current"
                    : ""
                }
              >
                <Link href="/employers-dashboard/dashboard">
                  Employers Dashboard
                </Link>
              </li>
              <li
                className={
                  usePathname()?.includes("/candidates-dashboard/")
                    ? "current"
                    : ""
                }
              >
                <Link href="/candidates-dashboard/my-profile">
                  Candidates Dashboard
                </Link>
              </li>
            </ul>
          </li> */}
          {/* End Candidates menu items */}

          {/* <li
            className={`${
              isActiveParentChaild(blogItems, usePathname()) ? "current" : ""
            } dropdown`}
          >
            <span>Blog</span>
            <ul>
              {blogItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, usePathname()) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> */}
          {/* End Blog menu items */}

          {/* <li
            className={`${
              isActiveParentChaild(pageItems, usePathname()) ||
              isActiveParentChaild(shopItems[0].items, usePathname())
                ? "current "
                : ""
            } dropdown`}
          >
            <span>Pages</span>
            <ul>
              {shopItems.map((item) => (
                <li className="dropdown" key={item.id}>
                  <span
                    className={`${
                      isActiveParentChaild(shopItems[0].items, usePathname())
                        ? "current "
                        : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <ul>
                    {item.items.map((menu, i) => (
                      <li
                        className={
                          isActiveLink(menu.routePath, usePathname())
                            ? "current"
                            : ""
                        }
                        key={i}
                      >
                        <Link href={menu.routePath}>{menu.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              {pageItems.map((item, i) => (
                <li
                  className={
                    isActiveLink(item.routePath, usePathname()) ? "current" : ""
                  }
                  key={i}
                >
                  <Link href={item.routePath}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li> */}
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
