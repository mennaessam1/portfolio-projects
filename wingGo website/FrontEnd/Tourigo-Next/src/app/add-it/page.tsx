import TourListingEditMain from "@/components/add-it/TourListingEditMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <MetaData pageTitle="Add Itinerary">
      <Wrapper>
        <main>
          <TourListingEditMain />
        </main>
      </Wrapper>
    </MetaData>
  );
};

export default page;
