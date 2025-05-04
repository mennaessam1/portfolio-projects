import { getProductData } from "@/data/prod-data";
import useGlobalContext from "./use-context";
import { Product } from '@/interFace/interFace';
import React, { useEffect, useState } from "react";

export const useFilter = (start: number, end: number) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductData();
      setProducts(data || []); // Fallback to an empty array if data is undefined
    };
    fetchProducts();
  }, []);
  
  

  const { filterRange, niceSelectData } = useGlobalContext();

  // First filter the data based on the range
  let filteredData = products?.filter((item) => {
    let passesRange = true;
    if (
      filterRange.length &&
      (item.price < filterRange[0] || item.price > filterRange[1])
    ) {
      passesRange = false;
    }
    return passesRange;
  });

  // Sort filtered data based on niceSelectData
  if (niceSelectData === "Price (Low > High)") {
    filteredData = filteredData.sort((a, b) => a.price - b.price);
  } else if (niceSelectData === "Price (High > Low)") {
    filteredData = filteredData.sort((a, b) => b.price - a.price);
  } else if (niceSelectData === "Rating (High > Low)") {
    // Calculate average rating dynamically if it's not available directly
    filteredData = filteredData.sort((a, b) => {
      const avgRatingA = a.ratings.length > 0 
        ? a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length 
        : 0;
      const avgRatingB = b.ratings.length > 0 
        ? b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length 
        : 0;
      return avgRatingB - avgRatingA;
    });
  }

  // Handle number-based niceSelectData for limiting displayed items
  if (typeof niceSelectData === "number") {
    filteredData = filteredData.slice(0, niceSelectData);
  }

  // Slice the filtered and sorted data to get the desired range
  const result = filteredData.slice(start, end);
  return result;
};