"use client"
import React, {useState, useEffect} from "react";
import ProfileDetails from './ProfileDetails';
import LoyaltyProgram from './LoyaltyProgram';
import HotelBookings from './HotelBookings';
import FlightBookings from './FlightBookings';
import TransportBookings from './TransportBookings';
import { viewTouristProfile } from "@/api/ProfileApi";
import { set } from "date-fns";
import Prefrences from "./Prefrences";
import PromoCodes from "./PromoCodes";
import { FaCarSide } from "react-icons/fa";


interface ProfileDetailsProps {
  id: string;
}

const ProfileTabs: React.FC<ProfileDetailsProps> = ({ id }) => {

  

  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);
  const [preferencesRefresh, setPreferencesRefresh] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await viewTouristProfile(id);
        
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
    setRefresh(false);
    setPreferencesRefresh(false);
    
  }, [id, refresh, preferencesRefresh]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileDetails profileData={profileData} id={id} setRefreshData={setRefresh}/>;
      case 'loyalty':
        
        return <LoyaltyProgram profileData={profileData} id={id} refreshData={refresh} setRefreshData={setRefresh}/>;
      case 'Preferences':
        
        return <Prefrences profileData={profileData} id={id} setPrefrenceRefresh={setPreferencesRefresh}/>;
      case 'hotel':        
          return <HotelBookings id={id} />
      case 'transport':
        return <TransportBookings id={id} />;
      case 'flight':
            return <FlightBookings id={id}/>;
            case "promocodes": 
      return <PromoCodes id={id} />;
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
                        id="nav-community-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-community-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-community-2"
                        aria-selected="false"
                        onClick={() => setActiveTab('Preferences')}
                      >
                        <span>
                          <i className="icon-heart"></i>
                        </span>
                        Preferences
                      </button>
                      <button
                        className="nav-link"
                        id="nav-community-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-community-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-community-2"
                        aria-selected="false"
                        onClick={() => setActiveTab('loyalty')}
                      >
                        <span>
                          <i className="icon-dimond"></i>
                        </span>
                        Loyalty Program
                      </button>
                      
                      <button
                        className="nav-link"
                        id="nav-community-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-community-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-community-2"
                        aria-selected="false"
                        onClick={() => setActiveTab('hotel')}
                      >
                        <span>
                          <i className="icon-hotel"></i>
                        </span>
                        Hotel Bookings
                      </button>
                      <button
                        className="nav-link"
                        id="nav-community-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-community-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-community-2"
                        aria-selected="false"
                        onClick={() => setActiveTab('flight')}
                      >
                        <span>
                          <i className="icon-travel-plane"></i>
                        </span>
                        Flight Bookings
                      </button>
                      <button
                        className="nav-link"
                        id="nav-community-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-community-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-community-2"
                        aria-selected="false"
                        onClick={() => setActiveTab('transport')}
                      >
                        <span>
                        <FaCarSide />
                        </span>
                        Transports Bookings
                      </button>
                      <button
                        className="nav-link"
                          id="nav-community-2-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-community-2"
                          type="button"
                          role="tab"
                          aria-controls="nav-community-2"
                          aria-selected="false"
                          onClick={() => setActiveTab("promocodes")}
                          >
                          <span>
                          <i className="fa fa-tag"></i>
                          </span>
                          Promo Codes
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

export default ProfileTabs;
