import { StaticImageData } from "next/image";
import React from "react";
// context api data type
export interface AppContextType {
  scrollDirection?: string;
  setScrollDirection?: React.Dispatch<React.SetStateAction<string>> | undefined;
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  niceSelectData: string | number;
  setNiceSelectData: React.Dispatch<React.SetStateAction<string | number>>;
  filterSearch: string;
  setFilterSearch: React.Dispatch<React.SetStateAction<string>>;
  modalId: number;
  setModalId: React.Dispatch<React.SetStateAction<number>>;
  toggleSideMenu: () => void;
  handleInfoSidebar: () => void;
  setIsOpenInfoSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenInfoSidebar: boolean;
  sideMenuOpen: boolean;
  setSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterRange: number[];
  setFilterRange: React.Dispatch<React.SetStateAction<number[]>>;
  setModalData: any;
  modalData: any;
}

export interface IhomeDemoPageDataType {
  id: number;
  img: StaticImageData;
  title: string;
  route: string;
  timeDelay: string;
  blurStyle: string;
}

export interface IhomeInnerPageDataType {
  id: number;
  img: StaticImageData;
  title: string;
  route: string;
}

export interface IhomeTopFeaturesDataType {
  id: number;
  img: StaticImageData;
  featureTitle: string;
  description: string;
  featureTag: string;
  timeDelay: string;
  hoverColor: string;
}

export interface IhomeReviewDataType {
  id: number;
  img: StaticImageData;
  title: string;
  description: string;
  info: string;
}

export interface IActivityDataType {
  id: number;
  img: StaticImageData;
  title: string;
  count?: number;
  rating?: string;
  delay?: string;
}

export interface ITourDataType {
  id: number;
  img: StaticImageData;
  tourLocation: string;
  tourTitle: string;
  tourRating?: string;
  tourRatingCount?: number;
  tourPrice?: number;
  days?: string;
  currentPrice?: string;
  oldPrice?: string;
  discount?: string;
  status?: string;
  fromPrice?: string;
  tourImage?: StaticImageData[];
  tourDuration: string;
  startDate?: string;
  endDate?: string;
  adult?: number;
  infant?: number;
  infantAge?: string;
  quantity?: number;
}

export interface IOfferDataType {
  id: number;
  img: StaticImageData;
  offerTitle: string;
  offerTitleTwo: string;
  offerSubTitle: string;
  desctiption: string;
}

export interface ITripDataType {
  id: number;
  title: string;
  description: string;
  img: StaticImageData;
  tripCount: number;
  tripLocation: string;
}

export interface ICounterDataType {
  id: number;
  icon?: string;
  counterNumber: number;
  counterTitle: string;
  description: string;
}
export interface IChooseDataType {
  id: number;
  icon: string;
  title: string;
  subTitle: string;
}
export interface ITestimonialDataType {
  id: number;
  avatarImg: StaticImageData;
  avatarTitle: string;
  info: string;
  description: string;
  rating?: number;
}

export interface IBlogDataType {
  id: number;
  img: StaticImageData;
  blogTag?: string;
  author: string;
  calender: string;
  detail: string;
  description?: string;
}

export interface ITravelDataType {
  id: number;
  travelIcon: string;
  travelTitle: string;
}

export interface IChooseUsDataType {
  id: number;
  choseIcon: string;
  chooseTitle: string;
  chooseDesc: string;
  delay: string;
}
export interface IDestinationDataType {
  id: number;
  img: StaticImageData;
  destination: string;
  tourCount?: number;
  title?: string;
  delay?: string;
}

export interface TNiceSelectData {
  id: number;
  option: string;
}

export interface IHomeTwoSliderData {
  id: number;
  bgImg: StaticImageData;
  tagOne: string;
  tagTwo: string;
  tagThree: string;
  description: string;
}

export interface ITeamDataType {
  id: number;
  img: StaticImageData;
  name: string;
  title: string;
}

