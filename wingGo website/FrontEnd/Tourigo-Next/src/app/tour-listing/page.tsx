import TourListingMain from "@/components/tour-listing/TourListingMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourListing = () => {
  return (
    <>
      <MetaData pageTitle="Tour Listing">
        <Wrapper>
          <main>
            <TourListingMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourListing;
