import React from "react";
import RelatedProduct from "./RelatedProduct";
import ProductInfoDetails from "./ProductInfoDetails";
import ProductDetailsSection from "./ProductDetailsSection";
import { idType } from "@/interFace/interFace";

const ShopDetailsArea = ({ id }: idType) => {
  return (
    <>
      <section className="bd-shop-area section-space">
        <div className="container">
          <ProductDetailsSection id={id} />
          <ProductInfoDetails />
          <RelatedProduct id={id} />
        </div>
      </section>
    </>
  );
};

export default ShopDetailsArea;
