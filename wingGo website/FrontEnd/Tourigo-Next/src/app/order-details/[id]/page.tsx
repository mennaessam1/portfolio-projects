"use client";
import OrderDetailsMain  from "@/components/order-details/TourDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const OrderPage  = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <>
      <MetaData pageTitle="Order Details">
        <Wrapper>
          <main>
            <OrderDetailsMain  id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default OrderPage ;
