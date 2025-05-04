import ProfileTabs from "@/components/adminDashboard/ProfileTabs";


import TeamDetailsMain from "@/components/team-details/TeamDetailsMain";
import AdvertiserProfile from "@/components/tourguide-profile/TourGuideProfile";
import TourGuideProfileMain from "@/components/tourguide-profile/TourGuideProfileMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TeamDetails = () => {
  
  return (
    <>
      <MetaData pageTitle="Team Details">
        <Wrapper>
          <main>
            <TourGuideProfileMain />
          </main>
        </Wrapper>
      </MetaData>
    </>    
         
  );
};

export default TeamDetails;
