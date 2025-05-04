import { Product ,IPurchasedProduct} from '../interFace/interFace';

import { fetchAllProducts, fetchPurchasedProducts} from '@/api/productApi';

// const API_URL = 'http://localhost:8000/admin';

export const getProductData = async (): Promise<Product[]> => {
    try {
        const Product = await fetchAllProducts();
        return Product;
    } catch (error) {
        console.error("Error loading Prods:", error);
        return [];
    }
};


export const getPurchasedProducts = async (
    touristId: string
  ): Promise<IPurchasedProduct[]> => {
    try {
      const products = await fetchPurchasedProducts(touristId);
      return products;
    } catch (error) {
      console.error('Error fetching purchased products:', error);
      throw error;
    }
  };
