import TourListingFourMain from "@/components/tour-listing-four/TourListingFourMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourListingFour = () => {
  return (
    <>
      <MetaData pageTitle="Tour Listing Four">
        <Wrapper>
          <main>
            <TourListingFourMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourListingFour;
