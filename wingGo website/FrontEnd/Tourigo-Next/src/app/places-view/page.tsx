// app/places.tsx

import DestinationGridRightMain from "@/components/places-view/DestinationGridRightMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";
import HomeTwoMain from "@/components/home-two/HomeTwoMain";
const Places = () => {
  return (
    <>
      <MetaData pageTitle="Museums and Historical Places">
        <Wrapper>
          <main>
            < DestinationGridRightMain/>
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default Places;
