import DestinationGridRightMain from "@/components/destination-grid-right/DestinationGridRightMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const DestinationGridRight = () => {
  return (
    <>
      <MetaData pageTitle="Destination Grid Right">
        <Wrapper>
          <main>
            <DestinationGridRightMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default DestinationGridRight;
