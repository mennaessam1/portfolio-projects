import TermsConditionsMain from "@/components/terms-conditions/TermsConditionsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const TermsConditions = () => {
  return (
    <>
      <MetaData pageTitle="Terms Conditions">
        <Wrapper>
          <main>
            <TermsConditionsMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default TermsConditions;
