"use client";
import React from "react";
import NiceSelect from "../NiceSelect";
import {
  productSelectOptionData,
  showProductNumber,
} from "@/data/product-select-option-data";
import useGlobalContext from "@/hooks/use-context";

const ShopContentHeader = () => {
  const { setFilterRange, setFilterSearch } = useGlobalContext();
  const selectHandler = () => {
    setFilterRange([]);
    setFilterSearch("");
  };
  const selectHandlerTwo = () => {
    setFilterRange([]);
    setFilterSearch("");
  };
  return (
    <>
      <div className="shop-top-meta d-flex flex-wrap justify-content-between align-items-center mb-24 gap-24">
        <div className="product-item-count">
          <span>
            <b>112</b> Item On List
          </span>
        </div>
        <div className="shop-selector-wrapper d-flex flex-wrap justify-content-between align-items-center gap-24">
          <div className="shop-selector-item d-flex justify-content-between align-items-center gap-10">
            <span>Show:</span>
            <div className="shop-selector">
              <NiceSelect
                options={showProductNumber}
                defaultCurrent={0}
                onChange={selectHandler}
                name=""
                className=""
                placeholder="Item Count"
              />
            </div>
          </div>
          <div className="shop-selector-item d-flex justify-content-between align-items-center gap-10">
            <span>Sort By:</span>
            <div className="shop-selector-sort">
              <NiceSelect
                options={productSelectOptionData}
                defaultCurrent={0}
                onChange={selectHandlerTwo}
                name=""
                className=""
                placeholder="Default"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopContentHeader;
