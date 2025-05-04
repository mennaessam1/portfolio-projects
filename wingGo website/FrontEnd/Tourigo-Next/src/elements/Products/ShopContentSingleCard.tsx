//ShopContentSingleCard.tsx
"use client";
import useGlobalContext from "@/hooks/use-context";
import { Product } from "@/interFace/interFace";
import { useAppDispatch } from "@/redux/hooks";
import { cart_product } from "@/redux/slices/cartSliceproduct";
import { wishlist_product } from "@/redux/slices/wishlistSliceproduct";
import { toast } from "sonner";// Import the CSS for styling

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import StarRating from "@/components/Products/StarRating";
import { calculateAverageRating } from "@/utils/utils"; // Adjust the import path as necessary
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ArchiveUnarchiveProduct, ArchiveUnarchiveProductAdmin, fetchProductImage } from "@/api/productApi";
import { useCurrency } from "@/contextApi/CurrencyContext"; // Import the currency con

import { addToCart } from "@/api/cartApi";
import {addItemtoWishlist} from '@/api/wishlistApi';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;  // Corresponds to the `sellerId` in the token
  username: string;
  role: string;
  mustChangePassword: boolean;
}



interface propsType {
  item: Product;
  classItem: string;
  userRole: "Tourist" | "Admin" | "Seller"; // Add userRole prop
}

const ShopContentSingleCard = ({ item, classItem, userRole }: propsType) => {
  const { setModalData } = useGlobalContext();
  const [isHovered, setIsHovered] = useState(false);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // const hardcodedSellerId = "67158afc7b1ec4bfb0240575"; // Hardcoded sellerId for now till the login
  const { currency } = useCurrency(); // Access the current currency from context
  
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setSellerId(decodedToken.id); // Extract and set sellerId
      console.log("Seller ID from token: ", decodedToken.id);
      console.log("user role: ",userRole)
    } else {
      console.error("No token found. Please log in.");
    }
  
    const loadImage = async () => {
      try {
        if (item._id && item.picture) {
          const url = await fetchProductImage(item._id);
          if (url) {
            setImageUrl(url);
          }
        }
      } catch (error) {
        console.error("Failed to load image:", error);
      }
    };
    loadImage();
  }, [item._id, item.picture]);
  

  const handleAddToCart = async () => {
  
    try {
      addToCart(item._id);
      
      alert("Product added to cart successfully!");
    } catch (error: any) {
      alert(error.message || "Failed to add product to cart. Please try again.");
    }
  };

  const handleAddToWishlist = async () => {
    try{
      addItemtoWishlist(item._id);
      alert("Product added to wishlist successfully!");
    } catch(error:any){
      alert(error.message || "Failed to add product to wishlist. Please try again");
    }
  };

  const handleEyeClick = async () => {
    const token = Cookies.get("token");
  
    let sellerId = "";
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      sellerId = decodedToken.id; // Extract the seller ID from the token
    } else {
      console.error("No token found. Please log in.");
      return;
    }
  
    const toastId = toast.loading("Processing your Request...");
  
    try {
      if (item._id) {
        let response;
  
        if (userRole === "Seller" && sellerId) {
          console.log("Seller ID from token: ", sellerId);
          response = await ArchiveUnarchiveProduct(item._id, sellerId, !item.archive);
        } else if (userRole === "Admin") {
          response = await ArchiveUnarchiveProductAdmin(item._id, !item.archive);
        }
  
        console.log("Item archive state: ", response.archive);
  
        if (response) {
          item.archive = response.archive;
          if (item.archive) {
            toast.success("Item archived successfully!", { id: toastId });
          } else {
            toast.success("Item unarchived successfully!", { id: toastId });
          }
        }
      } else {
        console.error("Error: item._id is undefined");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to archive/unarchive item.");
    }
  };
  
  

  // Calculate the average rating
  const averageRating = calculateAverageRating(item.ratings);

  return (
    <>
      <div className={classItem}>
        <div className="product-wrapper">
          <div className="product-image-wrapper image-hover-effect">
            <Link href={`/Product-details/${item._id}/${userRole}`} className="product-image">
              <div className="product-image-one">
                {imageUrl ? (
                  <Image 
                    src={imageUrl} 
                    alt="Product image" 
                    width={270} 
                    height={270} 
                    unoptimized 
                    style={{ objectFit: "cover" }} // Apply objectFit directly for Next.js Image
                  />
                ) : (
                  <p>No image for this product...</p>
                )}
              </div>
              <div className="product-image-two">
                {item.imageTwo && <Image src={item.imageTwo} alt="Secondary image" width={300} height={300} />}
              </div>
            </Link>
            <div className="product-links">
              <ul>
                <li>
                  <button onClick={() => handleAddToCart()}>
                    <i className="far fa-cart-plus"></i>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleAddToWishlist()}>
                    <i className="fa fa-heart"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="product-content">
          {(userRole === "Admin" || (userRole === "Seller" && item.seller === sellerId)) && (
              <div
                onClick={handleEyeClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: "pointer" }}
              >
                 {item.archive ? <FaEyeSlash /> : <FaEye />}
                {/* {isHovered && item.archive ? <FaEye /> : <FaEyeSlash />} */}
              </div>
            )}
            <div className="product-rating">
              <StarRating rating={averageRating} />
            </div>
            <h5 className="product-title underline custom_mb-5">
              <Link href={`/Product-details/${item._id}/${userRole}`}>
                {item.name}
              </Link>
            </h5>
            <div className="product-price text-black">
              {userRole === "Tourist" ? (
                <>
                 {currency} {item.price ? item.price.toFixed(2) : "Loading..."}
                </>
              ) : (
                <>
                  EUR {item.price ? item.price.toFixed(2) : "Loading..."}
                </>
              )}
            </div>
          </div>
        </div>
       
      </div>

      <style jsx>{`
        .product-image-one {
          width: 300px; /* Set the fixed width */
          height: 300px; /* Set the fixed height */
          overflow: hidden; /* Ensures that overflowing parts of images are hidden */
          position: relative; /* Required for the Next.js Image component */
        }

        .product-image-one :global(img) {
          object-fit: cover; /* Crop the image to fit within the container */
          width: 100%; /* Ensure it fills the container width */
          height: 100%; /* Ensure it fills the container height */
        }
      `}</style>
    </>
  );
};

export default ShopContentSingleCard;
