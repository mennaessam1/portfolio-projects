// activityApi.ts

import axios from 'axios';
import { Activity ,BookedActivity} from '../interFace/interFace';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
//   iat: number; // Add this if included in the token payload
}
// const advertiserId ="66fb37dda63c04def29f944e"; 
// const touristId = '67240ed8c40a7f3005a1d01d';

export const fetchActivities = async (): Promise<Activity[]> => {
    try {
        const response = await axios.get('http://localhost:8000/tourist/viewActivities');
        return response.data;
    } catch (error) {
        console.error("Error fetching activities:", error);
        throw error;
    }
};

// Function to create a new activity (POST request)
export const createActivity = async (activityData: any): Promise<any> => {
    try {
        const response = await axios.post(`http://localhost:8000/advertiser/activities`, activityData);
        return response.data;
    } catch (error) {
        console.error("Error creating activity:", error);
        throw error;
    }
};
export const fetchActivitiesAdvertiser = async (): Promise<Activity[]> => {
  try {
    // Extract the token from cookies
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Decode the token to get the advertiser ID
    let advertiserId = "";
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      advertiserId = decodedToken.id; // Extract the advertiser ID
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Failed to decode token.");
    }

    // Make the API call using the extracted advertiser ID
    const response = await axios.get(
      `http://localhost:8000/advertiser/activities?advertiserId=${advertiserId}`
    );

    return response.data.activities; // Ensure this matches your API response structure
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

// Function to flag/unflag an activity for admin
export const toggleFlagActivity = async (id: string, flagStatus: boolean): Promise<void> => {
    try {
        await axios.put(`http://localhost:8000/admin/flagActivity/${id}`, { flagged: flagStatus });
    } catch (error) {
        console.error("Error flagging/unflagging activity:", error);
        throw error;
    }
};
export const filterUpcomingActivities = async (filters: {  ////done with frontend
    budget?: number;
    date?: string;
    category?: string;
    ratings?: number;
    
}): Promise<any[]> => {
    try {
        const response = await axios.get(`http://localhost:8000/tourist/filterActivities`, { params: filters });
        return response.data;
    } catch (error) {
        console.error("Error fetching filtered activities:", error);
        throw error;
    }
};
export const fetchAdminActivities = async (): Promise<Activity[]> => {
    try {
        const response = await axios.get('http://localhost:8000/admin/getALLactivities');  // Adjust URL if necessary
        return response.data;  // Return full itineraries list for admin
    } catch (error) {
        console.error("Error fetching activities for admin:", error);
        throw error;
    }
};

export const bookActivityApi = async (
    activityId: string,
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
        `http://localhost:8000/tourist/bookActivity/${touristId}/${activityId}`,
        {
          numberOfPeople,
          paymentMethod,
          promoCode: promoCode || "", // Optional promo code
        }
      );
  
      console.log("Booking response:", response.data);
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Error booking activity:", error);
      throw error;
    }
  };

