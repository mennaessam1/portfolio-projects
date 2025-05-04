import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from "sonner";


interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
//   iat: number; // Add this if included in the token payload
}


const API_URL = 'http://localhost:8000';
const touristId = "67240ed8c40a7f3005a1d01d";
const adminId = "671596e1650cad1f372063b1";
const sellerId = "66fc31a342ba6847384d7d84";
const tourGuideId = "67520e3d1e5ee24b09ed1045";
const advertiserId = "67521d930982497fbe368837";
export const addPreferencesToTourist = async (id: string, preferences: any): Promise<any> => {
  try {
    console.log('Selected Preferences IN API:', preferences);
    const response = await axios.put<any>(`${API_URL}/tourist/${id}/preferences`, {
      preferences,
    });
    console.log('Add preferences response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding preferences:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
};

export const deletePreferenceFromTourist = async (id: string, preferences: string): Promise<any> => {
  try {
    const response = await axios.delete<any>(`${API_URL}/tourist/${id}/preferences`, {
      data: { preferences }
    });
    console.log('Delete preference response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting preference:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
}

export const getAllPreferenceTags = async (): Promise<Array<any>> => {
  try {
    const response = await axios.get<any>(`${API_URL}/admin/preferences`);
    console.log('Get all preference tags response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching preference tags:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
};

// export const toggleNotificationPreferenceApi = async (
//   touristId: string,
//   notifyOnInterest: boolean
// ) => {
//   try {
//     const response = await axios.put(
//       `http://localhost:8000/tourist/toggleNotificationPreference/${touristId}`,
//       { notifyOnInterest }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error toggling notification preference:', error);
//     throw error;
//   }
// };

export const toggleNotificationPreferenceApi = async (
  notifyOnInterest: boolean
) => {
  try {
    // Retrieve the token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Decode the token to extract the tourist ID
    let touristId = "";
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      touristId = decodedToken.id; // Extract the tourist ID
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Failed to decode token.");
    }

    // Perform the API call with the extracted tourist ID
    const response = await axios.put(
      `http://localhost:8000/tourist/toggleNotificationPreference/${touristId}`,
      { notifyOnInterest }
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling notification preference:", error);
    throw error;
  }
};

export const getTouristNotificationsApi = async () => {
  try {
    // Retrieve the token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Decode the token to extract the tourist ID
    let touristId = "";
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      touristId = decodedToken.id; // Extract the tourist ID
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Failed to decode token.");
    }

    // Perform the API call with the extracted tourist ID
    const response = await axios.get(
      `http://localhost:8000/tourist/notifications/${touristId}`
    );
    return response.data.notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const getAdminNotificationsApi = async () => {
  try {
    // Retrieve the token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Decode the token to extract the admin ID
    let adminId = "";
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      adminId = decodedToken.id; // Extract the admin ID
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Failed to decode token.");
    }

    // Perform the API call with the extracted admin ID
    const response = await axios.get(
      `http://localhost:8000/admin/notifications/${adminId}`
    );
    return response.data.notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const getSellerNotificationsApi = async () => {
  try {
    // Retrieve the token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Decode the token to extract the seller ID
    let sellerId = "";
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      sellerId = decodedToken.id; // Extract the seller ID
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Failed to decode token.");
    }

    // Perform the API call with the extracted seller ID
    const response = await axios.get(
      `http://localhost:8000/seller/notifications/${sellerId}`
    );
    return response.data.notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const getTourGuideNotificationsApi = async () => {
  try {
    // Retrieve the token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Decode the token to extract the tour guide ID
    let tourGuideId = "";
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      tourGuideId = decodedToken.id; // Extract the tour guide ID
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Failed to decode token.");
    }

    // Perform the API call with the extracted tour guide ID
    const response = await axios.get(
      `http://localhost:8000/tourguide/notifications/${tourGuideId}`
    );
    return response.data.notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const getAdvertiserNotificationsApi = async () => {
  try {
    // Retrieve the token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Decode the token to extract the advertiser ID
    let advertiserId = "";
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      advertiserId = decodedToken.id; // Extract the advertiser ID
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Failed to decode token.");
    }

    // Perform the API call with the extracted advertiser ID
    const response = await axios.get(
      `http://localhost:8000/advertiser/notifications/${advertiserId}`
    );
    return response.data.notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};