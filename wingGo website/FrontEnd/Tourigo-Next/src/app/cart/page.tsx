import CartMain from "@/components/cart/CartMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Cart">
        <Wrapper>
          <main>
            <CartMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
