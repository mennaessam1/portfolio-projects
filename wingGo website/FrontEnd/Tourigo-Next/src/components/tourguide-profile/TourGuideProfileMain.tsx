"use client";
import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import TourGuideProfile from "./TourGuideProfile";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: string;
  username: string;
  role: string;
  mustChangePassword: boolean;
}

const TourGuideProfileMain = () => {
  // Extract the token from cookies
  const token = Cookies.get("token");

  // Decode the token if it exists
  let userId: string | null = null;
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      userId = decoded.id;
      console.log("Decoded Token:", decoded);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error decoding token:", error.message, token);
      } else {
        console.error("Error decoding token:", error, token);
      }
    }
  } else {
    console.warn("Token not found in cookies");
  }
  

  return (
    <div className="profile-tabs-main">
      <Breadcrumb titleOne="My Account" titleTwo="My Account" />
      {userId ? (
        <TourGuideProfile id={userId} />
      ) : (
        <h1>User ID not found</h1>
      )}
    </div>
  );
};

export default TourGuideProfileMain;
