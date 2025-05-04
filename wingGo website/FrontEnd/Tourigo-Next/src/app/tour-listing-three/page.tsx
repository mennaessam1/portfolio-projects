import TourListingThreeMain from "@/components/tour-listing-three/TourListingThreeMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourListingThree = () => {
  return (
    <>
      <MetaData pageTitle="Tour Listing Three">
        <Wrapper>
          <main>
            <TourListingThreeMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourListingThree;
