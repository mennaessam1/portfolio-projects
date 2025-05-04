import axios, { AxiosResponse } from 'axios';


const API_URL = 'http://localhost:8000';

export const registerTourist = async (user: any): Promise<any> => {
    const username = user.username;
    const email = user.email;
    const mobileNumber = user.mobileNumber;
    const password = user.password;
    const nationality = user.nationality;
    const jobOrStudent = user.jobOrStudent;
    const DOB = user.DOB;
    
    try {
        const response: AxiosResponse<any> = await axios.post(`${API_URL}/register`, {
            username,
            email,
            mobileNumber,
            password,
            nationality,
            jobOrStudent,
            DOB,
            role: 'tourist'
        
        });
        console.log('Register response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.error };
        } else {
            return { error: 'An unknown error occurred' };
        }
    }
};

export const registerPendingUser = async (user: any, IDdocument: any, certificate: any, role:any): Promise<any> => {
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('username', user.username);
    formData.append('password', user.password);
    //make role lower case
    role = role.toLowerCase();
    console.log('role:', role);
    formData.append('role', role);
    formData.append('IDdocument', IDdocument);
    formData.append('certificate', certificate);

    try {
        const response: AxiosResponse<any> = await axios.post(`${API_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Register response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { error: error.response.data.error };
        } else {
            return { error: 'An unknown error occurred' };
        }
    }
};

export const registerUser = async (user: any, IDdocument: any, certificate: any, role:any): Promise<any> => {
    if (role === 'Tourist') {
        return registerTourist(user as any);
    } else {
        return registerPendingUser(user as any, IDdocument, certificate, role);
    }
};