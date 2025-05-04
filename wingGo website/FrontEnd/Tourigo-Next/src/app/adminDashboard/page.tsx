import ProfileTabs from "@/components/my-profile/ProfileTabs";
import ProfileTabsMain from "@/components/adminDashboard/ProfileTabsMain";
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
            <ProfileTabsMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TeamDetails;
