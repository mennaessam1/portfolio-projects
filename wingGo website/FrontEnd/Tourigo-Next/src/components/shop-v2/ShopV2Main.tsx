"use client";
import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import ShopContentHeader from "@/elements/shop/ShopContentHeader";
import ShopContentSingleCard from "@/elements/shop/ShopContentSingleCard";
import PaginationWrapper from "../shearedComponents/PaginationWrapper";
import ShopModal from "@/elements/modals/ShopModal";
import { useFilter } from "@/hooks/useFilter";
const ShopV2Main = () => {
  const filterData = useFilter(0, 18);
  const mapData = filterData;
  return (
    <>
      <Breadcrumb titleOne="Shop V2" titleTwo="Shop V2" />
      <section className="bd-shop-area section-space">
        <div className="container">
          <div className="row gy-24 justify-content-center">
            <div className="col-xxl-12 col-xl-12 col-lg-12">
              <ShopContentHeader />
              <div className="row gy-24">
                {mapData.map((item, index) => (
                  <ShopContentSingleCard
                    classItem="col-xxl-4 col-xl-4 col-lg4 col-md-4 col-sm-6"
                    key={index}
                    item={item}
                  />
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </section>
      <ShopModal />
    </>
  );
};

export default ShopV2Main;
