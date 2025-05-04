import axios from 'axios';
import { Cart} from '../interFace/interFace';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
//const touristId='673167d3aa67023ecc799397'

interface DecodedToken {
  id: string;  // Extract user ID from the token
  role: string;
  username: string;
  mustChangePassword: boolean;
}
export const fetchCartItems = async (): Promise<Cart[]> => {
  const token = Cookies.get('token');
  let touristId = "";
    try {
      if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded Token:", decodedToken);
    touristId = decodedToken.id;  // Extract governorId from the token
      } else {
    throw new Error("No token found. Please log in.");
        }
      const response = await axios.get(`http://localhost:8000/tourist/cartItems/${touristId}`);
      return response.data; // Assuming the response contains an 'items' array
  } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
  }
}

export const updateCartItemAmount = async (cartItemId: string, amount: number) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/tourist/updateAmountInCart/${cartItemId}`, // Replace with your actual backend URL
      { amount } // Payload for the API
    );
    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error updating cart item amount:', error);
    throw error; // Throw error to handle it in the calling code
  }
};
export const removeFromCart = async (productId: string) => {
  const token = Cookies.get('token');
  let touristId = "";
    try {
      if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded Token:", decodedToken);
    touristId = decodedToken.id;  // Extract governorId from the token
      } else {
    throw new Error("No token found. Please log in.");
        }
    const response = await axios.delete(
      `http://localhost:8000/tourist/cart/${touristId}/${productId}` // Replace with your actual backend URL
    );
    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error; // Throw error to handle it in the calling code
  }
};

export const addToCart = async (productId: any): Promise<any> => {
  const token = Cookies.get('token');
  let touristId = "";
    try {
      if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded Token:", decodedToken);
    touristId = decodedToken.id;  // Extract governorId from the token
      } else {
    throw new Error("No token found. Please log in.");
        }
  
    const response = await axios.post(
      `http://localhost:8000/tourist/cart/${touristId}/${productId}` // Update with your actual backend URL
    );
    console.log("Product added to cart:", response.data.cartItem);
    return response.data.cartItem; // Return the added cart item
  } catch (error: any) {
    console.error("Error adding product to cart:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to add product to cart. Please try again."
    );
  }
};

// Define the createOrder API call
export const createOrder = async (buyerId: string): Promise<{ order: any; orderId: string }> => {
  try {
    // API payload
    const payload = {
      buyerId, // Pass the buyer ID dynamically
    };

    // Make the POST request to create the order
    const response = await axios.post(
      'http://localhost:8000/order/add', // Replace with the actual backend URL
      payload
    );

    console.log('Order created successfully:', response.data);
    return response.data; // Return the created order data
  } catch (error: any) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to create order. Please try again.'
    );
  }
};

///////////////////////////////////////////////////////////Order APIs

// Define the getOrderDetails API call
export const getOrderDetails = async (orderId:string|null): Promise<{ products: any[]; totalPrice: number }> => {
  try {
    // Make the GET request to fetch the order details
    const response = await axios.get(`http://localhost:8000/order/get/${orderId}`); // Replace with the actual backend URL

    console.log('Order details fetched successfully:', response.data);
    return response.data; // Return the fetched order data
  } catch (error: any) {
    console.error('Error fetching order details:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch order details. Please try again.'
    );
  }
};
export const fetchCartTotalPrice = async (
  promoCode?: string | null
): Promise<{ totalPrice: number; discount: number }> => {
 
  const token = Cookies.get('token');
  let touristId = "";
    try {
      if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded Token:", decodedToken);
    touristId = decodedToken.id;  // Extract governorId from the token
      } else {
    throw new Error("No token found. Please log in.");
        }
    // Construct the API URL with query parameters
    const url = `http://localhost:8000/tourist/cartItemsPrice/${touristId}`;
    const response = await axios.get(url, {
      params: { promoCode }, // Pass promoCode as a query parameter
    });

    console.log('Cart total price fetched successfully:', response.data);
    return response.data; // Return total price and discount details
  } catch (error: any) {
    console.error('Error fetching cart total price:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch cart total price. Please try again.'
    );
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

export const getDiscountByCode = async (promoCode: string): Promise<number> => {
  try {
    // Construct the API URL with the promo code
    const url = `http://localhost:8000/tourist/getDiscount/${promoCode}`;

    // Make the GET request
    const response = await axios.get(url);

    console.log('Promo code discount fetched successfully:', response.data);
    return response.data.discount; // Return the discount
  } catch (error: any) {
    console.error('Error fetching discount by promo code:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch the promo code discount. Please try again.'
    );
  }
};


export const addDeliveryAddresses = async (
  addresses: string[]
): Promise<{
  message: string;
  addedAddresses: string[];
  deliveryAddresses: string[];
}> => {
 
  const token = Cookies.get('token');
  let touristId = "";
    try {
      if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded Token:", decodedToken);
    touristId = decodedToken.id;  // Extract governorId from the token
      } else {
    throw new Error("No token found. Please log in.");
        }
    // API endpoint
    const url = `http://localhost:8000/tourist/addDeliveryAddress/${touristId}`;

    // Make a POST request to add addresses
    const response = await axios.post(url, { addresses });

    console.log('Addresses added successfully:', response.data);
    return response.data; // Return response containing success message and updated addresses
  } catch (error: any) {
    console.error('Error adding delivery addresses:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to add delivery addresses. Please try again.'
    );
  }
};

export const fetchDeliveryAddresses = async (): Promise<string[]> => {
  
  const token = Cookies.get('token');
  let touristId = "";
    try {
      if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded Token:", decodedToken);
    touristId = decodedToken.id;  // Extract governorId from the token
      } else {
    throw new Error("No token found. Please log in.");
        }
    // API endpoint
    const url = `http://localhost:8000/tourist/deliveryAddresses/${touristId}`;

    // Make a GET request to fetch the delivery addresses
    const response = await axios.get(url);

    console.log("Delivery addresses fetched successfully:", response.data);
    return response.data.deliveryAddresses; // Return the array of delivery addresses
  } catch (error: any) {
    console.error("Error fetching delivery addresses:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to fetch delivery addresses. Please try again."
    );
  }
};

export const payForOrder = async (
  orderId: string |null, 
  paymentMethod: string, 
  promoCode: string | null = null
): Promise<any> => {
  try {
    const response = await axios.put(
      `http://localhost:8000/tourist/pay/${orderId}`,
      { paymentMethod, promoCode }
    );

    console.log('Order payment successful:', response.data);
    return response.data; // Return API response
  } catch (error: any) {
    console.error('Error processing payment:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 'Failed to process payment. Please try again.'
    );
  }
};