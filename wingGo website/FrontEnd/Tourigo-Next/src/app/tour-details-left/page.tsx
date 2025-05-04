import TourDetailsLeftMain from "@/components/tour-details-left/TourDetailsLeftMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourDetailsLeft = () => {
  return (
    <>
      <MetaData pageTitle="Tour Details Left">
        <Wrapper>
          <main>
            <TourDetailsLeftMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourDetailsLeft;
