import Link from "next/link";
import React from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

const AddBlock = ({ items = [] }) => {
  const { language } = useLanguage();
  
  // Custom titles with DIGI-X-TECH prefix for both languages
  const customTitles = {
    en: [
      <>
        <span>DIGI-X-TECH </span>Portal
      </>,
      <>
        <span>DIGI-X-TECH </span>Assurance
      </>,
      <>
        <span>DIGI-X-TECH </span>Principles
      </>
    ],
    de: [
      <>
        <span>DIGI-X-TECH </span>Portal
      </>,
      <>
        <span>DIGI-X-TECH </span>Assurance
      </>,
      <>
        <span>DIGI-X-TECH </span>Principles
      </>
    ],
    fr: [
      <>
        <span>DIGI-X-TECH </span>Portal
      </>,
      <>
        <span>DIGI-X-TECH </span>Assurance
      </>,
      <>
        <span>DIGI-X-TECH </span>Principles
      </>
    ]
  };

  // Use the appropriate titles based on the current language
  const titlesToUse = customTitles[language] || customTitles.en;
  
  // If items array is empty, show placeholders
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="flex flex-wrap">
        {[1, 2, 3].map((id) => (
          <div
            className="advrtise-block w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
            key={id}
          >
            <div
              className="inner-box bg-blue-50 h-full flex flex-col"
            >
              <h4 className="opacity-0">Loading...</h4>
              <div className="mt-2 flex-grow">
                <p className="opacity-0">Loading content...</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      {items.map((item, index) => (
        <div
          className="advrtise-block w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
          key={item.id || index}
        >
          <div
            className="inner-box bg-blue-50 h-full flex flex-col"
            style={{
              // backgroundImage: `url(/images/resource/${item.bgImageName}.png)`,
            }}
          >
            <h4>{titlesToUse[index] || item.title}</h4>
            <div className="mt-2 flex-grow">
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddBlock;
