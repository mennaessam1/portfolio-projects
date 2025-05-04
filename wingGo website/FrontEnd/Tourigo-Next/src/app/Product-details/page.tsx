import ShopDetailsMain from "@/components/Product-details/ShopDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  const id = "";
  const userRole='';
  return (
    <>
      <MetaData pageTitle="Shop Details">
        <Wrapper>
          <main>
            <ShopDetailsMain id={id} userRole={userRole}/>
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
