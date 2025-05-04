import axios from 'axios';

const ADVERTISER_API_URL = 'http://localhost:8000/advertiser';

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


export const viewAdvertiserProfile = async (id: string): Promise<any> => {
  try {
    const response = await axios.get<any>(`${ADVERTISER_API_URL}/viewProfile/${id}`);
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


export const updateAdvertiserProfile = async (id: string, updatedData: any): Promise<any> => {

  try {
    const response = await axios.put<any>(`${ADVERTISER_API_URL}/updateProfile/${id}`, updatedData);
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
export const getAdvertiserSalesReport = async (): Promise<AdvertiserSales> => {
  const cookie = Cookies.get('token');

  let advertiserId = '';
  try {
    if (cookie) {
      const decodedToken = jwtDecode<DecodedToken>(cookie);
      console.log('Decoded Token:', decodedToken);
      advertiserId = decodedToken.id; // Extract 'id' from the token
    } else {
      throw new Error("No token found. Please log in.");
    }

    console.log('Advertiser ID:', advertiserId);

    const response = await axios.get<AdvertiserSales>(`${ADVERTISER_API_URL}/sales-report/${advertiserId}`);
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

export const requestAccountDeletion = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete<any>(`${ADVERTISER_API_URL}/requestAccountDeletion/${id}`);
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


export const getAdvertiserLogo = async (id: string): Promise<any> => {
  try {
    const response = await axios.get<any>(`${ADVERTISER_API_URL}/viewLogo/${id}`);
    console.log('Logo data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching logo data:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
}


export const changeAdvertiserPassword = async (id: string, oldPassword: string ,password: string, confirmNewPassword: string): Promise<any> => {

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

export const uploadAdvertiserLogo = async (id: string, formData: FormData): Promise<any> => {
  
  try {
    const response = await axios.post<any>(`${ADVERTISER_API_URL}/uploadLogo/${id}`, formData);
    console.log('Upload logo response:', response);
    return response.data;
  } catch (error) {
    console.error('Error uploading logo:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
}

export const acceptAdvertiserTermsAndConditions = async (id: string): Promise<any> => {

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

export const getTouristReportofAdvertiser = async (): Promise<TouristReportOfAdvertiser> => {
  const cookie = Cookies.get('token');

  let advertiserId = '';
  try {
    if (cookie) {
      const decodedToken = jwtDecode<DecodedToken>(cookie);
      console.log('Decoded Token:', decodedToken);
      advertiserId = decodedToken.id; // Extract 'id' from the token
    } else {
      throw new Error("No token found. Please log in.");
    }

    console.log('Advertiser ID:', advertiserId);

    const response = await axios.get<TouristReportOfAdvertiser>(`${ADVERTISER_API_URL}/tourist-report/${advertiserId}`);
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
