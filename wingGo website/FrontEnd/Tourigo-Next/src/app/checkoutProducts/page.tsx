"use client";

import CheckoutMain from "@/components/checkoutProducts/CheckoutMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const promoCode = searchParams.get("promoCode"); // Extract promoCode from the query
  const orderId = searchParams.get("orderId"); // Extract promoCode from the query

  return (
    <>
      <MetaData pageTitle="Checkout">
        <Wrapper>
          <main>
            {/* Pass promoCode to the CheckoutMain component */}
            <CheckoutMain promoCode={promoCode} orderId={orderId} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default CheckoutPage;
