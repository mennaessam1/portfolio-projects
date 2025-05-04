import { fetchTouristOrders,fetchOrderDetails,fetchCancelOrder } from '@/api/ordersApi'; 
import{Order}from'../interFace/interFace';

// Function to fetch all orders for a tourist
export const getOrdersDataTourist = async (): Promise<Order[]> => {
  try {
    const orders = await fetchTouristOrders();
    return orders;
  } catch (error) {
    console.error("Error loading orders:", error);
    return [];
  }
};

export const getOrdersData=async(orderId: string):Promise<Order[]>=>{
    try{
        const orders=await fetchOrderDetails(orderId);
        return orders;
    }catch(error){
        console.error("Error loading orders:",error);
        return[];
    }
};
// Function to cancel an order
// // Function to cancel an order
// export const cancelOrder = async (touristId: string, orderId: string): Promise<Order> => {
//     try {
//       const order = await fetchCancelOrder(touristId, orderId);
//       return order;
//     } catch (error) {
//       console.error("Error canceling order:", error);
//       throw error; // Re-throw the error for the calling function to handle
//     }
//   };
export const cancelOrderData = async (touristId: string, orderId: string): Promise<{ message: string; order: any } | null> => {
    try {
      const response = await fetchCancelOrder( orderId);
      return response;
    } catch (error) {
      console.error('Error canceling order:', error);
      return null; // Return null to indicate failure
    }
  };
  