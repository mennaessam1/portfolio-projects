import HomeTwoMain from "@/components/home-two/HomeTwoMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const HomePageTwo = () => {
  return (
    <>
      <MetaData pageTitle="Home Two">
        <Wrapper>
          <main>
            <HomeTwoMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default HomePageTwo;
