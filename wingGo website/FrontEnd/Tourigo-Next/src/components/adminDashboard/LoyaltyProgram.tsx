import { redeemPoints } from '@/api/LoyaltyApi';
import CountUpContent from '@/elements/counter/CountUpContent';
import React, { useState } from 'react';
import { FaWallet } from "react-icons/fa";


interface Props {
    id: string,
    profileData: any,
    refreshData: boolean,
    setRefreshData: any
    }
const LoyaltyProgram: React.FC<Props> = ({id, profileData, refreshData, setRefreshData}) => {

    const [badgeLevel, setBadgeLevel] = useState(profileData?.badge.level);
    const [walletCredit, setWalletCredit] = useState(profileData?.wallet);
    const [loyaltyPoints, setLoyalityPoints] = useState(profileData?.loyaltyPoints);

    const handleClaimReward = async () => {
        try {
          // const response = await redeemPoints(id);
          // console.log('Redeem points response:', response);
          //   setWalletCredit(response.wallet);
          //   setLoyalityPoints(response.loyaltyPoints);
          //   setBadgeLevel(response.badge.level);
          //   setRefreshData(true);
          // Handle the response (e.g., update the UI or show a success message)
        } catch (error) {
          console.error('Error redeeming points:', error);
          // Handle the error (e.g., show an error message)
        }
      };

  return (
    <section className="bd-team-details-area section-space position-relative">
        <h2 className="team-single-title mb-50">Badge Level {badgeLevel}</h2>
        <div className="row gy-24">
            <div className="col-xxl-5 col-xl-3 col-lg-3 col-md-3 col-sm-6">
              <div className="counter-wrapper counter-style-four">
                <div className="counter-item">
                  <div className="counter-content">
                    <span className="counter-icon bg-two">
                      <FaWallet />
                    </span>
                    <h2>
                      <span
                        data-purecounter-duration="1"
                        data-purecounter-end="369"
                        className="purecounter"
                      >
                        <CountUpContent number={walletCredit} text="" />
                      </span>
                    </h2>    

              <div className="bd-primary-btn btn-style mt-20 is-bg radius-60" >
                
                <span className="bd-primary-btn-text">Wallet Credit</span>
                <span className="bd-primary-btn-circle"></span>
                
              </div>
            
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-3 col-lg-3 col-md-3 col-sm-6">
              <div className="counter-wrapper counter-style-four">
                <div className="counter-item">
                  <div className="counter-content">
                    <span className="counter-icon bg-two">
                      <i className="icon-dimond"></i>
                    </span>
                    <h2>
                      <span
                        data-purecounter-duration="1"
                        data-purecounter-end="950"
                        className="purecounter"
                      >
                        <CountUpContent number={loyaltyPoints} text="" />
                      </span>
                    </h2>


                    
                    <button 
                    onClick={handleClaimReward}
                    className="bd-switch-btn has-left mt-20">
                        <div className="bd-switch-default">
                        <span>Loyality Points</span>
                        </div>
                        <div className="bd-switch-hover">
                        <span>Claim</span>
                        </div>
                    </button>
                    
                    
                  </div>
                </div>
              </div>
            </div>

          </div>
        
    </section>
  );
};

export default LoyaltyProgram;