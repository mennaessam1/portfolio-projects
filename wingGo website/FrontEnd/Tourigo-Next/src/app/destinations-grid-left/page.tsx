import DestinationGridLeftMain from "@/components/destination-grid-left/DestinationGridLeftMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const DestinationGridLeft = () => {
  return (
    <>
      <MetaData pageTitle="Destination Grid Left">
        <Wrapper>
          <main>
            <DestinationGridLeftMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default DestinationGridLeft;
