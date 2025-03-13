"use client";
import Link from "next/link";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect, useState } from "react";

const FooterContent = () => {
  const { t } = useTranslation('common');
  const [footerSections, setFooterSections] = useState([]);

  useEffect(() => {
    const sections = t('FooterContent.sections');
    if (Array.isArray(sections) && sections.length > 0) {
      setFooterSections(sections);
    } else {
      // Fallback content if translations are not available
      setFooterSections([
        {
          id: 1,
          title: "For Candidates",
          menuList: [
            { name: "Browse Jobs", route: "/job-list-v5" },
            { name: "Browse Categories", route: "/job-list-v5" },
            { name: "Candidate Dashboard", route: "/candidates-dashboard/dashboard" }
          ]
        },
        {
          id: 2,
          title: "For Employers",
          menuList: [
            { name: "Browse Candidates", route: "/candidates-list-v3" },
            { name: "Employer Dashboard", route: "/employers-dashboard/dashboard" },
            { name: "Add Job", route: "/employers-dashboard/post-jobs" }
          ]
        },
        {
          id: 3,
          title: "About Us",
          menuList: [
            { name: "About Us", route: "/about" },
            { name: "Contact", route: "/contact" }
          ]
        },
        {
          id: 4,
          title: "Helpful Resources",
          menuList: [
            { name: "Site Map", route: "/" },
            { name: "Terms of Use", route: "/terms" },
            { name: "Privacy Center", route: "/" },
            { name: "Security Center", route: "/" },
            { name: "Accessibility Center", route: "/" }
          ]
        }
      ]);
    }
  }, [t]);

  return (
    <>
      {footerSections.map((item) => (
        <div
          className="footer-column col-lg-3 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="footer-widget links-widget">
            <h4 className="widget-title">{item.title}</h4>
            <div className="widget-content">
              <ul className="list">
                {item?.menuList?.map((menu, i) => (
                  <li key={i}>
                    <Link href={menu.route}>{menu.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterContent;
