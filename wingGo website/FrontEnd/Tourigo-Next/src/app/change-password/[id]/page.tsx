import ChangePasswordMain from "@/components/change-password/ChangePasswordMain";
import ForgotMain from "@/components/forgot/ForgotMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <>
      <MetaData pageTitle="Forgot">
        <Wrapper>
          <main>
            <div className="pt-50"></div>
            <ChangePasswordMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
