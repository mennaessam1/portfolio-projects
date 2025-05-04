import HomeSixMain from "@/components/home-six/HomeSixMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const HomePageFive = () => {
  return (
    <>
      <MetaData pageTitle="Home Six">
        <Wrapper>
          <main>
            <HomeSixMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default HomePageFive;
