import DestinationDetailsRightMain from "@/components/destinations-details-right/DestinationDetailsRightMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const DestinationDetailsRight = () => {
  const id = 1;
  return (
    <>
      <MetaData pageTitle="Destination Details Right">
        <Wrapper>
          <main>
            <DestinationDetailsRightMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default DestinationDetailsRight;
