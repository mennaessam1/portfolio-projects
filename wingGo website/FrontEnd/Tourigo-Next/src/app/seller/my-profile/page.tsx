import ProfileTabs from "@/components/adminDashboard/ProfileTabs";
import AdvertiserProfileMain from "@/components/advertiser-profile/AdvertiserProfileMain";
import SellerProfileMain from "@/components/seller-profile/SellerProfileMain";

import TeamDetailsMain from "@/components/team-details/TeamDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TeamDetails = () => {
  
  return (
    <>
      <MetaData pageTitle="Team Details">
        <Wrapper>
          <main>
            <SellerProfileMain />
          </main>
        </Wrapper>
      </MetaData>
    </>    
         
  );
};

export default TeamDetails;
