import HomeFourMain from "@/components/home-four/HomeFourMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const HomePageFour = () => {
  return (
    <>
      <MetaData pageTitle="Home Four">
        <Wrapper>
          <main>
            <HomeFourMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default HomePageFour;
