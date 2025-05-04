import StyleGuideMain from "@/components/elements/layout-one/style-guide/StyleGuideMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Style Guide">
        <ElementPageLayout>
          <main>
            <StyleGuideMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
