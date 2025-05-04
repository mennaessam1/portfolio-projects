import OtpMain from "@/components/otp/OtpMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="OTP">
        <Wrapper>
          <main>
            <div className="pt-50"></div>
            <OtpMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
