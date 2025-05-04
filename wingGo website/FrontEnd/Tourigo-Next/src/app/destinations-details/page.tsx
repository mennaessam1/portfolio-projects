import DestinationDetailsMain from "@/components/destinations-details/DestinationDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const DestinationDetails = () => {
  const id = 1;
  return (
    <>
      <MetaData pageTitle="Destination Details">
        <Wrapper>
          <main>
            <DestinationDetailsMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default DestinationDetails;
