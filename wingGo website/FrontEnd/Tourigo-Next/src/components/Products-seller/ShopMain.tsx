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
import { filterProductsSeller} from "@/api/productApi";
import ItinerariesContentHeader from "@/elements/Products/it-header";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;  // Corresponds to the `sellerId` in the token
  username: string;
  role: string;
  mustChangePassword: boolean;
}


interface FilterOptions {
  budget?: number;
  

}

const ShopMain = () => {
  const { currency, convertAmount } = useCurrency();
  const [convertedPrices, setConvertedPrices] = useState<Record<string, number>>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Default");
  const [sellerId, setSellerId] = useState<string | null>(null);


  // const hardcodedSellerId = "67158afc7b1ec4bfb0240575";
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setSellerId(decodedToken.id); // Extract and set sellerId
    } else {
      console.error("No token found. Please log in.");
    }
  }, []);
  

  
  // const mapData = (searchData.length ? searchData : filterData).filter(
  //   (item) => !item.archive && item._id 
  // );
  // Fetch filtered activities from the API
  const loadFilteredProducts = async () => {
    if (!sellerId) {
      console.error("Seller ID is not available.");
      return;
    }
    try {
      const apiFilters: FilterOptions = {
        budget: filters.budget,
      };
  
      const data = await filterProductsSeller({ ...apiFilters, sellerId });
  
      const finalFilteredData = searchQuery
        ? data.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : data;
  
      const mapData = finalFilteredData;
  
      const sortedData = sortData(mapData, sortOption);
      setFilteredProducts(sortedData);
    } catch (error) {
      console.error("Failed to fetch filtered products:", error);
    }
  };
  


  useEffect(() => {
    if (sellerId) {
      loadFilteredProducts();
    }
  }, [sellerId, filters, searchQuery, sortOption]);
  


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

  
  return (
    <>
      <Breadcrumb titleOne="Shop" titleTwo="Shop" />
       {/* Display currency and converted amount for testing */}
       

      <section className="bd-shop-area section-space">
        <div className="container">
          <div className="row gy-24">
            {filteredProducts?.length ? (
              <>
                <div className="col-xxl-8 col-xl-8 col-lg-12">
                <ItinerariesContentHeader
              itineraryCount={filteredProducts.length}
              onSortChange={handleSortChange}
              />
                  <div className="row gy-24">
                    {filteredProducts.map((item, index) => (
                        <ShopContentSingleCard
                        classItem="col-xxl-4 col-xl-4 col-lg4 col-md-4 col-sm-6"
                        key={index}
                        item={item}
                        userRole="Seller"
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
