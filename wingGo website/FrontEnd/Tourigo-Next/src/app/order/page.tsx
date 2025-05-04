import OrderMain from "@/components/order/OrderMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Order">
        <Wrapper>
          <main>
            <OrderMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
