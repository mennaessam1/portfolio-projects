// it-data.ts

import { fetchAllItineraries, fetchFilteredItineraries, searchItineraries, fetchAdminItineraries, fetchTourGuideItineraries, fetchBookedItineraries } from '@/api/itineraryApi';
import { Itinerary, BookedItinerary } from '../interFace/interFace';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
//   iat: number; // Add this if included in the token payload
}
const API_URL = 'http://localhost:8000/tourist';

export const getItinerariesData = async (): Promise<Itinerary[]> => {
    try {
        const itineraries = await fetchAllItineraries();
        return itineraries;
    } catch (error) {
        console.error("Error loading itineraries:", error);
        return [];
    }
};

// Admin-specific data fetch
export const getAdminItinerariesData = async (): Promise<Itinerary[]> => {
    try {
        const itineraries = await fetchAdminItineraries();
        return itineraries;
    } catch (error) {
        console.error("Error loading admin itineraries:", error);
        return [];
    }
};


// Tour guide-specific data fetch
export const getTourGuideItinerariesData = async (): Promise<Itinerary[]> => {
    try {
        const itineraries = await fetchTourGuideItineraries();
        return itineraries;
    } catch (error) {
        console.error("Error loading tour guide itineraries:", error);
        return [];
    }
};


export const getFilteredItinerariesData = async (filters: {
    budget?: number;
    date?: string;
    preferences?: string;
    language?: string;
    touristId?: string;
}): Promise<Itinerary[]> => {
    try {
        const itineraries = await fetchFilteredItineraries(filters);
        return itineraries;
    } catch (error) {
        console.error("Error loading filtered itineraries:", error);
        return [];
    }
};

// export const getBookedItinerariesData = async (touristId: string): Promise<BookedItinerary[]> => {
//     try {
//         const bookedItineraries = await fetchBookedItineraries(touristId);
//         return bookedItineraries;
//     } catch (error) {
//         console.error("Error loading booked itineraries:", error);
//         return [];
//     }
// };
export const getBookedItinerariesData = async (): Promise<BookedItinerary[]> => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
  
      let touristId = ""; // Initialize tourist ID
      try {
        const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
        touristId = decodedToken.id; // Extract the tourist ID
        console.log("Decoded Token:", decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        return [];
      }
  
      // Fetch booked itineraries using the decoded touristId
      const bookedItineraries = await fetchBookedItineraries(touristId);
      return bookedItineraries;
    } catch (error) {
      console.error("Error loading booked itineraries:", error);
      return [];
    }
  };
  

// Add function to handle search itineraries
export const getSearchItinerariesData = async (query: string): Promise<Itinerary[]> => {
    try {
        const itineraries = await searchItineraries(query);
        return itineraries;
    } catch (error) {
        console.error("Error searching itineraries:", error);
        return [];
    }
};