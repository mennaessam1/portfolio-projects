import axios from 'axios';
import {  Wishlist } from '../interFace/interFace';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; 
//const touristId = '673167d3aa67023ecc799397';

interface DecodedToken {
  username: string;
  id: string;
  role: string;
  mustChangePassword:boolean;
}

//router.get('/viewWishlist/:touristId', touristController.viewWishlist);

export const fetchWishlist= async (): Promise<Wishlist[]> => {
  const token = Cookies.get('token'); 
  console.log('ay 7aga');
   // Get the token from cookies
  if (!token) {
    throw new Error('User is not authenticated');
  }
    try {
      const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
      const touristId = decodedToken.id; 
      console.log('id confirmed',touristId);

        const response = await axios.get(`http://localhost:8000/tourist/viewWishlist/${touristId}`);
        console.log('Products fetched successfully:', response.data);
        return response.data.wishlistItems;
    } catch (error) {
        console.error("Error fetching Prods:", error);
        throw error;
    }
};

export const getProductById = async (productId: string): Promise<any> => {
    try {
      // Construct the API URL with the product ID
      const url = `http://localhost:8000/tourist/product/${productId}`;
  
      // Make the GET request
      const response = await axios.get(url);
  
      console.log('Product fetched successfully:', response.data);
      return response.data.product; // Return the product details
    } catch (error: any) {
      console.error('Error fetching product by ID:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'Failed to fetch the product. Please try again.'
      );
    }
  };

  //router.post('/wishlist/:touristId/:productId', touristController.addWishlist);
export const addItemtoWishlist = async(productId:any): Promise<any>=>{
  const token = Cookies.get('token'); // Get the token from cookies
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try{
    const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
    const touristId = decodedToken.id; 

    const url = `http://localhost:8000/tourist/wishlist/${touristId}/${productId}`;

    const response=await axios.post(url);
    console.log('Product added to wishlist successfully:', response.data.product);
    return response.data;
  } catch (error: any) {
    console.error("Error adding product to wishlist:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to add product to wishlist. Please try again."
    );
  }
};

//router.delete('/deleteWishlist/:touristId/:productId', touristController.removeWishlistItem);
export const removeFromWishlist = async (productId: string) => {
   const token = Cookies.get('token'); // Get the token from cookies
  if (!token) {
    throw new Error('User is not authenticated');
  }
  try{

    const decodedToken = jwtDecode<DecodedToken>(token); // Decode the token
    const touristId = decodedToken.id;
    const response = await axios.delete(
      `http://localhost:8000/tourist/deleteWishlist/${touristId}/${productId}` 
    );
    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error; // Throw error to handle it in the calling code
  }
};