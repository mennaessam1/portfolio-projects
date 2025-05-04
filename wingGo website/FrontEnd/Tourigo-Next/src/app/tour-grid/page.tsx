import TourGridMain from "@/components/tour-grid/TourGridMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourGrid = () => {
  return (
    <>
      <MetaData pageTitle="Tour Grid">
        <Wrapper>
          <main>
            <TourGridMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourGrid;
