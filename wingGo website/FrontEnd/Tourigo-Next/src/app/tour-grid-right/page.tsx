import TourGridRightMain from "@/components/tour-grid-right/TourGridRightMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourGridRight = () => {
  return (
    <>
      <MetaData pageTitle="Tour Grid Right">
        <Wrapper>
          <main>
            <TourGridRightMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourGridRight;
