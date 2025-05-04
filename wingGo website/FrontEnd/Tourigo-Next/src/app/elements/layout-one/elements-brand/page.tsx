import ElementsBrandMain from "@/components/elements/layout-one/elements-brand/ElementsBrandMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Brand">
        <ElementPageLayout>
          <main>
            <ElementsBrandMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
