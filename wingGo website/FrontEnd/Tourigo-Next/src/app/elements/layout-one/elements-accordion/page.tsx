import ElementsAccordionMain from "@/components/elements/layout-one/elements-accordion/ElementsAccordionMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Accordion">
        <ElementPageLayout>
          <main>
            <ElementsAccordionMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
