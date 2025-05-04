"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import ProfileTabs from "./ProfileTabs";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    id: string; // Tourist ID extracted from token
    role: string;
    username: string;
    mustChangePassword: boolean;
  }

const ProfileTabsMain = () => {
    const [touristId, setTouristId] = useState<string>("");

    // Extract token and set tourist ID dynamically
    useEffect(() => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const decodedToken = jwtDecode<DecodedToken>(token);
          console.log("Decoded Token:", decodedToken);
          setTouristId(decodedToken.id); // Extract the tourist ID from the token
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

        {/* <ProfileTabs id={"6732756e45dae024763e08c9"}/> */}
        {/* <ProfileTabs id={"6703fe21af26882204ffaffc"}/> */}
        {/* <ProfileTabs id={"67240ed8c40a7f3005a1d01d"}/> */}
        {touristId ? (
        <ProfileTabs id={touristId} />
      ) : (
        <h3>Loading Profile...</h3>
      )}
        </div>
    );
    }

export default ProfileTabsMain;