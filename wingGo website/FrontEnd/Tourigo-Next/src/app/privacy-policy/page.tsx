import PrivacyPolicyMain from "@/components/privacy-policy/PrivacyPolicyMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <MetaData pageTitle="Privecy Policy">
        <Wrapper>
          <main>
            <PrivacyPolicyMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default PrivacyPolicy;
