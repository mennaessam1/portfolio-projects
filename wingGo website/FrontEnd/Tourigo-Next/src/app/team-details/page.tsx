import TeamDetailsMain from "@/components/team-details/TeamDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TeamDetails = () => {
  const id = 1;
  return (
    <>
      <MetaData pageTitle="Team Details">
        <Wrapper>
          <main>
            <TeamDetailsMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TeamDetails;
