import { useTranslation } from "@/app/hooks/useTranslation";
import { useState, useEffect } from "react";

const Block8 = () => {
  const { t, loading } = useTranslation('skills');
  const [isLoading, setIsLoading] = useState(true);
  const [displayContent, setDisplayContent] = useState([]);
  
  // Fallback content in case translation fails
  const fallbackContent = [
    {
      id: 1,
      icon: "icon-drawing",
      title: "Job Postings",
      text: `Find and apply for your dream job among job postings from well-known companies across Germany - or let employers find you through your profile.`,
    },
    {
      id: 2,
      icon: "icon-process",
      title: "Visa Consulting",
      text: `We accompany you from the preliminary approval to the issuance of the visa and support you with our knowledge.`,
    },
    {
      id: 3,
      icon: "icon-task",
      title: "Language Courses",
      text: `If your language skills are not yet sufficient, we support you with our German language courses.`,
    },
    {
      id: 4,
      icon: "icon-one-finger-click",
      title: "Accommodation Support",
      text: `We support you in your search for accommodation so that you can arrive in Germany in peace and start your new life.`,
    },
    {
      id: 5,
      icon: "icon-task",
      title: "Upload Your Resume",
      text: `The latest design trends meet hand-crafted templates in Sassio Collection.`,
    },
    {
      id: 6,
      icon: "icon-one-finger-click",
      title: "Special Consulting",
      text: `You can learn about the process and chart your career path with a free consultation online or at our office in Istanbul.`,
    },
  ];
  
  useEffect(() => {
    if (!loading) {
      const blockContent = t('Block8.blocks');
      setDisplayContent(Array.isArray(blockContent) ? blockContent : fallbackContent);
      setIsLoading(false);
    }
  }, [loading, t]);
  
  // Show placeholder blocks during loading
  if (isLoading) {
    return (
      <>
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={id}>
            <div className="work-block -type-4">
              <div className="icon-wrap">
                <span className="icon opacity-0"></span>
              </div>
              <h5 className="title opacity-0">Loading...</h5>
              <p className="text opacity-0">Loading content...</p>
            </div>
          </div>
        ))}
      </>
    );
  }
  
  return (
    <>
      {displayContent.map((item) => (
        <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
          <div className="work-block -type-4">
            <div className="icon-wrap">
              <span className={`icon ${item.icon}`}></span>
            </div>

            <h5 className="title">{item.title}</h5>
            <p className="text">{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Block8;
