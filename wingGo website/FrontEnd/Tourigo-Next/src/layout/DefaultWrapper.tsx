"use client";
import React, { useEffect, useState } from "react";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
import { usePathname } from "next/navigation";
import { animationCreate } from "@/utils/utils";
import HeaderOne from "./header/HeaderOne";
import HeaderTwo from "./header/HeaderTwo";
import HeaderThree from "./header/HeaderThree";
import HeaderFour from "./header/HeaderFour";
import HeaderFive from "./header/HeaderFive";
import HeaderSeven from "./header/HeaderSeven";
import Headereight from "./header/Headereight";
import FooterArea from "./footer/FooterArea";
import FooterOne from "./footer/FooterOne";
import FooterTwo from "./footer/FooterTwo";
import FooterAreaThree from "./footer/FooterAreaThree";
import FooterAreaFour from "./footer/FooterAreaFour";
import FooterAreaFive from "./footer/FooterAreaFive";
import BacktoTop from "@/elements/backToTop/BacktoTop";
import SidebarMain from "./header/components/Sidebar/SidebarMain";
import HeaderDashboard from "./HeaderDashboard";
import Preloader from "@/components/common/Preloader";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  id: string;
  role: string;
  mustChangePassword: boolean;
}

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  // Decode the token and set the role
  useEffect(() => {
    const token = Cookies.get("token"); // Retrieve the token from cookies
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log('Decoded Token:', decodedToken);
        setRole(decodedToken.role); // Extract the role
      } catch (error) {
        console.error("Error decoding token:", error);
        setRole(null); // Fallback if token is invalid
      }
    } else {
      setRole(null); // No token found
    }
  }, []);

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

  // Function to determine the header based on role
  const renderHeader = () => {
    switch (role) {
      case "Tourist":
        return <HeaderTwo />;
      case "Admin":
        return <HeaderSeven />;
      case "TourGuide":
        return <HeaderThree />;
      case "Advertiser":
        return <HeaderFour />;
      case "Seller":
        return <HeaderFive />;
      case "TourismGovernor":
        return <Headereight />;
      default:
        return <HeaderOne />; // Default to HeaderOne if no role or token (Basically a guest)
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <Preloader />
        </>
      ) : (
        <>
          <SidebarMain />
          {renderHeader()} {/* Render header based on role */}
          {children}
 
          <BacktoTop />
        </>
      )}
    </>
  );
};

export default Wrapper;