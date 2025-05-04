import ElementIcomoonMain from "@/components/elements/layout-three/elements-icomoon/ElementIcomoonMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Custom Fonts Icon">
        <ElementPageLayout>
          <main>
            <ElementIcomoonMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
