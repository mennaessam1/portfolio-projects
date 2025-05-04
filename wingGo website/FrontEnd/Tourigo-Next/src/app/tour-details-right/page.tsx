import TourDetailsRightMain from "@/components/tour-details-right/TourDetailsRightMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourDetailsRight = () => {
  return (
    <>
      <MetaData pageTitle="Tour Details Right">
        <Wrapper>
          <main>
            <TourDetailsRightMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourDetailsRight;
