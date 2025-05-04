import TourDetailsMain from "@/components/transport-details/TourDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TourDetails = () => {
  const id = '';
  return (
    <>
      <MetaData pageTitle="Tour Details">
        <Wrapper>
          <main>
            <TourDetailsMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TourDetails;
