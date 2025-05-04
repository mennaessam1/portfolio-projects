import axios from 'axios';

const ADVERTISER_API_URL = 'http://localhost:8000/govornor';



export const changeTourismGovPassword = async (id: string, oldPassword: string ,password: string, confirmNewPassword: string): Promise<any> => {

    try {
      const response = await axios.put<any>(`${ADVERTISER_API_URL}/changePassword/${id}`, 
        { oldPassword, newPassword: password, confirmNewPassword }
      );
      console.log('Change password response Tourism Gov:', response);
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