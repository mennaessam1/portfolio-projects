import ElementsButtonMain from "@/components/elements/layout-two/elements-button/ElementsButtonMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Button">
        <ElementPageLayout>
          <main>
            <ElementsButtonMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
