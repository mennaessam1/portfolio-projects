// itineraryApi.ts

import axios from 'axios';
import { AdvertiserSales , TouristReportOfAdvertiser} from '@/interFace/interFace'; 
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
  iat: number; // Add this if included in the token payload
}

import { Itinerary, BookedItinerary } from '../interFace/interFace';



// const tourGuideId = '67244655313a2a345110c1e6';  // Hardcoded tour guide ID


/////////////////////////done///////////////////
export const fetchAllItineraries = async (): Promise<Itinerary[]> => {
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

    // Make the API call using the extracted tourist ID
    const response = await axios.get(
      `http://localhost:8000/tourist/viewItineraries?touristId=${touristId}`
    );
    return response.data.itineraries;
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    throw error;
  }
};

/////////////////////////done///////////////////
export const filterItineraries = async (filters: { 
  budget?: number;
  date?: string;
  preferences?: string;
  language?: string;
}): Promise<any[]> => {
  try {
    // Retrieve the token from cookies
    // Decode the token to extract the tourist ID
    let touristId = "";
    const token = Cookies.get("token");
    if (!token) {
      // throw new Error("No token found. Please log in.");
      touristId="6755df2c1153f9878a8ba068";
    }

    else{
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      touristId = decodedToken.id;
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Failed to decode token.");
    }
  }

    // Include the touristId in the filters
    const params = { ...filters, touristId };

    const response = await axios.get(`http://localhost:8000/tourist/filterItineraries`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered itineraries:", error);
    throw error;
  }
};




/////////////////////////done///////////////////
export const isItineraryBooked = async (itineraryId: string): Promise<boolean> => {
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

    // Make the API call using the extracted tourist ID
    const response = await axios.get(
      `http://localhost:8000/tourist/booked-status/${touristId}/booked-status/${itineraryId}`
    );
    return response.data.isBooked; // Return whether the itinerary is booked
  } catch (error) {
    console.error("Error checking itinerary booked status:", error);
    throw error;
  }
};



 /////////////////////////done/////////////////// not specific
export const fetchAdminItineraries = async (): Promise<Itinerary[]> => {
    try {
        const response = await axios.get('http://localhost:8000/admin/getALLitineraries');  // Adjust URL if necessary
        return response.data;  // Return full itineraries list for admin
    } catch (error) {
        console.error("Error fetching itineraries for admin:", error);
        throw error;
    }
};



 /////////////////////////done///////////////////
export const fetchTourGuideItineraries = async (): Promise<Itinerary[]> => {
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
      tourGuideId = decodedToken.id; // Use the 'id' field as the tour guide ID
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Failed to decode token.");
    }

    // Fetch itineraries for the specific tour guide
    const response = await axios.get(`http://localhost:8000/tourguide/itineraries/${tourGuideId}`);
    return response.data; // Return itineraries for the specific tour guide
  } catch (error) {
    console.error("Error fetching itineraries for tour guide:", error);
    throw error;
  }
};


export const fetchFilteredItineraries = async (filters: {  ////done with frontend
    budget?: number;
    date?: string;
    preferences?: string;
    language?: string;
    touristId?: string;
}): Promise<Itinerary[]> => {
    try {
        const response = await axios.get(`http://localhost:8000/tourist/filterItineraries`, { params: filters });
        return response.data;
    } catch (error) {
        console.error("Error fetching filtered itineraries:", error);
        throw error;
    }
};

export const searchItineraries = async (query: string): Promise<Itinerary[]> => { ////done with frontend
    try {
        const response = await axios.get(`http://localhost:8000/tourist/search`, {
            params: { query },
        });
        return response.data.itineraries; // Only return itineraries from the response
    } catch (error) {
        console.error("Error searching itineraries:", error);
        throw error;
    }
};

