"use client"
import React, {useState, useEffect} from "react";
import ProfileDetails from './ProfileDetails';
import { viewTouristProfile } from "@/api/ProfileApi";
import { set } from "date-fns";
import { getAdvertiserLogo, viewAdvertiserProfile } from "@/api/AdvertiserProfileApi";
import TermsConditions from "./TermsAndConditions";
import { getSellerLogo, viewSellerProfile } from "@/api/SellerProfileApi";



interface ProfileDetailsProps {
  id: string;
}

const SellerProfile: React.FC<ProfileDetailsProps> = ({ id }) => {

  

  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);
  const [logo, setLogo] = useState<any>(null);
  const [refreshLogo, setRefreshLogo] = useState(false);
  const [refreshTerms, setRefreshTerms] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await viewSellerProfile(id);
        
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchSellerLogo = async () => {
        try {
            const data = await getSellerLogo(id);
            console.log('Logo data:', data);
            setLogo(data);
        } catch (error) {
            console.error('Error fetching logo data:', error);
        }
     };

    fetchProfileData();
    fetchSellerLogo();
    setRefresh(false);
    setRefreshLogo(false);
    setRefreshTerms(false);
    
  }, [id, refresh, refreshLogo, refreshTerms]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileDetails profileData={profileData} id={id} logo={logo} setRefreshLogo={setRefreshLogo}/>;
      case 'terms' :
        return <TermsConditions profileData={profileData} id={id} setRefreshTerms={setRefreshTerms}/>;
        
      default:
        return null;
    }
  };

  return (
    <>
      <section className="faq__area section-space-bottom faq__style-6 p-relative z-index-1 fix">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            
          </div>
          <div className="row gy-24">
            <div className="col-xxl-3 col-xl-3 col-lg-3 mt-125">
              <div
                className="accordion-wrapper mb-35 wow bdFadeInUp"
                data-wow-delay=".3s"
                data-wow-duration="1s"
              >
                <div className="faq-tab accordion-wrapper faq-style-2">
                  <nav>
                    <div
                      className="nav nav-tabs flex-column"
                      id="nav-tab-2"
                      role="tablist"
                    >
                      <button
                        className="nav-link active"
                        id="nav-general-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-general-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-general-2"
                        aria-selected="false"
                        onClick={() => setActiveTab('profile')}
                      >
                        <span>
                        <i className="icon-profile"></i>
                        </span>
                        Account Details
                      </button>

                      <button
                        className="nav-link"
                        id="nav-general-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-general-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-general-2"
                        aria-selected="false"
                        onClick={() => setActiveTab('terms')}
                      >
                        <span>
                        <i className="icon-profile"></i>
                        </span>
                        Terms & Conditions
                      </button>
                      
                      
                      
                      
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="tab-content" style={{ marginLeft: '20px', flex: 1 }}>
                {renderTabContent()}
              </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellerProfile;
