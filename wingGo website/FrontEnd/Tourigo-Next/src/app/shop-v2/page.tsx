import ShopV2Main from "@/components/shop-v2/ShopV2Main";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Shop-V2">
        <Wrapper>
          <main>
            <ShopV2Main />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
