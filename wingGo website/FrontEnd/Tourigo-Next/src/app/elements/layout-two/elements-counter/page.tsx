import ElementsCounterMain from "@/components/elements/layout-two/elements-counter/ElementsCounterMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Counter">
        <ElementPageLayout>
          <main>
            <ElementsCounterMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
