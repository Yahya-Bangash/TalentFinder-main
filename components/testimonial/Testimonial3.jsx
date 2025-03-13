'use client'

import Image from "next/image";
import { useTranslation } from "@/app/hooks/useTranslation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

const Testimonial3 = () => {
  const { t } = useTranslation('home');
  const { language } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Get testimonials from translations
    const testimonialsData = t('testimonial3.testimonials', { returnObjects: true });
    if (Array.isArray(testimonialsData) && testimonialsData.length > 0) {
      setTestimonials(testimonialsData);
    }
  }, [t, language]);

  // If no testimonials from translations, use default
  const defaultTestimonial = {
    id: 1,
    feedback: "Great quality!",
    name: "Jordis Kengne",
    designation: "Owner and Managing Director of DXT SARL",
    avatar: "/images/resource/Jordiee.jpg",
    text: "DXT is a company based in Douala, specializing in digital technology, commerce, professional training, and support for international mobility (studies, employment, and work opportunities)"
  };

  const displayTestimonial = testimonials.length > 0 ? testimonials[0] : defaultTestimonial;

  return (
    <>
      <div className="slide-item">
        <div className="image-column">
          <figure className="image">
            <Image
              width={410}
              height={500}
              src={displayTestimonial.avatar}
              alt="testimonial"
            />
          </figure>
        </div>
        <div className="content-column">
          <div className="testimonial-block-three">
            <div className="inner-box">
              <h4 className="title">{displayTestimonial.feedback}</h4>
              <div className="text">{displayTestimonial.text}</div>
              <div className="info-box">
                <h4 className="name">{displayTestimonial.name}</h4>
                <span className="designation">{displayTestimonial.designation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial3;
