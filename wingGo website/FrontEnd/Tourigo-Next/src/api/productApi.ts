import axios from 'axios';
import {  Product , IPurchasedProduct} from '../interFace/interFace';

export const fetchAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get('http://localhost:8000/admin/getallproducts');
        return response.data;
    } catch (error) {
        console.error("Error fetching Prods:", error);
        throw error;
    }
};
//localhost:8000/tourist/getallproducts2/6703fe37af26882204ffb006
export const fetchallproductsTourist = async(touristId: string): Promise<Product[]>=>{
  try{
    const response = await axios.get(`http://localhost:8000/tourist/getallproducts2/${touristId}`);
    return response.data;
  }
  catch(error){
    console.error('Error fetching products',error);
    throw error;
  }
}
export const fetchTouristData = async (touristId: string) => {
    try {
        const response = await axios.get(`http://localhost:8000/tourist/${touristId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tourist data:', error);
        throw error;
    }
};

export const fetchSellerData = async (sellerId: string) => {
    try {
        const response = await axios.get(`http://localhost:8000/seller/${sellerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching seller data:', error);
        throw error;
    }
};

export const ArchiveUnarchiveProduct = async (id: string, sellerId: string, value: boolean) => {
    try {
      const response = await axios.put(`http://localhost:8000/seller/changearchive/${id}`, {
        sellerId,
        value
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error archiving/unarchiving product');
    }
  };

  export const ArchiveUnarchiveProductAdmin = async (id: string, value: boolean) => {
    try {
      const response = await axios.put(`http://localhost:8000/admin/changearchive/${id}`, {
        value
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error archiving/unarchiving product');
    }
  };

  export const rateProduct = async (touristId: string, productId: string, rating: number) => {
    try {
      const response = await axios.post(`http://localhost:8000/tourist/rateProduct/${touristId}/${productId}`, {
        rating,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error rating product');
    }
  };
  
  // Function to review a product
  export const reviewProduct = async (touristId: string, productId: string, review: string) => {
    try {
      const response = await axios.post(`http://localhost:8000/tourist/reviewProduct/${touristId}/${productId}`, {
        review,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error reviewing product');
    }
  };

  export const purchaseProduct = async (touristId: string, productId: string) => {
    try {
        const response = await axios.post(`http://localhost:8000/tourist/purchaseProduct/${touristId}/${productId}`);
        return response.data;
    } catch (error: any) {
        console.error('Error purchasing product:', error);
        throw new Error(error.response?.data?.message || 'Error processing purchase');
    }
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
export const fetchPurchasedProducts = async (
  touristId: string
): Promise<IPurchasedProduct[]> => {
  try {
    const response = await axios.get<IPurchasedProduct[]>(
      `${API_BASE_URL}/tourist/purchasedProducts/${touristId}`
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching purchased products:', error);
    throw new Error(error.response?.data?.message || 'Error fetching purchased products');
  }
};


// Function to edit a product
export const editProduct = async (productId: string, updates: Partial<Product>, pictureFile?: File) => {
  try {
    const formData = new FormData();

    // Append fields to formData if they are provided
    if (updates.name) formData.append('name', updates.name);
    if (updates.price !== undefined) formData.append('price', updates.price.toString());
    if (updates.quantity !== undefined) formData.append('quantity', updates.quantity.toString());
    if (updates.description) formData.append('description', updates.description);

    // Append the picture file if provided
    if (pictureFile) formData.append('picture', pictureFile);

    const response = await axios.put(`http://localhost:8000/admin/product/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error updating product:', error);
    throw new Error(error.response?.data?.message || 'Error updating product');
  }
};
export const createProduct = async (productData: any): Promise<any> => {
  try {
      const response = await axios.post(`http://localhost:8000/admin/add-product`, productData);
      return response.data;
  } catch (error) {
      console.error("Error creating product:", error);
      throw error;
  }
};
export const createProductsel = async (productData: any): Promise<any> => {
try {
    const response = await axios.post(`http://localhost:8000/seller/addProduct`, productData);
    return response.data;
} catch (error) {
    console.error("Error creating product:", error);
    throw error;
}
};
export const fetchProductImage = async (productId: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/admin/getProductImage/${productId}`);
    
    if (response.status === 200 && response.data.imageUrl) {
      return response.data.imageUrl; // Extract the URL directly
    }
    
    throw new Error('Image not found or could not retrieve the URL');
  } catch (error) {
    console.error('Error fetching product image:', error);
    if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.message || 'Error fetching product image');
    } else {
        throw new Error('Error fetching product image');
    }
  }
};
export const filterProducts = async (filters: { 
  budget?: number;
 
}): Promise<any[]> => {
  try {
      const response = await axios.get(`http://localhost:8000/tourist/filterProducts`, { params: filters });
      return response.data;
  } catch (error) {
      console.error("Error fetching filtered itineraries:", error);
      throw error;
  }
};

export const filterProductsAdmin = async (filters: {  
  budget?: number;
 
}): Promise<any[]> => {
  try {
      const response = await axios.get(`http://localhost:8000/admin/filterProducts`, { params: filters });
      return response.data;
  } catch (error) {
      console.error("Error fetching filtered itineraries:", error);
      throw error;
  }
};

// export const filterProductsSeller = async (filters: {  
//   budget?: number;
 
// }): Promise<any[]> => {
//   try {
//       const response = await axios.get(`http://localhost:8000/seller/filterProducts`, { params: filters });
//       return response.data;
//   } catch (error) {
//       console.error("Error fetching filtered itineraries:", error);
//       throw error;
//   }
// };

export const filterProductsSeller = async (filters: {  
  budget?: number;
  sellerId: string; // Seller ID is now required
}): Promise<any[]> => {
  try {
    // Include sellerId in the URL path and budget as a query parameter
    const response = await axios.get(`http://localhost:8000/seller/filterProducts/${filters.sellerId}`, {
      params: { budget: filters.budget },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};



export const getProductById = async (productId: string): Promise<any> => {
  try {
    // Make the GET request to fetch the product by ID
    const response = await axios.get(`http://localhost:8000/tourist/product/${productId}`); // Replace with your actual backend URL

    console.log('Product details fetched successfully:', response.data);
    return response.data; // Return the fetched product data
  } catch (error: any) {
    console.error('Error fetching product details:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch product details. Please try again.'
    );
  }
};

