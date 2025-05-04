import ShopDetailsMain from "@/components/shop-details/ShopDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  const id = 1;
  return (
    <>
      <MetaData pageTitle="Shop Details">
        <Wrapper>
          <main>
            <ShopDetailsMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
