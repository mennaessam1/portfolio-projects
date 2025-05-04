import TourListingFiveMain from "@/components/tour-listing-five/TourListingFiveMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourListingFive = () => {
  return (
    <>
      <MetaData pageTitle="Tour Listing Five">
        <Wrapper>
          <main>
            <TourListingFiveMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourListingFive;
