import HomeMain from "@/components/home/HomeMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const HomePageOne = () => {
  return (
    <>
      <MetaData pageTitle="Home">
        <Wrapper>
          <main>
            <HomeMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default HomePageOne;
