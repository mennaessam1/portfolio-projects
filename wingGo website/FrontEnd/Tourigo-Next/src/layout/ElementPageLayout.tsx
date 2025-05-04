//@refresh
"use client";
import React, { useEffect, useState } from "react";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import { usePathname } from "next/navigation";
import { animationCreate } from "@/utils/utils";
import BacktoTop from "@/elements/backToTop/BacktoTop";
import SidebarMain from "./header/components/Sidebar/SidebarMain";
import HeaderElements from "./header/HeaderElements";
import FooterAreaFour from "./footer/FooterAreaFour";
import FooterOne from "./footer/FooterOne";
import Preloader from "@/components/common/Preloader";
interface WrapperProps {
  children: React.ReactNode;
}
const ElementPageLayout: React.FC<WrapperProps> = ({ children }) => {
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 2000);
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <Preloader />
        </>
      ) : (
        <>
          {" "}
          <SidebarMain />
          {(() => {
            switch (pathName) {
              case "/elements/layout-one/style-guide":
                return <HeaderElements />;
              default:
                return <HeaderElements />;
            }
          })()}
          {children}
          {(() => {
            switch (pathName) {
              case "/elements/layout-one/elements-accordion":
                return <FooterOne />;
              default:
                return <FooterAreaFour />;
            }
          })()}
          <BacktoTop />
        </>
      )}
    </>
  );
};

export default ElementPageLayout;
