import axios from 'axios';

const API_URL = 'http://localhost:8000';


export const sendOtp = async (email: string): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/sendOtp`, { email });
        return response.data;
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw error;
    }
};

export const verifyOtp = async (email: string, otp: string): Promise<any> => {
    try {
        console.log("Verifying OTP:", otp);
        console.log("Email:", email);
        const response = await axios.delete(`${API_URL}/verifyOtp`, { data: { email, otp } });
        console.log("OTP Verified Successfully:", response.data);
        return response;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
};


export const resetPassword = async (email: string, password: string): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/changePasswordAfterOtp`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};