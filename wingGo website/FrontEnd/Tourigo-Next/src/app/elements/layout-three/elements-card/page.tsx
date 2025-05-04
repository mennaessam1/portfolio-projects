import ElementsCardMain from "@/components/elements/layout-three/elements-card/ElementsCardMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Card">
        <ElementPageLayout>
          <main>
            <ElementsCardMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
