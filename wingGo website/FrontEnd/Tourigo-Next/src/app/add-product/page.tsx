import TourListingEditMain from "@/components/add-product/TourListingEditMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <MetaData pageTitle="Add Product">
      <Wrapper>
        <main>
          <TourListingEditMain />
        </main>
      </Wrapper>
    </MetaData>
  );
};

export default page;
