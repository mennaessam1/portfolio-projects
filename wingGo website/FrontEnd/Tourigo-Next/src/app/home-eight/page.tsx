import HomeThreeMain from "@/components/home-eight/HomeThreeMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const HomePageThree = () => {
  return (
    <>
      <MetaData pageTitle="Home Three">
        <Wrapper>
          <main>
            <HomeThreeMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default HomePageThree;
