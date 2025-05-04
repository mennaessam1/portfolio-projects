//ShopDetailsArea.tsx
import React from "react";


import ProductDetailsSection from "./ProductDetailsSection";
import { idTypeNew } from "@/interFace/interFace";

const ShopDetailsArea = ({ id, userRole }: { id: string; userRole: string }) => {
  return (
    <>
      <section className="bd-shop-area section-space">
        <div className="container">
          <ProductDetailsSection id={id} userRole={userRole} />
        </div>
      </section>
    </>
  );
};

export default ShopDetailsArea;
