import {getProductData} from "@/data/prod-data";
import useGlobalContext from "./use-context";
import { Product } from '@/interFace/interFace';
import React, { useEffect, useState } from "react";

export const useProductSearch = () => {
  const [products, setProducts] = useState<Product[]>([]);
      
        useEffect(() => {
          const fetchProducts = async () => {
            const data = await getProductData();
            setProducts(data || []);  // Fallback to an empty array if data is undefined
          };
          fetchProducts();
        }, []);
  const { filterSearch } = useGlobalContext();
  if (!filterSearch || filterSearch.trim() === "") {
    return [];
  }

  const filterBySearch = products.filter((item) =>
    item.name.toLowerCase().includes(filterSearch.toLowerCase())
  );
  return filterBySearch;

  // filter data based on search Type
};