export interface IDayTourDataType {
  id: number;
  img: StaticImageData;
  tourTitle: string;
  tourLocation: string;
  tourTime: number;
  description: string;
}

export interface IInstagramData {
  id: number;
  img: StaticImageData;
}

export interface IBannerData {
  id: number;
  img: StaticImageData;
  subTitle: string;
  title: string;
  description: string;
  warningText: string;
}

export interface PopularActivity {
  id: string;
  title: string;
  icon: string;
  image: StaticImageData;
  linkTitle: string;
  description: string;
  clients: StaticImageData[];
  clientCount: string;
}
export interface IClientReviewData {
  id: number;
  img: StaticImageData;
  name: string;
  date: string;
  description: string;
}

export interface IContactData {
  id: number;
  title: string;
  subTitleOne: string;
  subTitleTwo: string;
}

export interface IBlogDataTypedemo {
  id: number;
  img: StaticImageData;
  smallImg: StaticImageData;
  largeImg: StaticImageData;
  isModal?: boolean;
  date: number;
  month: string;
  author: string;
  comment: number;
  blogTitle: string;
  details: string;
}

// pricing data
interface PricingItem {
  person: number;
  duration: string;
  dinner: string;
  lunch: string;
  travelSpot: number;
}

export interface IPricingPlan {
  id: number;
  class?: string;
  img: StaticImageData;
  plan: string;
  price: number;
  pricingContent: PricingItem;
}

export interface IFaqInterface {
  id: string;
  question: string;
  answer: string;
}

export interface ProductsType {
  id: number;
  title: string;
  rating?: number;
  price: number;
  image: StaticImageData;
  imageTwo?: StaticImageData;
  quantity: number;
  label?: string;
  discount?: number;
  labelColor?: string;
  totalCart?: number;
  shiping?: number;
  averageRating?:number
}
// menu data type
// menu-data type
export interface MenuType {
  id: number;
  hasDropdown?: boolean;
  megaMenu?: boolean;
  lastDropdown?: boolean;
  active?: boolean;
  children?: boolean;
  title: string;
  pluseIncon?: boolean;
  link: string;
  previewImg?: boolean;
  pageLayout?: boolean;
  submenus?: any[];
  pages?: boolean;
}

//dashboard card data
export interface IDashCardDataType {
  id: number;
  subTitle: string;
  price: number;
  priceState: string;
}

//dashboard recent activity data
export interface IDashRecentActivityType {
  id: number;
  img: StaticImageData;
  day: string;
  month: string;
  title: string;
  location: string;
  adult: number;
  infant?: number;
  price: number;
  tripId: string;
  tripDate: string;
}

// files

export interface File {
  src: string;
  name: string;
  size: string;
}

export interface idType {
  id: number;
}
export interface idTypeNew {
  id: string;
}


export interface Itinerary {
  _id: string;
  tourGuideId: string;
  title: string;
  tags: string[];
  activities: string;
  locations: string[];
  timeline: string;
  duration: string;
  language: string;
  price: number;
  availableDates: Date[];
  accessibility: boolean;
  pickupLocation: string;
  dropoffLocation: string;
  bookings: number;
  ratings: number[];
  averageRating: number;
  comment: {
      tourist: string;
      text: string;
  }[];
  bookingOpen: boolean;
  flagged: boolean;
  deactivated: boolean;
  touristIDs: {
      touristId: string;
      bookingDate: Date;
  }[];
  photo: string;
}

export interface BookedItinerary {
  itinerary: Itinerary;
  bookingDate: Date;
}


