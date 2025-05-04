import ElementsWhyChoseMain from "@/components/elements/layout-four/elements-why-chose/ElementsWhyChoseMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Why Chose">
        <ElementPageLayout>
          <main>
            <ElementsWhyChoseMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
