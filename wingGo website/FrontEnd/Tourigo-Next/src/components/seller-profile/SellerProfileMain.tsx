"use client";
import React , { useState, useEffect }from 'react';
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import SellerProfile from "./SellerProfile";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    id: string; // Seller ID extracted from token
    role: string;
    username: string;
    mustChangePassword: boolean;
  }

const SellerProfileMain = () => {
    const [sellerId, setSellerId] = useState<string>("");
  // Extract token and set seller ID dynamically
  useEffect(() => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log("Decoded Token:", decodedToken);
        setSellerId(decodedToken.id); // Extract the seller ID from the token
      } else {
        throw new Error("No token found. Please log in.");
      }
    } catch (error) {
      console.error("Error extracting token:", error);
    }
  }, []);
    return (
        <div className="profile-tabs-main">
            
        <Breadcrumb  titleOne='My Account' titleTwo='My Account' />  
        {/* <SellerProfile id={"67325f590b3e54ad8bfe1690"}/> */}
        {/* <SellerProfile id={"6707ab8915816ab90e19401d"}/> */}
        {sellerId ? (
        <SellerProfile id={sellerId} />
      ) : (
        <h3>Loading Seller Profile...</h3>
      )}

        
        </div>
    );
    }

export default SellerProfileMain;