export interface Activity {
  _id: string;
  name: string;
  img: StaticImageData;
  date: string;
  time: string;
  location: string;
  price: number;
  category: string;
  tags?: string[];
  specialDiscounts?: string;
  bookingOpen?: boolean;
  advertiser: string; // Referencing an ObjectId for the advertiser
  ratings: {
    touristId: string; // Referencing an ObjectId for the tourist
    rating: number;
  }[];
  comments: {
    touristId: string; // Referencing an ObjectId for the tourist
    comment: string;
  }[];
  flagged?: boolean;
  touristIDs?: string[]; // Array of tourist ObjectIds
  averageRating:number;
  photo: string;
  description:string;
  [key: string]: any;
}

export interface BookedActivity {
  activity: Activity;
 
}



  export interface Place {
    _id: string;
    governorId: string;
    name: string;
    description: string;
    pictures: string[];// Array of image URLs
    location: string;
    openingHours: string;
    ticketPrices:{
      foreigner: number;
      native: number;
      student: number;
  };
    flagged: boolean;
    tagss: string[];
    photo:string
};

export interface Wishlist {
  _id: string; 
  touristId: string; 
  productId: string; 
  addedDate: Date; 
};


export interface Product {
  _id?: string;
  name: string;
  image: StaticImageData;
  imageTwo?: StaticImageData;
  price: number;
  description: string;
  quantity: number;
  sales: number;
  seller?: string | null;
  sellerID?: string; // Add this line
  purchaseDate: string; // Add purchaseDate property
  ratings: {
    touristId: string; // Referencing an ObjectId for the tourist
    rating: number;
  }[];
  reviews: {
    touristId: string; // Referencing an ObjectId for the tourist
    review: string;
  }[];
  archive: boolean;
  createdAt?: string;
  updatedAt?: string;
  averageRating: number; // Add this line,
  picture: string;
}

export interface Complaint{
 
    _id: string;
    title: string;
    body: string;
    date: Date;
    tourist: string; // ObjectId as a string referencing a Tourist
    state: 'pending' | 'resolved';
    reply: string[];

  }
  export interface IPendingUser {
    _id: string;               // MongoDB automatically generates an _id field
    email: string;
    username: string;
    password: string;
    role: string;
    IDdocument: string;
    certificate: string;
   
}

export interface Transport{
  _id: string;
  type: string;
  duration: string;
  price: number;
  city: string;
  touristID: string;
}


// interfaces/TourGuide.ts

