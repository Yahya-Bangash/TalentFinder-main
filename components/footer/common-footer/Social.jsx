"use client";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect, useState } from "react";

const Social = () => {
  const { t } = useTranslation('common');
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const links = t('Social.links');
    if (Array.isArray(links) && links.length > 0) {
      setSocialLinks(links);
    } else {
      // Fallback content if translations are not available
      setSocialLinks([
        { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/", aria_label: "Follow us on Facebook" },
        { id: 2, icon: "fa-twitter", link: "https://www.twitter.com/", aria_label: "Follow us on Twitter" },
        { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/", aria_label: "Follow us on Instagram" },
        { id: 4, icon: "fa-linkedin-in", link: "https://www.linkedin.com/", aria_label: "Follow us on LinkedIn" },
      ]);
    }
  }, [t]);

  return (
    <>
      {socialLinks.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
          aria-label={item.aria_label}
        >
          <i className={`fab ${item.icon}`}></i>
        </a>
      ))}
    </>
  );
};

export default Social;
