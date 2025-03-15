"use client";

import Link from "next/link";
import About from "../about/About";
import AppSection from "../app-section/AppSection";
import Blog from "../blog/Blog";
import CallToAction from "../call-to-action/CallToAction";
import LoginPopup from "../common/form/login/LoginPopup";
import FooterDefault from "../footer/common-footer";
import Funfact from "../fun-fact-counter/Funfact";
import DefaulHeader2 from "../header/DefaulHeader2";
import MobileMenu from "../header/MobileMenu";
import Hero3 from "../hero/hero-3";
import RegBanner2 from "../block/RegBanner2";
import Block8 from "../block/Block8";
import CallToAction11 from "../call-to-action/CallToAction11";
import About2 from "../about/About2";
import Testimonial3 from "../testimonial/Testimonial3";
import FaqChild from "../pages-menu/faq/FaqChild";


import JobCategorie1 from "../job-categories/JobCategorie1";
import Testimonial from "../testimonial/Testimonial";
import useAuth from "@/app/hooks/useAuth";
import { useTranslation } from "@/app/hooks/useTranslation";

const index = () => {
  const { user, loading } = useAuth();
  const { t: tCommon } = useTranslation('common');
  const { t: tHome } = useTranslation('home');

  return (
    <>
      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero3 />
      {/* End Hero Section */}


      <section className="job-categories ui-job-categories">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{tHome('categories.title')}</h2>
            <div className="text">{tHome('categories.subtitle')}</div>
          </div>

          <div
            className="row"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            {/* <!-- Category Block --> */}
            <JobCategorie1 />
          </div>
        </div>
      </section>
      {/* End Job Categorie Section */}

      <section className="registeration-banners">
        <div className="auto-container">
          <div className="row" data-aos="fade-up">
            <RegBanner2 />
          </div>
        </div>
      </section>
      {/* <!-- End Skills/Companies Banners -->  */}

      <section className="layout-pt-120 layout-pb-120">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{tCommon('index.services.title')}</h2>
          </div>
          {/* End sec-title */}

          <div className="row grid-base pt-50 items-center" data-aos="fade-up">
            <Block8 />
            {/* <!-- Work Block --> */}
          </div>
        </div>
      </section>
      {/* <!-- End Services Section --> */}

      <section className="about-section-two">
        <div className="auto-container">
          <div className="row">
            <About2 />
          </div>
        </div>
      </section>
      {/* <!-- End About Section --> */}

      <section className="testimonial-section-three">
        <div className="auto-container">
          {/* <!-- Sec Title --> */}
          <div className="sec-title text-center text-5xl font-medium">
            {tHome('testimonials.title')}
          </div>
          {/* End sec-title */}

          <div className="carousel-outer" data-aos="fade-up">
            {/* <!-- Testimonial Carousel --> */}
            <div className="testimonial-carousel">
              <Testimonial3 />
            </div>
          </div>
        </div>
        {/* End auto-container */}
      </section>

      <CallToAction11 />
      {/* <!-- End CallToAction Section --> */}

      <section className="faqs-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{tCommon('index.faq.title')}</h2>
          </div>
          {/* <!--Accordian Box--> */}
          <ul className="accordion-box">
            <FaqChild namespace="common" translationKey="FAQ.items" />
          </ul>
        </div>
      </section>
      {/* <!-- End Faqs Section --> */}

      <FooterDefault />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
