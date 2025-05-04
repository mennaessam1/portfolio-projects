import PricingMain from "@/components/pricing/PricingMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const Pricing = () => {
  return (
    <>
      <MetaData pageTitle="Pircing">
        <Wrapper>
          <main>
            <PricingMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default Pricing;
