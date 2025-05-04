import TourListingSixMain from "@/components/tour-listing-six/TourListingSixMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourListingSix = () => {
  return (
    <>
      <MetaData pageTitle="Tour Listing Six">
        <Wrapper>
          <main>
            <TourListingSixMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourListingSix;
