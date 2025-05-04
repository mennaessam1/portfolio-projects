// ItinerariesContentHeader.tsx
"use client";
import React from "react";
import NiceSelect from "../NiceSelect";
import { itinerarySelectOptionDataRating } from "@/data/product-selection-data";

interface ItinerariesContentHeaderProps {
  itineraryCount: number;
  onSortChange: (sortOption: string) => void;
}

const ItinerariesContentHeader: React.FC<ItinerariesContentHeaderProps> = ({ itineraryCount, onSortChange }) => {
  const handleSortChange = (item: { id: number; option: string | number }, name: string) => {
    onSortChange(item.option.toString());
  };

  return (
    <>
      <div className="shop-top-meta d-flex flex-wrap justify-content-between align-items-center mb-24 gap-24">
        <div className="product-item-count">
          <span>
            <b>{itineraryCount}</b> Products Available
          </span>
        </div>
        <div className="shop-selector-wrapper d-flex flex-wrap justify-content-between align-items-center gap-24">
          <div className="shop-selector-item d-flex justify-content-between align-items-center gap-10">
            <span>Sort By:</span>
            <div className="shop-selector-sort">
              <NiceSelect
                options={itinerarySelectOptionDataRating}
                defaultCurrent={0}
                onChange={handleSortChange}
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

export default ItinerariesContentHeader;