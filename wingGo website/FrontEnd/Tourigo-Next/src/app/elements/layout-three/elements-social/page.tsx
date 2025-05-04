import ElementsSocialMain from "@/components/elements/layout-three/elements-social/ElementsSocialMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Pricing">
        <ElementPageLayout>
          <main>
            <ElementsSocialMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
