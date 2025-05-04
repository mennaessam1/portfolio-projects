import axios from 'axios';
import { Transport} from '../interFace/interFace';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
//   iat: number; // Add this if included in the token payload
}


const touristId = '673167d3aa67023ecc799397';

export const fetchTransports = async (): Promise<Transport[]> => {
    try {
        const response = await axios.get('http://localhost:8000/tourist/transports');
        return response.data;
    } catch (error) {
        console.error("Error fetching activities:", error);
        throw error;
    }
};


//old dont use bs dont delete 3shan used fi heta tanya
// export const bookTransportApi = async ( transportId: string) => {
//     try {
//         const response = await axios.put(`http://localhost:8000/tourist/bookTransport/${touristId}/${transportId}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error booking transport:', error);
//         throw error;
//     }
// };

// export const getTransportPrice = async (transportId: string, promoCode: string | null): Promise<{ totalPrice: number, promoCodeApplied: boolean }> => {
//     try {
//         const url = promoCode 
//             ? `http://localhost:8000/tourist/transportPrice/${transportId}/${promoCode}`
//             : `http://localhost:8000/tourist/transportPrice/${transportId}`;
//         const response = await axios.get(url);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching transport price:", error);
//         throw error;
//     }
// };


export const getPriceApi = async (transportId: string, promoCode: string) => {
    const params = {
        
        promoCode,
    };

    try {
        const response = await axios.get(
            `http://localhost:8000/tourist/transportPrice/${transportId}`,
            { params }
        );
        return response.data; // Includes `totalPrice` and `isValidPromoCode`
    } catch (error) {
        console.error('Error fetching price:', error);
        throw error;
    }
};

// export const bookTransport = async (
//     touristId: string,
//     transportId: string,
//     paymentMethod: string,
//     promoCode?: string
//   ): Promise<any> => {
//     try {
//       const response = await axios.put(
//         `http://localhost:8000/tourist/bookTransport/${touristId}/${transportId}`,
//         {
//           paymentMethod,
//           promoCode,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error during transport booking:", error);
//       throw error;
//     }
//   };

export const bookTransport = async (
    transportId: string,
    paymentMethod: string,
    promoCode?: string
  ): Promise<void> => {
    try {
      // Retrieve token from cookies
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
  
      // Decode the token to get the tourist ID
      let touristId = "";
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        touristId = decodedToken.id;
        console.log("Decoded Token:", decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        throw new Error("Failed to decode token.");
      }
  
      // Perform the booking API call
      const response = await axios.put(
        `http://localhost:8000/tourist/bookTransport/${touristId}/${transportId}`,
        {
          paymentMethod,
          promoCode: promoCode || "", // Include promoCode if provided
        }
      );
  
      console.log("Booking response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error booking transport:", error);
      throw error;
    }
  };