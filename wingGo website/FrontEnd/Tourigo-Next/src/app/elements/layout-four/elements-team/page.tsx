import ElementsTeamMain from "@/components/elements/layout-four/elements-team/ElementsTeamMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Team">
        <ElementPageLayout>
          <main>
            <ElementsTeamMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
