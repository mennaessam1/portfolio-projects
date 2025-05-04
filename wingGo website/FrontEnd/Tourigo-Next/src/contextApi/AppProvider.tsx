"use client";

import React, { createContext, useState, useEffect } from "react";
import { AppContextType } from "@/interFace/interFace";
import { usePathname } from "next/navigation";

export const AppContext = createContext<AppContextType | undefined>(undefined);
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [filterType, setFilterType] = useState<string>("");
  const [modalId, setModalId] = useState<number>(0);
  const [niceSelectData, setNiceSelectData] = useState<string | number>(
    "no-data"
  );
  const [isOpenInfoSidebar, setIsOpenInfoSidebar] = useState<boolean>(false);
  const [sideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});
  const [filterSearch, setFilterSearch] = useState<string>("");
  const [filterRange, setFilterRange] = useState<number[]>([]);
  useEffect(() => {
    setNiceSelectData("no-data");
    setFilterSearch("");
  }, [pathName]);

  const handleInfoSidebar = () => {
    setIsOpenInfoSidebar(!isOpenInfoSidebar);
  };
  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const contextValue: AppContextType = {
    scrollDirection,
    setScrollDirection,
    filterType,
    setFilterType,
    niceSelectData,
    modalId,
    setModalId,
    setNiceSelectData,
    toggleSideMenu,
    handleInfoSidebar,
    isOpenInfoSidebar,
    setIsOpenInfoSidebar,
    sideMenuOpen,
    setSideMenuOpen,
    setModalData,
    modalData,
    filterSearch,
    setFilterSearch,
    filterRange,
    setFilterRange,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
