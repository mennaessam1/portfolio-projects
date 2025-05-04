import axios from 'axios';
import { TourGuideSales , TouristReportOfGuide} from '@/interFace/interFace'; // Adjust the path based on your project structure
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
  iat: number; // Add this if included in the token payload
}


const ADVERTISER_API_URL = 'http://localhost:8000/tourguide';

export const viewTourGuideProfile = async (id: string): Promise<any> => {
  try {
    const response = await axios.get<any>(`${ADVERTISER_API_URL}/fetch/${id}`);
    console.log('Profile data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
};

export const updateTourGuideProfile = async (id: string, updatedData: any): Promise<any> => {

  try {
    const response = await axios.put<any>(`${ADVERTISER_API_URL}/update/${id}`, updatedData);
    console.log('Update response:', response);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
}

export const requestAccountDeletion = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete<any>(`${ADVERTISER_API_URL}/deleteAccount/${id}`);
    console.log('Delete response:', response);
    return response.data;
  } catch (error) {
    console.error('Error deleting profile:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
}


export const getTourGuidePhoto = async (id: string): Promise<any> => {
  try {
    const response = await axios.get<any>(`${ADVERTISER_API_URL}/viewProfilePhoto/${id}`);
    console.log('Photo data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching photo data:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
}


export const changeTourGuidePassword = async (id: string, oldPassword: string ,password: string, confirmNewPassword: string): Promise<any> => {

  try {
    const response = await axios.put<any>(`${ADVERTISER_API_URL}/changePassword/${id}`, 
      { oldPassword, newPassword: password, confirmNewPassword }
    );
    console.log('Change password response:', response);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
}

export const uploadTourGuidePhoto = async (id: string, formData: FormData): Promise<any> => {
  
  try {
    const response = await axios.post<any>(`${ADVERTISER_API_URL}/changeProfilePhoto/${id}`, formData);
    console.log('Upload photo response:', response);
    return response.data;
  } catch (error) {
    console.error('Error uploading photo:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
}

export const acceptTermsAndConditions = async (id: string): Promise<any> => {
    try {
        const response = await axios.put<any>(`${ADVERTISER_API_URL}/acceptterms/${id}`);
        console.log('Accept terms response:', response);
        return response.data;
    } catch (error) {
        console.error('Error accepting terms:', error);
        if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
        } else {
        throw error;
        }
    }
    }


export const getSalesReport = async (): Promise<TourGuideSales> => {
  const cookie = Cookies.get('token');

  let tourGuideId = '';
  try {
      if (cookie) {
        const decodedToken = jwtDecode<DecodedToken>(cookie);
          console.log('Decoded Token:', decodedToken);
          tourGuideId = decodedToken.id; // Use 'id' from the token
      } else {
          throw new Error("No token found. Please log in.");
      }
      console.log('Tour Guide ID:', tourGuideId);
      const response = await axios.get<TourGuideSales>(`${ADVERTISER_API_URL}/sales-report/${tourGuideId}`);

      console.log('Sales report data:', response.data);
      return response.data;

  } catch (error) {
      console.error('Error fetching sales report:', error);
      if (axios.isAxiosError(error)) {
          throw error.response?.data || error.message;
      } else {
          throw error;
      }
  }
};

// Fetch Tourist Report
export const getTouristReportofguide = async (): Promise<TouristReportOfGuide> => {
  const cookie = Cookies.get('token');

  let tourGuideId = '';
  try {
    if (cookie) {
      const decodedToken = jwtDecode<DecodedToken>(cookie);
      console.log('Decoded Token:', decodedToken);
      tourGuideId = decodedToken.id; // Extract 'id' from the token
    } else {
      throw new Error("No token found. Please log in.");
    }

    console.log('Tour Guide ID:', tourGuideId);

    const response = await axios.get<TouristReportOfGuide>(
      `${ADVERTISER_API_URL}/tourist-report/${tourGuideId}`
    );
    console.log('Tourist report data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourist report:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
};
