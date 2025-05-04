import ElementsTourMain from "@/components/elements/layout-four/elements-tour/ElementsTourMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Tour">
        <ElementPageLayout>
          <main>
            <ElementsTourMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
