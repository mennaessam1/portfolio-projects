import ElementsCtaMain from "@/components/elements/layout-two/elements-cta/ElementsCtaMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Cta">
        <ElementPageLayout>
          <main>
            <ElementsCtaMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