// Fetch booked itineraries for a specific tourist
export const fetchBookedItineraries = async (touristId: string): Promise<BookedItinerary[]> => {
    try {
        const response = await axios.get(`http://localhost:8000/tourist/booked-itineraries/${touristId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching booked itineraries:", error);
        throw error;
    }
};




 /////////////////////////done/////////////////// doesnt use admin id
export const toggleFlagItinerary = async (id: string, flagStatus: boolean): Promise<void> => {
    try {
        await axios.put(`http://localhost:8000/admin/flagItinerary/${id}`, { flagged: flagStatus });
    } catch (error) {
        console.error("Error flagging/unflagging itinerary:", error);
        throw error;
    }
};

 /////////////////////////done/////////////////// doesnt use tourguide id
export const toggleItineraryActivation = async (id: string, deactivate: boolean): Promise<void> => {
    try {
        await axios.put(`http://localhost:8000/tourguide/activateOrDeactivateItinerary/${id}`, { deactivate });
    } catch (error) {
        console.error("Error toggling itinerary activation status:", error);
        throw error;
    }
};



  /////////////////////////done///////////////////
export const rateItineraryApi = async (touristId : string, itineraryId : string, rating : Number) => {
    try {
        const response = await axios.post(`http://localhost:8000/tourist/rateItinerary/${touristId}/${itineraryId}`, { rating });
        return response.data;
    } catch (error) {
        console.error('Error rating itinerary:', error);
        throw error;
    }
};

  /////////////////////////done///////////////////
export const commentOnItineraryApi = async (touristId : string, itineraryId : string, comment : string) => {
    try {
        const response = await axios.post(`http://localhost:8000/tourist/commentItinerary/${touristId}/${itineraryId}`, { comment });
        return response.data;
    } catch (error) {
        console.error('Error commenting on itinerary:', error);
        throw error;
    }
};


  /////////////////////////done///////////////////
export const rateTourGuideApi = async (touristId: string, tourGuideId: string, rating: number) => {
    try {
        const response = await axios.post(`http://localhost:8000/tourist/ratetourguide/${touristId}/${tourGuideId}`, { rating });
        return response.data;
    } catch (error) {
        console.error("Error rating tour guide:", error);
        throw error;
    }
};



  /////////////////////////done///////////////////
export const commentOnTourGuideApi = async (touristId: string, tourGuideId: string, comment: string) => {
    try {
        const response = await axios.post(`http://localhost:8000/tourist/commenttourguide/${touristId}/${tourGuideId}`, { comment });
        return response.data;
    } catch (error) {
        console.error("Error commenting on tour guide:", error);
        throw error;
    }
};



  /////////////////////////done///////////////////
export const cancelItineraryApi = async (itineraryId: string) => {
  try {
    // Retrieve the token from cookies
    const token = Cookies.get("token");
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
      throw new Error("Failed to decode token.");
    }

    // Make the API call with the extracted touristId
    const response = await axios.delete(`http://localhost:8000/tourist/cancelItinerary/${touristId}/${itineraryId}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling itinerary:", error);
    throw error;
  }
};

// Function to fetch a tourist's username by their ID
export const fetchTouristUsername = async (touristId: string): Promise<string> => {
    try {
        const response = await axios.get(`http://localhost:8000/tourist/getUsername/${touristId}`);
        return response.data.username; // Extract the username from the response
    } catch (error) {
        console.error("Error fetching tourist username:", error);
        throw error;
    }
};


  /////////////////////////done///////////////////
export const bookItineraryApi = async (
    itineraryId: string,
    bookingDate: Date,
    paymentMethod: string,
    numberOfPeople: number,
    promoCode?: string
  ): Promise<void> => {
    const token = Cookies.get("token"); // Retrieve the token from cookies
  
    let touristId = ""; // Initialize touristId
    try {
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
        console.log("Decoded Token:", decodedToken);
        touristId = decodedToken.id; // Extract the tourist ID
      } else {
        throw new Error("No token found. Please log in.");
      }
  
      // Perform the booking API call
      const response = await axios.post(
        `http://localhost:8000/tourist/bookItinerary/${touristId}/${itineraryId}`,
        null, // No body payload, parameters are sent via query
        {
          params: {
            bookingDate: bookingDate.toISOString(),
            paymentMethod,
            numberOfPeople,
            promoCode: promoCode || "", // Optional promo code
          },
        }
      );
  
      console.log("Booking response:", response.data);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Error booking itinerary:", error);
      throw error;
    }
  };





// Function to create a new itinerary (POST request)
export const createItinerary = async (itineraryData: any): Promise<any> => {
    try {
        const response = await axios.post("http://localhost:8000/tourguide/Createitinerary", itineraryData);
        return response.data;
    } catch (error) {
        console.error("Error creating itinerary:", error);
        throw error;
    }
};

  /////////////////////////done///////////////////
export const fetchTourGuideRatings = async (tourGuideId: string) => {
    try {
        const response = await axios.get(`http://localhost:8000/tourguide/fetch/${tourGuideId}`);
        return response.data; // Assuming the API returns an object with ratings, averageRating, and comments
    } catch (error) {
        console.error("Error fetching tour guide ratings:", error);
        throw error;
    }
};


  /////////////////////////done///////////////////
