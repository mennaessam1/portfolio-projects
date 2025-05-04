// promocodesApi.ts

import axios from "axios";
import { PromoCode } from "../interFace/interFace";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;  // Extract user ID from the token
  role: string;
  username: string;
  mustChangePassword: boolean;
}
//const touristId = '67240ed8c40a7f3005a1d01d';
// Fetch available promo codes for a tourist
export const fetchAvailablePromoCodes = async (): Promise<PromoCode[]> => {
  const token = Cookies.get('token');
    let touristId = "";
  try {
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      console.log("Decoded Token:", decodedToken);
      touristId = decodedToken.id;  // Extract governorId from the token
  } else {
      throw new Error("No token found. Please log in.");
  }
    const response = await axios.get(`http://localhost:8000/tourist/promoCodes/${touristId}`);
    return response.data.promoCodes;
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    throw error;
  }
};
