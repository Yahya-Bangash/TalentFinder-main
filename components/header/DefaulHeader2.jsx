'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import useAuth from "@/app/hooks/useAuth";
import useUserProfile from "@/app/hooks/useUserProfile";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";
import { signOutUser } from "@/appwrite/Services/authServices";
import candidatesMenuData from "@/data/candidatesMenuData";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { useTranslation } from "@/app/hooks/useTranslation";

const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);
  const { user, setUser } = useAuth();
  const { profileData, loading: profileLoading, error: profileError } = useUserProfile();
  console.log('profile url url '+ profileData?.profileImageUrl);
  
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  const router = useRouter();
  
  // Get language context
  const { language, changeLanguage } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t } = useTranslation('common');

  // Language options with flags
  const languages = [
    { code: 'en', name: 'English', flag: '/images/flags/gb.svg' },
    { code: 'de', name: 'Deutsch', flag: '/images/flags/de.svg' },
    { code: 'fr', name: 'Français', flag: '/images/flags/fr.svg' },
  ];

  // Function to handle language change
  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  // Simple function to handle logout
  const handleLogout = async (e, itemName) => {
    if (itemName === "Logout" || itemName === t('EmployerSidebar.logout') || itemName === t('CandidateSidebar.logout')) {
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
          {t('DefaultHeader2.loading')}
        </span>
      );
    }

    if (profileError) {
      console.error('Profile error:', profileError);
      return (
        <span className="theme-btn btn-style-three error">
          {t('DefaultHeader2.error_loading')}
        </span>
      );
    }

    if (!user || !isAuthenticated) {
      return (
        <Link href="/login" className="theme-btn btn-style-three">
          {t('DefaultHeader2.login_register')}
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
          {(user.team === "companies" ? employerMenuData : candidatesMenuData).map((item) => {
            // Convert menu item name to translation key format (lowercase with underscores)
            const translationKey = item.name.toLowerCase().replace(/ /g, '_');
            
            return (
              <li
                className={`${isActiveLink(item.routePath, pathname) ? "active" : ""} mb-1`}
                key={item.id}
              >
                <Link href={item.routePath} onClick={(e) => handleLogout(e, item.name)}>
                  <i className={`la ${item.icon}`}></i>{" "}
                  {user.team === "companies" 
                    ? t(`EmployerSidebar.${translationKey}`)
                    : t(`CandidateSidebar.${translationKey}`)
                  }
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  // Language switcher component
  const renderLanguageSwitcher = () => {
    const currentLang = languages.find(lang => lang.code === language);
    
    return (
      <div className="language-switcher" style={{ position: 'relative', marginRight: '15px' }}>
        <button 
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '4px'
          }}
        >
          <div style={{ 
            width: '24px', 
            height: '24px', 
            borderRadius: '50%', 
            overflow: 'hidden',
            marginRight: '5px'
          }}>
            <Image 
              src={currentLang.flag} 
              alt={currentLang.name} 
              width={24} 
              height={24}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span style={{ fontSize: '14px', color: '#202124' }}>{currentLang.code.toUpperCase()}</span>
          <i className="la la-angle-down" style={{ marginLeft: '5px' }}></i>
        </button>
        
        {showLanguageDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            backgroundColor: '#fff',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            padding: '5px 0',
            zIndex: 100,
            minWidth: '150px',
            marginTop: '5px'
          }}>
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 15px',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  background: lang.code === language ? '#f5f5f5' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = lang.code === language ? '#f5f5f5' : 'transparent'}
              >
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  overflow: 'hidden',
                  marginRight: '10px'
                }}>
                  <Image 
                    src={lang.flag} 
                    alt={lang.name} 
                    width={20} 
                    height={20}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <span style={{ fontSize: '14px' }}>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
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
          <div className="btn-box" style={{ display: 'flex', alignItems: 'center' }}>
            {renderLanguageSwitcher()}
            {renderProfileContent()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;