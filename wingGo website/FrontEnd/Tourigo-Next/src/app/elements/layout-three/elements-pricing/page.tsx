import ElementsPricingMain from "@/components/elements/layout-three/elements-pricing/ElementsPricingMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Pricing">
        <ElementPageLayout>
          <main>
            <ElementsPricingMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
