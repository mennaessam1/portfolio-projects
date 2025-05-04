import ElementsAboutMain from "@/components/elements/layout-one/elements-about/ElementsAboutMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements About">
        <ElementPageLayout>
          <main>
            <ElementsAboutMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
