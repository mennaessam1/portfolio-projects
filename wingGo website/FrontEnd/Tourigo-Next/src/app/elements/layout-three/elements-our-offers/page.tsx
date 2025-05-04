import ElementsOurOffersMain from "@/components/elements/layout-three/elements-our-offers/ElementsOurOffersMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Offer">
        <ElementPageLayout>
          <main>
            <ElementsOurOffersMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
