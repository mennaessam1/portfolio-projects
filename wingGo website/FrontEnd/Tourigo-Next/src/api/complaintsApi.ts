//complaintsApi.ts

import axios from "axios";
import { Complaint } from "../interFace/interFace";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';  
//const touristId = '67240ed8c40a7f3005a1d01d';


interface DecodedToken {
  username: string;
  id: string;
  role: string;
  mustChangePassword:boolean;
}

export const fetchComplaints = async (): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:8000/admin/getcomplaints');
        return response.data;
    } catch (error) {
        console.error("Error fetching complaints:", error);
        throw error;
    }
};

// New API function for fetching complaints by tourist ID async (touristId: string): Promise<Complaint[]> => {
export const fetchTouristComplaints = async (): Promise<Complaint[]> => {
   // const touristId = '67240ed8c40a7f3005a1d01d';
   const token = Cookies.get('token'); // Get the token from cookies
  if (!token) {
    throw new Error('User is not authenticated');
  }
    try {
      const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
      const touristId = decodedToken.id; // Extract userId from the token

        const response = await axios.get(`http://localhost:8000/tourist/viewmycomplaints/${touristId}`);
        return response.data.complaints;
    } catch (error) {
        console.error("Error fetching tourist complaints:", error);
        throw error;
    }
};


export const replyToComplaint = async (complaintId: string, reply: string) => {
    try {
      const response = await axios.post(`/replytocomplaint/${complaintId}`, { reply });
      return response.data;
    } catch (error) {
      console.error("Error replying to complaint:", error);
      throw error;
    }
  };


  export const updateComplaintStatus = async (id: string, newState: 'pending' | 'resolved'): Promise<Complaint> => {
    try {
        const response = await axios.put(`http://localhost:8000/admin/updateComplaint/${id}`, { state: newState });
        return response.data.complaint;
    } catch (error) {
        console.error("Error updating complaint status:", error);
        throw error;
    }
};

// Function to file a new complaint
export const fileComplaint = async ( complaintData: Omit<Complaint, "_id" | "tourist" | "state" | "reply">) => {
  const token = Cookies.get('token'); // Get the token from cookies
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try {
    const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
    const touristId = decodedToken.id; // Extract userId from the token

       // const touristId = '67240ed8c40a7f3005a1d01d';
      // Post request to the backend to add a complaint
      const response = await axios.post(`http://localhost:8000/tourist/complaints/${touristId}`, complaintData);
      return response.data;
    } catch (error) {
      throw new Error("Error filing complaint");
    }
  };