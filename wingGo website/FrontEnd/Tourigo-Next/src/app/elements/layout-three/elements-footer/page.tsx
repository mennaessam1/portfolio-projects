import ElementsFooterMain from "@/components/elements/layout-three/elements-footer/ElementsFooterMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";

import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Footer">
        <ElementPageLayout>
          <main>
            <ElementsFooterMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
