import TourListingEditMain from "@/components/add-activity/TourListingEditMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <MetaData pageTitle="Add Activity">
      <Wrapper>
        <main>
          <TourListingEditMain />
        </main>
      </Wrapper>
    </MetaData>
  );
};

export default page;
