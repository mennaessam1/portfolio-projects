import axios from "axios";
import { Order } from "../interFace/interFace";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

//const touristId = '67240ed8c40a7f3005a1d01d'; 
//const orderId= '67542c64b5ad15107a3b0fa0';
interface DecodedToken {
  username: string;
  id: string;
  role: string;
  mustChangePassword: boolean;
}

export const fetchTouristOrders = async (): Promise<Order[]> => {
  const token = Cookies.get("token"); // Get the token from cookies
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
    const touristId = decodedToken.id; // Extract userId from the token
    const response = await axios.get(`http://localhost:8000/tourist/pastandcurrentorders/${touristId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourist orders:', error);
    throw error;
  }
};

export const fetchOrderDetails = async  (orderId: string): Promise<Order[]> => {

  const token = Cookies.get("token"); // Get the token from cookies
  if (!token) {
    throw new Error("User is not authenticated");
  }
    try {
     
      const response = await axios.get(`http://localhost:8000/tourist/orderDetails/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for backend validation
      },
    });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching order details:", error.message);
      throw error;
    }
  };

//   export const fetchCancelOrder = async (touristId: string, orderId: string): Promise<Order> => {
//     try {
//       const response = await axios.put(`http://localhost:8000/tourist/cancelOrder/${touristId}/${orderId}`);
//       return response.data.order; // Return the updated order object from the response
//     } catch (error: any) {
//       console.error("Error canceling order:", error.response?.data?.message || error.message);
//       throw error;
//     }
//   };

export const fetchCancelOrder = async ( orderId: string): Promise<{ message: string; order: any }> => {
  const token = Cookies.get("token"); // Get the token from cookies
  if (!token) {
    throw new Error("User is not authenticated");
  }  
  try {
    const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
    const touristId = decodedToken.id; // Extract userId from the token
      const response = await axios.put(
        `http://localhost:8000/tourist/cancelOrder/${touristId}/${orderId}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Error cancelling the order:', error.message);
      throw error;
    }
  };