export const getPriceApi = async (itineraryId: string, numberOfPeople: number, promoCode : string) => {
    const params = {
      numberOfPeople,
      promoCode,
    };
  
    try {
      const response = await axios.get(`http://localhost:8000/tourist/itineraryPrice/${itineraryId}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching price:', error);
      throw error;
    }
  };



  /////////////////////////done///////////////////
  export const toggleSaveItinerary = async (touristId: string,itineraryId: string): Promise<any> => {
    try {
      const response = await axios.post( `http://localhost:8000/tourist/toggleSaveItinerary/${touristId}/${itineraryId}`);
      return response.data; // Return the updated saved itineraries list
    } catch (error: any) {
      console.error("Error saving/unsaving itinerary:", error);
      throw error.response?.data || error.message;
    }
  };



   /////////////////////////done/////////////////// doesnt take id
  export const toggleBookingState = async (itineraryId: string, bookingOpen: boolean) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/tourguide/openBooking/${itineraryId}`,
        { bookingOpen }
      );
      return response.data;
    } catch (error) {
      console.error("Error toggling booking state:", error);
      throw error;
    }
  };
  

  /////////////////////////done///////////////////
  export const checkIfSaved = async (touristId: string, itineraryId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/tourist/isItinerarySaved/${touristId}/${itineraryId}`
      );
      return response.data.isSaved;
    } catch (error) {
      console.error("Error checking if itinerary is saved:", error);
      throw error;
    }
  };




 /////////////////////////done/////////////////// bs men gowa 
export const viewAllSavedEventsApi = async (touristId: string): Promise<any> => {
  console.log("tid rec: ",touristId);
    try {
      const response = await axios.get(`http://localhost:8000/tourist/viewAllSavedEvents/${touristId}`);
      return {
        savedActivities: response.data.savedActivities,
        savedItineraries: response.data.savedItineraries,
      }; // Return both saved activities and itineraries
    } catch (error) {
      console.error("Error fetching saved events:", error);
      throw error;
    }
  };



 /////////////////////////done/////////////////// does not use id
  export const fetchItImage = async (itineraryId: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/tourguide/itinerary/photo/${itineraryId}`);
      
      if (response.status === 200 && response.data.imageUrl) {
        return response.data.imageUrl; // Extract the URL directly
      }
      
      throw new Error('Image not found or could not retrieve the URL');
    } catch (error) {
      console.error('Error fetching product image:', error);
      if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data?.message || 'Error fetching product image');
      } else {
          throw new Error('Error fetching product image');
      }
    }
  };

  /////////////////////////done///////////////////
  export const getPaidPriceApi = async (itineraryId: string) => {
    
        const token = Cookies.get('token'); // Retrieve the token from cookies.
        let touristId = ""; // Initialize touristId
    try {
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
        console.log("Decoded Token:", decodedToken);
        touristId = decodedToken.id; // Extract the tourist ID
      } else {
        throw new Error("No token found. Please log in.");
      }

        const response = await axios.get(
            `http://localhost:8000/tourist/getPaidPrice/${touristId}/${itineraryId}`
        );
        console.log(response.data.paidPrice);
        return response.data.paidPrice; // Return paid price from response.
    } catch (error) {
        console.error('Error fetching paid price:', error);
        throw error;
    }
};


export const getAvailableTags = async (): Promise<string[]> => {
  try {
      const response = await axios.get(`http://localhost:8000/govornor/viewPreferences`);
      console.log("Tags available:", response.data);
      return response.data;
  } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
  }
};
export const deleteItineraryApi = async (
  itineraryId: string
  //tourGuideId: string
): Promise<void> => {
  const token = Cookies.get("token");
  let tourGuideId = "";
  try {
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      console.log("Decoded Token:", decodedToken);
      tourGuideId = decodedToken.id; // Extract the Tour Guide ID from the token
    } else {
      throw new Error("No token found. Please log in.");
    }
    const response = await axios.delete(
      `http://localhost:8000/tourguide/deleteItinerary/${itineraryId}`,
      {
        params: { tourGuideId },
      }
    );
    console.log(`Itinerary with ID: ${itineraryId} deleted successfully.`);
    return response.data;
  } catch (error) {
    // Use `as` keyword to assert the error type as AxiosError
    if (axios.isAxiosError(error)) {
      console.error("Error deleting itinerary:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    } else {
      console.error("Unexpected error:", error);
      throw error; // Re-throw if it's not an AxiosError
    }
  }
};
export const updateItineraryApi = async (
itineraryId: string,
updates: Record<string, any>,
//tourGuideId: string // Added tourGuideId parameter
): Promise<void> => {
  const token = Cookies.get("token");
  let tourGuideId = "";
try {
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded Token:", decodedToken);
    tourGuideId = decodedToken.id; // Extract the Tour Guide ID from the token
  } else {
    throw new Error("No token found. Please log in.");
  }
  const response = await axios.put(
    `http://localhost:8000/tourguide/Updateitinerary/${itineraryId}?tourGuideId=${tourGuideId}`, // Include tourGuideId as a query parameter
    updates,
    {
      headers: {
        "Content-Type": "application/json", // Ensure the correct content type
        // Include Authorization header if needed
        // Authorization: `Bearer ${yourToken}`,
      },
    }
  );

  console.log(`Itinerary with ID: ${itineraryId} updated successfully.`);
  return response.data;
} catch (error) {
  console.error("Error updating itinerary:", error);
  throw error;
}
};