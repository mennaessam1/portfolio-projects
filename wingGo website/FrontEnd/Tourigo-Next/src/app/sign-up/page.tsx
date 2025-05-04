import RegisterMain from "@/components/register/RegisterMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const RegisterPage = () => {
  return (
    <>
      <MetaData pageTitle="Sign Up">
        <Wrapper>
          <main>
            <div className="pt-50"></div>
            <RegisterMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default RegisterPage;
