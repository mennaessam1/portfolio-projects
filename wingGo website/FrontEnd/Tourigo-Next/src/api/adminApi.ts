import axios from 'axios';
import { IPendingUser} from '../interFace/interFace';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    username: string;
    id: string;
    role: string;
    mustChangePassword: boolean;
}



export const fetchPendingUsers = async (): Promise<any[]> => {
    try {
        const response = await axios.get<IPendingUser[]>('http://localhost:8000/admin/pending-users');
        return response.data;
    } catch (error) {
        console.error("Error fetching pending users:", error);
        throw error;
    }
};
export const approvePendingUserById = async (id: string): Promise<any> => {
    try {
        const response = await axios.put(`http://localhost:8000/admin/approve/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error approving user:", error);
        throw error;
    }
};
export const deletePendingUserById = async (id: string): Promise<any> => {
    try {
        const response = await axios.delete(`http://localhost:8000/admin/pending-users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error approving user:", error);
        throw error;
    }
};


// View pending user certificate
export const viewPendingUserCertificate = async (id: string): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:8000/admin/viewPendingUserCertificate/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user certificate:", error);
        throw error;
    }
};

// View pending user ID document
export const viewPendingUserID = async (id: string): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:8000/admin/viewPendingUserID/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user ID document:", error);
        throw error;
    }
};
export const fetchUsername = async (): Promise<any[]> => {


    const cookie = Cookies.get('token');

    let adminID = '';
    try {
        if(cookie){
            const decodedToken = jwtDecode<DecodedToken>(cookie);
            console.log('Decoded Token:', decodedToken);
            adminID = decodedToken.id;
        }
        const response = await axios.get<IPendingUser[]>(`http://localhost:8000/admin/getUsername/${adminID}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching username:", error);
        throw error;
    }
};
export const changeAdminPassword = async (id: string, oldPassword: string ,password: string, confirmNewPassword: string): Promise<any> => {
    try {
        
      const response = await axios.put<any>(`http://localhost:8000/admin/changePassword/${id}`, 
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


export const fetchUsers = async (): Promise<any> => {
            

        const cookie = Cookies.get('token');

        let username = '';
    try{

        if(cookie){
            const decodedToken = jwtDecode<DecodedToken>(cookie);
            console.log('Decoded Token:', decodedToken);
            username = decodedToken.username;
            
        }
        
        const response = await axios.get(`http://localhost:8000/admin/getAllUsers?username=${username}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const searchUsers = async (search: string): Promise<any> => {
    const cookie = Cookies.get('token');

    let username = '';
    try {
        if (cookie) {
            const decodedToken = jwtDecode<DecodedToken>(cookie);
            console.log('Decoded Token:', decodedToken);
            username = decodedToken.username;
        }
        const response = await axios.get(`http://localhost:8000/admin/searchUser?username=${search}&LoggedInUsername=${username}`);
        return response.data;
    } catch (error) {
        console.error("Error searching users:", error);
        throw error;
    }
}

export const deleteUserById = async (id: string): Promise<any> => {
    try {
        const response = await axios.delete(`http://localhost:8000/admin/deleteAccount/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};


export const addAdmin = async (username: string, email: string, password: string): Promise<any> => {

    try {
        const response = await axios.post(`http://localhost:8000/admin/add-admin`, { username, email, password });
        return response.data;
    } catch (error) {
        console.error("Error adding admin:", error);
        throw error;
    }
};

export const addGovernor = async (username: string, email: string, password: string): Promise<any> => {
    
        try {
            const response = await axios.post(`http://localhost:8000/admin/addGovernor`, { username, email, password });
            return response.data;
        } catch (error) {
            console.error("Error adding governer:", error);
            throw error;
        }
    }


export const getAllPrefTags = async (): Promise<any[]> => {
    try {
        const response = await axios.get<any[]>('http://localhost:8000/admin/preferences');
        return response.data;
    } catch (error) {
        console.error("Error fetching preference tags:", error);
        throw error;
    }
};


export const updatePrefTags = async (id: string, name: string): Promise<any> => {
    try {
        const response = await axios.put(`http://localhost:8000/admin/preferences/${id}`, { name });
        return response.data;
    } catch (error) {
        console.error("Error updating preference tags:", error);
        throw error;
    }
};

export const deletePrefTag = async (id: string): Promise<any> => {
    try {
        const response = await axios.delete(`http://localhost:8000/admin/preferences/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting preference tag:", error);
        throw error;
    }
}


export const addPrefTag = async (name: string): Promise<any> => {
    try {
        const response = await axios.post(`http://localhost:8000/admin/preferences`, { name });
        return response.data;
    } catch (error) {
        console.error("Error adding preference tag:", error);
        throw error;
    }
};


export const getAllActCategories = async (): Promise<any> => {

    try {
        const response = await axios.get<any[]>('http://localhost:8000/admin/getcategories');
        return response.data;
    } catch (error) {
        console.error("Error fetching activity categories:", error);
        throw error;
    }
};

export const updateActCategories = async (id: string, name: string): Promise<any> => {
    try {
        const response = await axios.put(`http://localhost:8000/admin/updatecategory/${id}`, { name });
        return response.data;
    } catch (error) {
        console.error("Error updating activity categories:", error);
        throw error;
    }
}

export const deleteActCategory = async (id: string): Promise<any> => {
    try {
        const response = await axios.delete(`http://localhost:8000/admin/deletecategory/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting activity category:", error);
        throw error;
    }
}

export const addActCategory = async (name: string): Promise<any> => {
    try {
        const response = await axios.post(`http://localhost:8000/admin/categories`, { name });
        return response.data;
    } catch (error) {
        console.error("Error adding activity category:", error);
        throw error;
    }
};

export const fetchSalesReport = async (): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:8000/admin/sales-report');
        return response.data;
    } catch (error) {
        console.error("Error fetching sales report:", error);
        throw error;
    }
};


export const fetchUserStatistics = async (): Promise<any> => {
    try {
      const response = await axios.get('http://localhost:8000/admin/user-statistics');
      return response.data;
    } catch (error) {
      console.error("Error fetching user statistics:", error);
      throw error;
    }
  };
  
