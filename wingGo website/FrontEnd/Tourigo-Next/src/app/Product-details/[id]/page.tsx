"use client";
import { useRouter } from "next/router";
import React from "react";
import ShopDetailsMain from "@/components/Product-details/ShopDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";

const ProductDetailsPage = () => {
  const router = useRouter();
  const { id, userRole } = router.query;

  if (!id || !userRole) {
    return <p>Loading...</p>; // Display a loading state until both params are available
  }

  return (
    <>
      <MetaData pageTitle="Shop Details">
        <Wrapper>
          <main>
            {/* Pass id and userRole as props to your main component */}
            <ShopDetailsMain id={id as string} userRole={userRole as string} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default ProductDetailsPage;
