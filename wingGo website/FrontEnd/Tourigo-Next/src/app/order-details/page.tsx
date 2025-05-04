import OrderDetailsMain from "@/components/order-details/TourDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const OrdertDetails = () => {
  const id = '';
  return (
    <>
      <MetaData pageTitle="Order Details">
        <Wrapper>
          <main>
            <OrderDetailsMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default OrdertDetails;
