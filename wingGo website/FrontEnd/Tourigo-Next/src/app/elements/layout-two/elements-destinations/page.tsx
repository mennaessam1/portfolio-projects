import ElementsDestinationsMain from "@/components/elements/layout-two/elements-destinations/ElementsDestinationsMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements destinations">
        <ElementPageLayout>
          <main>
            <ElementsDestinationsMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
