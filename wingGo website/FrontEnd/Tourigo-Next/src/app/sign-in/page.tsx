import SignInMain from "@/components/sign-in/SignInMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Sign In">
        <Wrapper>
          <main>
            <div className="pt-50"></div>
            <SignInMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
