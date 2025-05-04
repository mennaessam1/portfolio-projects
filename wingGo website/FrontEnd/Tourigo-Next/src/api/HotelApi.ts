import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';



const API_URL = 'http://localhost:8000/tourist';

interface DecodedToken {
  username: string;
  id: string;
  role: string;
  mustChangePassword: boolean;
}
interface HotelSearchParams {
    cityCode: string;
    checkin: string | null;
    checkout: string | null;
}



export const searchHotels = async (params: HotelSearchParams): Promise<any> => {
    try {
      const response = await axios.get<any>(`${API_URL}/searchHotelsByCity`, {
        params: {
          cityCode: params.cityCode,
          checkin: params.checkin,
          checkout: params.checkout,
        },
      });
      console.log('Hotel dataaaa:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching flight data:', error);
      throw error;
    }
  };

  export const bookHotel = async (hotelOffers: any, checkin:String, checkout: String, adults:Number, promocode: String, paymentMethod: String): Promise<any> => {
    try {
      const cookie = Cookies.get('token');

      let id = '';
      if(cookie){
        const decodedToken = jwtDecode<DecodedToken>(cookie);
        id = decodedToken.id;
        console.log('User ID:', id);
      }
      //67240ed8c40a7f3005a1d01d
      const response = await axios.post<any>(`${API_URL}/bookHotel/${id}`, {
        hotelOffers: hotelOffers,
        checkin: checkin,
        checkout: checkout,
        adults: adults,
        promocode: promocode,
        paymentMethod: paymentMethod
      });
      console.log('booking data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching flight data:', error);
      return error;
    }
  }

  export const searchHotelsByUserId = async (userId: string): Promise<any> => {

    const cookie = Cookies.get('token');

    let id = '';

    try {
      if(cookie){
        const decodedToken = jwtDecode<DecodedToken>(cookie);
        id = decodedToken.id
      }
      const response = await axios.get<any>(`${API_URL}/searchHotels/${id}`);
      console.log('search hotels data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching hotels:', error);
      return error;
    }
  };


  export const getPromoCodeDiscount = async (promoCode: string): Promise<any> => {
    try {
      const cookie = Cookies.get('token');

      let id = '';
      if(cookie){
        const decodedToken = jwtDecode<DecodedToken>(cookie);
        id = decodedToken.id;
        console.log('User ID:', id);
      }

      const response = await axios.get<any>(`${API_URL}/getPromoCode/${id}?code=${promoCode}`);
      //const response = await axios.get<any>(`${API_URL}/getPromoCode/67240ed8c40a7f3005a1d01d?code=${promoCode}`);
      console.log('Promo code discount data:', response.data);
      return response.data.promoCodeDetails;
    } catch (error) {
      console.error('Error fetching promo code discount:', error);
      throw error;
    }
  }