export const fetchBookedActivities = async (touristId: string): Promise<BookedActivity[]> => {
    try {
        const response = await axios.get(`http://localhost:8000/tourist/booked-activities/${touristId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching booked activities:", error);
        throw error;
    }
};
// export const cancelActivityApi = async (touristId: string, activityId: string) => {
//     try {
//         const response = await axios.delete(`http://localhost:8000/tourist/cancelActivity/${touristId}/${activityId}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error canceling activity:", error);
//         throw error;
//     }
// };
export const cancelActivityApi = async (activityId: string) => {
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
      const response = await axios.delete(`http://localhost:8000/tourist/cancelActivity/${touristId}/${activityId}`);
      return response.data;
    } catch (error) {
      console.error("Error canceling activity:", error);
      throw error;
    }
  };

export const rateActivityApi = async (touristId : string, activityId : string, rating : Number) => {
    try {
        const response = await axios.post(`http://localhost:8000/tourist/rateActivity/${touristId}/${activityId}`, { rating });
        return response.data;
    } catch (error) {
        console.error('Error rating activity:', error);
        throw error;
    }
};

export const commentOnActivityApi = async (touristId : string, activityId : string, comment : string) => {
    try {
        const response = await axios.post(`http://localhost:8000/tourist/commentOnActivity/${touristId}/${activityId}`, { comment });
        return response.data;
    } catch (error) {
        console.error('Error commenting on activity:', error);
        throw error;
    }
};


// Check if an activity is booked for a specific tourist
export const isActivityBooked = async (activityId: string): Promise<boolean> => {
  try {
    // Extract the token from cookies
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

    // Make the API call using the extracted tourist ID and activity ID
    const response = await axios.get(
      `http://localhost:8000/tourist/booked-status/${touristId}/activity-status/${activityId}`
    );

    return response.data.isBooked; // Return booking status
  } catch (error) {
    console.error("Error checking activity booked status:", error);
    throw error;
  }
};


// export const fetchFilteredActivities = async (filters: { filterType: string }): Promise<any[]> => {
//     try {
//         const response = await axios.get(`http://localhost:8000/tourist/filteractivitiesdate/${touristId}`, {
//             params: filters, // Pass filters including filterType
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching filtered activities:", error);
//         throw error;
//     }
// };

export const fetchFilteredActivities = async (filters: { filterType: string }): Promise<any[]> => {
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
    const response = await axios.get(`http://localhost:8000/tourist/filteractivitiesdate/${touristId}`, {
      params: filters, // Pass filters including filterType
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered activities:", error);
    throw error;
  }
};




export const getPriceApi = async (activityId: string, numberOfPeople: number, promoCode: string) => {
    const params = {
        numberOfPeople,
        promoCode,
    };

    try {
        const response = await axios.get(
            `http://localhost:8000/tourist/activityPrice/${activityId}`,
            { params }
        );
        return response.data; // Includes `totalPrice` and `isValidPromoCode`
    } catch (error) {
        console.error('Error fetching price:', error);
        throw error;
    }
};


  export const toggleBookingState = async (activityId: string, bookingOpen: boolean) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/advertiser/openBookingForActivity/${activityId}`,
        { bookingOpen }
      );
      return response.data;
    } catch (error) {
      console.error("Error toggling booking state:", error);
      throw error;
    }
  };
  
    //To save/unsave an itinerary
    export const saveOrUnsaveActivityApi = async (activityId: string, save: boolean): Promise<any> => {
      try {
        // Extract the token from cookies
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
    
        // Decode the token to get the tourist ID
        let touristId = "";
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          touristId = decodedToken.id; // Extract the tourist ID
          console.log("Decoded Token:", decodedToken);
        } catch (error) {
          console.error("Error decoding token:", error);
          throw new Error("Failed to decode token.");
        }
    
        // Make the API call using the extracted tourist ID and activity ID
        const response = await axios.post(
          `http://localhost:8000/tourist/toggleSaveActivity/${touristId}/${activityId}`,
          { save } // Pass the save/unsave state in the request body
        );
    
        return response.data.savedActivities; // Return the updated saved activities
      } catch (error) {
        console.error("Error saving/unsaving activity:", error);
        throw error;
      }
    };

  export const checkIfActivitySaved = async (touristId: string, activityId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/tourist/isActivitySaved/${touristId}/${activityId}`
      );
      return response.data.isSaved;
    } catch (error) {
      console.error("Error checking if activity is saved:", error);
      throw error;
    }
  };

  export const getPaidPriceApiAct = async (activityId: string) => {
    
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
        `http://localhost:8000/tourist/getPaidPriceAct/${touristId}/${activityId}`
    );
    console.log(response.data.paidPrice);
    return response.data.paidPrice; // Return paid price from response.
} catch (error) {
    console.error('Error fetching paid price:', error);
    throw error;
}
};

export const fetchImage = async (activityId: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/advertiser/activities/photo/${activityId}`);
    
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
export const deleteActivityApi = async (activityId: string, advertiserId: string): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:8000/advertiser/activities/${activityId}`, {
      params: { advertiserId }, // Pass the advertiserId as a query parameter
    });
    console.log("Activity deleted successfully:", response.data);
  } catch (error: any) {
    // Handle errors more robustly
    if (axios.isAxiosError(error) && error.response) {
      // Log server-side error if available
      console.error("Server error deleting activity:", error.response.data);
      throw new Error(error.response.data.message || "Failed to delete activity.");
    } else {
      // Log client-side or other errors
      console.error("Client-side error deleting activity:", error.message);
      throw new Error("An unexpected error occurred while deleting the activity.");
    }
  }

};
export const updateActivityApi = async (
  activityId: string,
  updates: Record<string, any>,
  advertiserId: string
): Promise<void> => {
  try {
    const response = await axios.put(
      `http://localhost:8000/advertiser/activities/${activityId}`,
      updates,
      {
        params: { advertiserId }, // Include advertiserId as a query parameter
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Activity updated successfully:", response.data);
  } catch (error) {
    console.error("Failed to update activity:", error);
    throw error;
  }
};

// Fetch category names
export const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8000/admin/getCategoryNames");

    if (response.status === 200 && Array.isArray(response.data)) {
      return response.data; // Return the category names array
    }

    throw new Error("Categories not found or invalid response format");
  } catch (error) {
    console.error("Error fetching categories:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Error fetching categories");
    } else {
      throw new Error("Error fetching categories");
    }
  }
};


  