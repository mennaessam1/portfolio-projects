import TeamMain from "@/components/team/TeamMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const Team = () => {
  return (
    <>
      <MetaData pageTitle="Team">
        <Wrapper>
          <main>
            <TeamMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default Team;
