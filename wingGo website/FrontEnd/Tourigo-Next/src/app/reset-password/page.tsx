

import ForgotMain from "@/components/forgot/ForgotMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";
import { useRouter } from "next/navigation";
import ResetPasswordMain from "@/components/reset-password/ResetPasswordMain";

const page = () => {
  
  

  return (
    <>
      <MetaData pageTitle="Forgot">
        <Wrapper>
          <main>
            <div className="pt-50"></div>
            <ResetPasswordMain  />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
