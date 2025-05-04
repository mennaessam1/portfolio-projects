import DestinationGridMain from "@/components/destination-grid/DestinationGridMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const DestinationGrid = () => {
  return (
    <>
      <MetaData pageTitle="Destination Grid">
        <Wrapper>
          <main>
            <DestinationGridMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default DestinationGrid;
