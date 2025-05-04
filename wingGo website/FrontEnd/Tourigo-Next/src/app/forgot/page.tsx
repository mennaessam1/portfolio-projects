import ForgotMain from "@/components/forgot/ForgotMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Forgot">
        <Wrapper>
          <main>
            <div className="pt-50"></div>
            <ForgotMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
