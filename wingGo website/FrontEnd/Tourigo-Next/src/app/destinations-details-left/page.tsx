import DestinationDetailsLeftMain from "@/components/destinations-details-left/DestinationDetailsLeftMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const DestinationGridLeft = () => {
  const id = 1;
  return (
    <>
      <MetaData pageTitle="Destination Details Left">
        <Wrapper>
          <main>
            <DestinationDetailsLeftMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default DestinationGridLeft;
