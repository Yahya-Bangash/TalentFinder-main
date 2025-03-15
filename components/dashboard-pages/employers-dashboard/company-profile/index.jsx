'use client'
import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import { useTranslation } from "@/app/hooks/useTranslation";

const index = () => {
    const { t } = useTranslation('companyListings');
    
    return (
        <div className="page-wrapper dashboard">
            <span className="header-span"></span>
            <LoginPopup />
            <DefaulHeader2 />
            <MobileMenu />
            <DashboardEmployerSidebar />

            <section className="user-dashboard">
                <div className="dashboard-outer">
                    <BreadCrumb title={t('companyProfile.title')} subtitle={t('companyProfile.subtitle')} />
                    <MenuToggler />

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                        <h4>{t('companyProfile.widgetTitle.myProfile')}</h4>
                                    </div>
                                    <MyProfile />
                                </div>
                            </div>

                            <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                        <h4>{t('companyProfile.widgetTitle.socialNetwork')}</h4>
                                    </div>
                                    <div className="widget-content">
                                        <SocialNetworkBox />
                                    </div>
                                </div>
                            </div>

                            <div className="ls-widget">
                                <div className="tabs-box">
                                    <div className="widget-title">
                                        <h4>{t('companyProfile.widgetTitle.contactInformation')}</h4>
                                    </div>
                                    <div className="widget-content">
                                        <ContactInfoBox />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CopyrightFooter />
        </div>
    );
};

export default index;
