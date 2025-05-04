import axios from 'axios';

const TOURIST_API_URL = 'http://localhost:8000/tourist';

export const viewTouristProfile = async (id: string): Promise<any> => {
  try {
    const response = await axios.get<any>(`${TOURIST_API_URL}/viewProfile/${id}`);
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

export const updateTouristProfile = async (id: string, updatedData: any): Promise<any> => {
  try {
    const response = await axios.put<any>(`${TOURIST_API_URL}/update/${id}`, updatedData);
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
};

export const deleteTouristProfile = async (id: string): Promise<any> => {
    try {
      const response = await axios.delete<any>(`${TOURIST_API_URL}/delete/${id}`);
      console.log('Delete response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting profile:', error);
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  };

  export const changeTouristPassword = async (id: string, oldPassword: string ,password: string, confirmNewPassword: string): Promise<any> => {
    try {
        
      const response = await axios.put<any>(`${TOURIST_API_URL}/changePassword/${id}`, 
        { oldPassword, newPassword: password, confirmNewPassword }
    );
        console.log('Change password response:', response.data);
        return response.data;
        } catch (error) {
          console.error('Error changing password:', error);
          if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
          } else {
            throw error;
          }
        }
    };