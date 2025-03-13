import Link from "next/link";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useState, useEffect } from "react";

const Breadcrumb = ({ title = "", meta = "", namespace = "common" }) => {
  const { t, loading: translationLoading } = useTranslation(namespace);
  const { t: tCommon, loading: commonLoading } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(true);
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayMeta, setDisplayMeta] = useState("");
  
  useEffect(() => {
    if (!translationLoading && !commonLoading) {
      setDisplayTitle(title || t('page.title'));
      setDisplayMeta(meta || t('page.meta'));
      setIsLoading(false);
    }
  }, [translationLoading, commonLoading, title, meta, t]);
  
  // Don't render the breadcrumb until translations are loaded
  if (isLoading) {
    return (
      <section className="page-title">
        <div className="auto-container">
          <div className="title-outer">
            <h1 className="opacity-0">Loading...</h1>
            <ul className="page-breadcrumb">
              <li>
                <Link href="/" className="opacity-0">Home</Link>
              </li>
              <li className="opacity-0">Loading...</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="page-title">
      <div className="auto-container">
        <div className="title-outer">
          <h1>{displayTitle}</h1>
          <ul className="page-breadcrumb">
            <li>
              <Link href="/">{tCommon('home')}</Link>
            </li>
            <li>{displayMeta}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
