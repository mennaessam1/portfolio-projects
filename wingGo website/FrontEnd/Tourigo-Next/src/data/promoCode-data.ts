// promoCode-data.ts

import { fetchAvailablePromoCodes } from "@/api/promocodesApi"; 
import { PromoCode } from "@/interFace/interFace";

// Fetch Promo Codes for Tourist
export const getPromoCodesData = async (): Promise<PromoCode[]> => {
    try {
        const promoCodes = await fetchAvailablePromoCodes();
        return promoCodes;
    } catch (error) {
        console.error("Error loading promo codes:", error);
        return [];
    }
};
