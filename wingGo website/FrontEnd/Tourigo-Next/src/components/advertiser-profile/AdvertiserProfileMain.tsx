"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import AdvertiserProfile from "./AdvertiserProfile";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: string;
  username: string;
  role: string;
  mustChangePassword: boolean;
}

const AdvertiserProfileMain = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token from cookies (useEffect):", token);

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.id);
        console.log("Decoded Token:", decoded);
      } catch (error) {
        console.error("Error decoding token:", error, token);
      }
    } else {
      console.warn("Token not found in cookies");
    }
  }, []);

  return (
    <div className="profile-tabs-main">
      <Breadcrumb titleOne="My Account" titleTwo="My Account" />
      {userId ? (
        <AdvertiserProfile id={userId} />
      ) : (
        <h1>User ID not found</h1>
      )}
    </div>
  );
};

export default AdvertiserProfileMain;
