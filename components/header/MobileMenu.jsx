"use client";

import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import useAuth from "@/app/hooks/useAuth";
import useUserProfile from "@/app/hooks/useUserProfile";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useRouter } from "next/navigation";

const MobileMenu = () => {
  const { user } = useAuth();
  const { profileData } = useUserProfile();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, [user]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    router.push('/login');
  };

  const handleProfileClick = () => {
    if (user?.team === "companies") {
      router.push("/employers-dashboard/company-profile");
    } else {
      router.push("/candidates-dashboard/my-profile");
    }
  };

  return (
    // <!-- Main Header-->
    <header className="main-header main-header-mobile">
      <div className="auto-container">
        {/* <!-- Main box --> */}
        <div className="inner-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image
                    width={154}
                    height={50}
                    src="/images/jordii-logo.png"
                    alt={t('DefaultHeader2.brand.alt_text')}
                  />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <MobileSidebar />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div className="login-box">
              {!isAuthenticated ? (
                <a
                  href="#"
                  className="call-modal"
                  onClick={handleLoginClick}
                >
                  <span className="icon icon-user"></span>
                </a>
              ) : (
                <div onClick={handleProfileClick} style={{ cursor: "pointer" }}>
                  <div style={{ 
                    width: "35px", 
                    height: "35px", 
                    backgroundColor: "#f0f0f0",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                  }}>
                    <Image
                      alt={t('DefaultHeader2.profile.alt_text')}
                      src={profileData?.profileImageUrl || "/images/user-profile-icon.svg"}
                      width={35}
                      height={35}
                      style={{ 
                        objectFit: "cover",
                        width: "100%",
                        height: "100%"
                      }}
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
            {/* login popup end */}

            <a
              href="#"
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span className="flaticon-menu-1"></span>
            </a>
            {/* right humberger menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
