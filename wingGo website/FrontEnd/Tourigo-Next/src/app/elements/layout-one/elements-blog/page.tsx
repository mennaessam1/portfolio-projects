import ElementsBlogMain from "@/components/elements/layout-one/elements-blog/ElementsBlogMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Blog">
        <ElementPageLayout>
          <main>
            <ElementsBlogMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
