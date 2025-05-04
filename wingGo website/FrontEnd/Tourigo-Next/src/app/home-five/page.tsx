import HomeFiveMain from "@/components/home-five/HomeFiveMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const HomePageFive = () => {
  return (
    <>
      <MetaData pageTitle="Home Five">
        <Wrapper>
          <main>
            <HomeFiveMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default HomePageFive;
