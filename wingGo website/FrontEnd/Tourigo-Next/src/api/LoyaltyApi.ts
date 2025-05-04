import axios from 'axios';

const API_URL = 'http://localhost:8000/tourist';

export const redeemPoints = async (touristId: string, points: Number): Promise<any> => {
  try {
    const response = await axios.put<any>(`${API_URL}/redeemPoints/${touristId}`, { points });
    console.log('Redeem points response:', response.data);
    return response.data.tourist;
  } catch (error) {
    console.error('Error redeeming points:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
};