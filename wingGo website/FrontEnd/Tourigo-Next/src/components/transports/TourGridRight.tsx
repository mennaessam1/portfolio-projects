// TransportGridRight.tsx

"use client";
import React, { useEffect, useState } from "react";
import SidebarCategories from "../activitiesSidebar/SidebarCategories";
import PaginationWrapper from "../shearedComponents/PaginationWrapper";
import TransportSingleCard from "../common/tourElements/TransportSingleCard";
import { Transport } from "@/interFace/interFace";
import { getTransportsData } from "@/data/transport-data";
import TransportsSidebarMain from "../transportsSidebar/ItinerariesSidebarMain";

interface FilterOptions {
  budget?: number;
  category?: string;
}

const TransportGridRight = () => {
  const [allTransports, setAllTransports] = useState<Transport[]>([]);  // Stores all initial transports
  const [filteredTransports, setFilteredTransports] = useState<Transport[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Load initial transports data with getTransportsData
  const loadInitialTransports = async () => {
    try {
      const data = await getTransportsData(); // Load data from getTransportsData
      setAllTransports(data);
      setFilteredTransports(data); // Initialize filteredTransports with all data
    } catch (error) {
      console.error("Failed to fetch initial transports:", error);
    }
  };

  // Load filtered transports based on filters
  const loadFilteredTransports = () => {
    try {
      // Start with all transports loaded from getTransportsData
      let filteredData = allTransports;
  
      // Apply category filter if it exists
      if (filters.category) {
        filteredData = filteredData.filter(transport => transport.type === filters.category);
      }
  
      // Apply budget filter only if budget has a value
      filteredData = filteredData.filter(transport =>
        filters.budget !== undefined ? transport.price <= filters.budget : true
      );
  
      // Apply search query filter
      if (searchQuery) {
        filteredData = filteredData.filter(transport =>
          transport.city.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      // Update filtered transports
      setFilteredTransports(filteredData);
    } catch (error) {
      console.error("Failed to apply filters to transports:", error);
    }
  };

  // Load initial data on component mount
  useEffect(() => {
    loadInitialTransports();
  }, []);

  // Reload filtered data when filters or searchQuery change
  useEffect(() => {
    loadFilteredTransports();
  }, [filters, searchQuery]);

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      category: newFilters.category || undefined // Set category to undefined if "All" is selected
    }));
  };

  const applySearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section className="bd-tour-grid-area section-space">
      <div className="container">
        <div className="row gy-24">
          <div className="col-xxl-8 col-xl-8 col-lg-7">
            <div className="row gy-24">
              {filteredTransports.length > 0 ? (
                filteredTransports.map((item) => (
                  <TransportSingleCard
                    transport={item}
                    key={item._id}
                    className="col-xxl-4 col-xl-6 col-lg-6 col-md-6"
                    transportWrapperClass="transport-wrapper style-one"
                    isparentClass={true}
                  />
                ))
              ) : (
                <p>No transports found.</p>
              )}
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-5">
            <TransportsSidebarMain 
              applyFilters={applyFilters} 
              applySearch={applySearch} 
            />
            {/* <SidebarCategories onCategorySelect={(category) => applyFilters({ category })} /> */}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default TransportGridRight;