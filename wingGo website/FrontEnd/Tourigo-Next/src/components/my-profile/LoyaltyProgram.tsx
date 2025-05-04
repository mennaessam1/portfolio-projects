import { redeemPoints } from '@/api/LoyaltyApi';
import CountUpContent from '@/elements/counter/CountUpContent';
import Modal from 'react-modal';
import React, { useState } from 'react';
import { FaWallet } from "react-icons/fa";
import { toast } from 'sonner';


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

    const [isLoyaltyPointsModalOpen, setIsLoyaltyPointsModalOpen] = useState(false);
    const [pointsToRedeem, setPointsToRedeem] = useState(0);

    const handleClaimReward = async () => {
      const toastId = toast.loading('Redeeming points...');
        try {
          console.log('Redeeming points:', pointsToRedeem);

          const response = await redeemPoints(id, pointsToRedeem);
           console.log('Redeem points response:', response);
             setWalletCredit(response.wallet);
             setLoyalityPoints(response.loyaltyPoints);
             
             setRefreshData(true);
             setIsLoyaltyPointsModalOpen(false);
              toast.success('Points redeemed successfully!', { id: toastId });
          // Handle the response (e.g., update the UI or show a success message)
        } catch (error) {
          console.error('Error redeeming points:', error);
          if(pointsToRedeem > loyaltyPoints){
            toast.error('You do not have enough points to redeem!', { id: toastId });
          }else{
            if(pointsToRedeem < 100){
              toast.error('You can\'t redeem less than a 100 points!', { id: toastId });

            } else{
              toast.error('Error redeeming points. Please try again later.', { id: toastId });
            }

          // Handle the error (e.g., show an error message)
        }
      }};

  return (<>
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
                        data-purecounter-duration="0"
                        data-purecounter-end="369"
                        className=""
                      >
                        {walletCredit.toFixed(2)}
                      </span>
                    </h2>    

              
            
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
                        {loyaltyPoints}
                      </span>
                    </h2>


                    
                    <button 
                    onClick={() => setIsLoyaltyPointsModalOpen(true)}
                    className="bd-primary-btn btn-style radius-60 mt-10">
                      Redeem Points
                        
                    </button>
                    
                    
                  </div>
                </div>
              </div>
            </div>

          </div>
        
    </section>
    <Modal
    isOpen={isLoyaltyPointsModalOpen}
    onRequestClose={() => setIsLoyaltyPointsModalOpen(false)}
    contentLabel="Claim Loyalty Points"
    style={{
      content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        zIndex: 1050 // Set a high z-index for the modal content
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1040 // Set a slightly lower z-index for the overlay
      }
    }}
  >
    <h3>Loyalty Points</h3>
    <div style={{ marginBottom: '15px' }}>
    <label
      htmlFor="points"
      style={{
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
      }}
    >
      Amount to Redeem:
    </label>
      <input
        type="text"
        id="points"
        name="points"
        value={pointsToRedeem}
        onChange={(e) => {
          const value = e.target.value; // Get the value from the event
          setPointsToRedeem(value ? parseInt(value) : 0); // Parse the value to an integer or default to 0
        }}
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ced4da',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          color: '#495057'
        }}
      />
    </div>
    <button
      onClick={handleClaimReward}
      className="bd-primary-btn btn-style radius-60 mb-10"
    >
      Claim
    </button>
  </Modal>
  </>
  );
};

export default LoyaltyProgram;