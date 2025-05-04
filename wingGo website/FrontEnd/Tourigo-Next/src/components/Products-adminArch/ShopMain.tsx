//ShopMain.tsx
"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
// import getProductData from "@/data/prod-data";
import { Product } from "@/interFace/interFace";
import PaginationWrapperTwo from "../shearedComponents/PaginationWrapperTwo";
import ShopSidebarMain from "../Products/ShopSidebarMain";
import ShopModal from "@/elements/modals/ShopModalproduct";
import ShopContentSingleCard from "@/elements/Products/ShopContentSingleCard";
import ShopContentHeader from "@/elements/Products/ShopContentHeader";
import { useProductSearch } from "@/hooks/newProductSearch";
import { useFilter } from "@/hooks/useFilterproduct";
import { useCurrency } from "@/contextApi/CurrencyContext"; // Import the useCurrency hook
import { filterProductsAdmin} from "@/api/productApi";
import ItinerariesContentHeader from "@/elements/Products/it-header";


interface FilterOptions {
  budget?: number;
  

}

const ShopMain = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Default");
  const loadFilteredProducts = async () => {
    try {
      const apiFilters: FilterOptions = {
        budget: filters.budget,
      };

      const data = await filterProductsAdmin(apiFilters);

      // Apply local search filtering if searchQuery is provided
    const finalFilteredData = searchQuery
      ? data.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
            
        )
        : data;
        // Apply the mapData logic to filter out archived products
        const mapData = finalFilteredData; // Include all products (archived and unarchived)

      // Apply sorting after fetching and filtering
      const sortedData = sortData(mapData, sortOption);
      setFilteredProducts(sortedData);
    } catch (error) {
      console.error("Failed to fetch filtered itineraries:", error);
    }
  };

  useEffect(() => {
    loadFilteredProducts();
  }, [filters, searchQuery, sortOption]);

  const sortData = (data: Product[], option: string): Product[] => {
    let sortedData = [...data]; // Copy the array to avoid mutating the original data

    switch (option) {
      case "Rating: High to Low":
        sortedData.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case "Rating: Low to High":
        sortedData.sort((a, b) => (a.averageRating || 0) - (b.averageRating || 0));
        break;
      
      case "Default":
      default:
        // No sorting; return data as is
        break;
    }

    return sortedData;
  };
  const applyFilters = (newFilters: FilterOptions) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters, // Update filters with new values
    }));
  };

  const applySearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (selectedOption: string) => {
    setSortOption(selectedOption); // Update the current sorting option
  };

  

  // const filterData = useFilter(0, 18);
  // const searchData = useProductSearch();
  
  const mapData =filteredProducts;
    
  //   (item) => item.archive 
  // );
  return (
    <>
      <Breadcrumb titleOne="Shop" titleTwo="Shop" />
      <section className="bd-shop-area section-space">
        <div className="container">
          <div className="row gy-24">
            {mapData?.length ? (
              <>
                <div className="col-xxl-8 col-xl-8 col-lg-12">
                  <ShopContentHeader />
                  <div className="row gy-24">
                    {mapData.map((item, index) => (
                      <ShopContentSingleCard
                        classItem="col-xxl-4 col-xl-4 col-lg4 col-md-4 col-sm-6"
                        key={index}
                        item={item}
                        userRole="Admin"
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-xxl-8 col-xl-8 col-lg-12">
                  <h2 className="text-center">No Product Found</h2>
                </div>
              </>
            )}
            <div className="col-xxl-4 col-xl-4 col-lg-6">
            <ShopSidebarMain applyFilters={applyFilters} applySearch={applySearch} />
            </div>
          </div>
        </div>
      </section>
      <ShopModal />
    </>
  );
};

export default ShopMain;
