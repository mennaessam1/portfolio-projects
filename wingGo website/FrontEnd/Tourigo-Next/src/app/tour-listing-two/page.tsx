import TourListingTwoMain from "@/components/tour-listing-two/TourListingTwoMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourListingTwo = () => {
  return (
    <>
      <MetaData pageTitle="Tour Listing Two">
        <Wrapper>
          <main>
            <TourListingTwoMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourListingTwo;
