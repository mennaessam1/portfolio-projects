import ElementsAdvanceTabMain from "@/components/elements/layout-one/elements-advancetab/ElementsAdvanceTabMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Advance Tab">
        <ElementPageLayout>
          <main>
            <ElementsAdvanceTabMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
