import ElementsBreadcrumbMain from "@/components/elements/layout-two/elements-breadcrumb/ElementsBreadcrumbMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Breadcrumb">
        <ElementPageLayout>
          <main>
            <ElementsBreadcrumbMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
