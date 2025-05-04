"use client";
import { useParams } from "next/navigation"; // Only use next/navigation
import React from "react";
import ShopDetailsMain from "@/components/Product-details/ShopDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";

const ProductDetailsPage = () => {
  // Access parameters using useParams
  const params = useParams();
  const id = params?.id;
  const userRole = params?.userRole;

  if (!id || !userRole) {
    return <p>Loading...</p>; // Loading state while parameters load
  }

  return (
    <>
      <MetaData pageTitle="Shop Details">
        <Wrapper>
          <main>
            <ShopDetailsMain id={id as string} userRole={userRole as string} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default ProductDetailsPage;
