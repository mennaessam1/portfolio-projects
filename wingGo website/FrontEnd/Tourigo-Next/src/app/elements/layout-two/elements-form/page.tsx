import ElementsFormMain from "@/components/elements/layout-two/elements-form/ElementsFormMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Form">
        <ElementPageLayout>
          <main>
            <ElementsFormMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
