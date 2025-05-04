import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const API_URL = 'http://localhost:8000'; // Replace with your API URL

export const login = async (username: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token } = response.data;
    console.log('Logged in:', token);

    // Store the JWT in cookies
    Cookies.set('token', token, { expires: 1 }); // Expires in 1 day
    if (token) {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
    }

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
};