export interface TourGuide {
  _id: string;
  email: string;
  username: string;
  password: string;
  mobileNumber?: string;
  yearsOfExperience?: number;
  previousWork?: string;
  isCreatedProfile?: number;
  photo?: string;
  termsAccepted: boolean;
  ratings: number[];
  averageRating: number;
  comment: { 
    tourist: string;
    text: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ActivitySales {
  name: string;
  sales: number;
  revenue?: number | null;
  appRevenue?: number | null;
}

export interface ItinerarySales {
  name: string;
  sales: number;
  revenue?: number | null;
  appRevenue?: number | null;
}

export interface ProductSales {
  name: string;
  sales: number;
  revenue: number | null;
  appRevenue: number | null;
}
export interface SalesReport {
  success: boolean;
  data: {
    activities: {
      details: {
        name: string;
        sales: number;
        revenue: number | null;
        appRevenue: number | null;
        soldDate: string; // Added soldDate for activities
      }[];
      totalSales: number;
      totalRevenue: number | null;
      totalAppRevenue: number | null;
    };
    itineraries: {
      details: {
        name: string;
        sales: number;
        revenue: number | null;
        appRevenue: number | null;
        soldDates: string[]; // Added soldDates for itineraries
      }[];
      totalSales: number;
      totalRevenue: number | null;
      totalAppRevenue: number | null;
    };
    products: {
      details: {
        name: string;
        sales: number;
        revenue: number | null;
        appRevenue: number | null;
        sellingDates: string[]; // Added sellingDates for products
      }[];
      totalSales: number;
      totalRevenue: number | null;
    };
    totals: {
      totalSales: number;
      totalRevenue: number | null;
      totalAppRevenue: number | null;
    };
  };
}


export interface Cart {
  _id: string;
  productId:string;
  touristId:string;
  amount: number;
  price: number;
  name:string;
}
             
export interface Notification {
  _id: string;
  message: string;
  date: string;
  eventId?: string; // Optional for event-related notifications
  itineraryId?: string; // Optional for itinerary-related notifications
}


export interface Order {
  _id: string; 
  orderId: string;
  products: {
    productId: string | Omit<Product, 'image' | 'imageTwo'>; 
    quantity: number; 
  }[];
  paymentStatus: 'notPaid' | 'paid'; 
  orderStatus: 'cancelled' | 'confirmed' | 'preparing' | 'delivering' | 'delivered';
  buyer: string; 
  totalPrice: number;
  paymentMethod:String; 
}

export interface TourGuideSales {
  success: boolean;
  data: {
    itineraries: {
      details: {
        name: string;
        sales: number;
        revenue: number | null;
        soldDates: string[]; // Array of sold dates
      }[];
      totalSales: number;
      totalRevenue: number | null;
    };
    totals: {
      totalSales: number;
      totalRevenue: number | null;
    };
  };
}
export interface AdvertiserSales {
  success: boolean;
  data: {
    activities: {
      details: {
        name: string;
        sales: number;
        revenue: number;
        soldDate: string; // Date of sale
      }[];
      totalSales: number; // Total number of sales across activities
      totalRevenue: number; // Total revenue across activities
    };
    totals: {
      totalSales: number; // Overall total sales
      totalRevenue: number; // Overall total revenue
    };
  };
}

export interface SellerSales {
  success: boolean;
  data: {
    products: {
      details: {
        name: string; // Name of the product
        sales: number; // Number of sales for the product
        revenue: number; // Revenue generated by the product
        sellingDates: string[]; // Array of selling dates
      }[];
      totalSales: number; // Total sales for all products
      totalRevenue: number; // Total revenue for all products
    };
    totals: {
      totalSales: number; // Overall total sales
      totalRevenue: number; // Overall total revenue
    };
  };
}

export interface TouristReportOfGuide {
  success: boolean;
  data: {
    itineraries: {
      details: {
        name: string; // Name of the itinerary
        totalTourists: number; // Total number of tourists for this itinerary
        details: {
          touristId: string; // ID of the tourist
          bookingDate: string; // Booking date in ISO format
          numberOfPeople: number; // Number of people in the booking
        }[]; // Array of tourist booking details
      }[];
      totalTourists: number; // Total number of tourists across all itineraries
    };
  };
}
export interface TouristReportOfAdvertiser {
  success: boolean;
  data: {
    activities: {
      details: {
        name: string; // Name of the activity
        soldDate: string; // Date of the activity sale
        totalTourists: number; // Total number of tourists for this activity
        details: {
          numberOfPeople: number; // Number of people in a specific booking
          soldDate: string; // Date of the sale for this specific booking
        }[]; // Array of detailed bookings
      }[];
      totalTourists: number; // Total number of tourists across all activities
    };
  };
}
export interface CustomFile extends Blob {
  name: string;
  lastModified: number;
  webkitRelativePath?: string;
  src?: string;  // If you need a `src` property
}

export interface PromoCode {
  _id: string; 
  code: string; 
  discount: number; 
  startDate: string; 
  endDate: string; 
  isActive: boolean; 
  description?: string; 
  touristId: string; 

}

export interface IPurchasedProduct {
  _id: string;
  name: string;
  price: number;
  picture: string;
  description: string;
  ratings?: number[];
  reviews?: string[];
  archive?: boolean;
  averageRating?: number;
  image?: string;         // Add missing image field
  quantity?: number;      // Optional quantity field
  sales?: number;         // Optional sales field
  purchaseDate?: string;  // Add missing purchaseDate field
}


export interface IProductRating {
  touristId: string;   // ID of the tourist who rated
  rating: number;      // Rating given by the tourist
}




