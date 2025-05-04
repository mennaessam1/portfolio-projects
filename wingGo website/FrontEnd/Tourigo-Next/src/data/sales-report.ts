import { fetchSalesReport } from '@/api/adminApi';
import { getSalesReport , getTouristReportofguide} from '@/api/TourGuideProfileApi';
import { getAdvertiserSalesReport,getTouristReportofAdvertiser } from '@/api/AdvertiserProfileApi'; // Import the advertiser API
import { getSellerSalesReport } from '@/api/SellerProfileApi'; // Import the seller API

import { SalesReport } from "@/interFace/interFace"; // Assuming interfaces are in this path
import { TourGuideSales, TouristReportOfGuide  } from "@/interFace/interFace"; // Assuming the interface is defined here
import { AdvertiserSales,TouristReportOfAdvertiser } from "@/interFace/interFace"; // Assuming the advertiser interface is defined here
import { SellerSales } from "@/interFace/interFace"; // Assuming the seller interface is defined here



export const loadSalesReportGuide = async (): Promise<TourGuideSales | null> => {
  try {
    // Fetch the sales report using the updated getSalesReport function
    const salesReport: TourGuideSales = await getSalesReport();
    return salesReport; // Return the fetched sales report data
  } catch (error) {
    console.error("Failed to load sales report:", error);
    // Return null or handle the error as needed
    return null;
  }
};


export const loadSalesReport = async (): Promise<SalesReport | null> => {
  try {
    const salesReport: SalesReport = await fetchSalesReport(); // Type-safe fetch
    return salesReport; // Return the sales report data
  } catch (error) {
    console.error("Failed to load sales report:", error);
    // Return null or handle error as needed
    return null;
  }
};

export const loadAdvertiserSalesReport = async (): Promise<AdvertiserSales | null> => {
  try {
    // Fetch the sales report for the Advertiser ID retrieved from the token
    const salesReport: AdvertiserSales = await getAdvertiserSalesReport();
    return salesReport; // Return the fetched sales report data
  } catch (error) {
    console.error("Failed to load advertiser sales report:", error);
    // Return null or handle the error as needed
    return null;
  }
};

export const loadSellerSalesReport = async (): Promise<SellerSales | null> => {
  try {
    // Fetch the sales report using the seller ID from the token
    const salesReport: SellerSales = await getSellerSalesReport();
    return salesReport; // Return the fetched sales report data
  } catch (error) {
    console.error("Failed to load seller sales report:", error);
    // Return null or handle the error as needed
    return null;
  }
};

export const loadTouristReportofguide = async (): Promise<TouristReportOfGuide | null> => {
  try {
    // Fetch the tourist report using the tour guide ID from the token
    const touristReport: TouristReportOfGuide = await getTouristReportofguide();
    return touristReport; // Return the fetched tourist report data
  } catch (error) {
    console.error("Failed to load tourist report:", error);
    // Return null or handle the error as needed
    return null;
  }
};


export const loadTouristReportofAdvertiser = async (): Promise<TouristReportOfAdvertiser | null> => {
  try {
    // Fetch the tourist report using the advertiser ID from the token
    const touristReport: TouristReportOfAdvertiser = await getTouristReportofAdvertiser();
    return touristReport; // Return the fetched tourist report data
  } catch (error) {
    console.error("Failed to load advertiser tourist report:", error);
    // Return null or handle the error as needed
    return null;
  }
};
