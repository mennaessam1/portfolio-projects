// Updated ProductDetailsSection.tsx

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Controller, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Product } from "@/interFace/interFace";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getProductData } from "@/data/prod-data";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import { ToastContainer, toast } from "react-toastify";
import { cart_product, decrease_quantity } from "@/redux/slices/cartSliceproduct";
import { imageLoader } from "@/hooks/image-loader";
import ReviewComments from "./ReviewComments"; 
import StarRating from "@/components/Products/StarRating"; 
import { fetchSellerData, purchaseProduct, editProduct,fetchProductImage } from "@/api/productApi"; 
import { calculateAverageRating } from "@/utils/utils"; 
import { useCurrency } from "@/contextApi/CurrencyContext"; // Import currency context
import { addToCart } from "@/api/cartApi";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;  // Corresponds to the `sellerId` in the token
  username: string;
  role: string;
  mustChangePassword: boolean;
}



const ProductDetailsSection = ({ id, userRole }: { id: string; userRole: string }) => {
  // const touristId = "672a3a4001589d5085322e88";
  // const hardcodedSellerId = "67158afc7b1ec4bfb0240575"; // Hardcoded sellerId for now unt
  const [touristId, setTouristId] = useState<string | null>(null);
const [sellerId, setSellerId] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [item, setItem] = useState<Product | null>(null);
  const [sellerName, setSellerName] = useState<string | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const { currency, convertAmount } = useCurrency(); // Access currency and conversion function
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null); // State for converted price
  
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      if (decodedToken.role === "Tourist") {
        setTouristId(decodedToken.id); // Extract and set `touristId`
      } else if (decodedToken.role === "Seller") {
        setSellerId(decodedToken.id); // Extract and set `sellerId`
      }
      console.log("Decoded Seller ID: ", decodedToken.id);
      console.log("Decoded Role: ", decodedToken.role);
      

    } else {
      console.error("No token found. Please log in.");
    }
  }, []);
  useEffect(() => {
    console.log("Updated Seller ID State: ", sellerId);
    console.log("Updated Tourist ID State: ", touristId);
  }, [sellerId, touristId]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching product data...");
        const products = await getProductData();
        const product = products.find((item) => item._id === id);
        setItem(product || null);

        if (product && product._id) {
          console.log(`Fetching image for product ID: ${product._id}`);
          const imageUrl = await fetchProductImage(product._id);
          console.log("Fetched Image URL:", imageUrl);
          setProductImageUrl(imageUrl);
        } else {
          console.warn("Product not found or missing ID");
        }
      } catch (err) {
        console.error("Error fetching product or image data:", err);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    const convertProductPrice = async () => {
      if (item?.price) {
        const priceInSelectedCurrency = await convertAmount(item.price); // Convert price
        setConvertedPrice(priceInSelectedCurrency); // Store converted price
      }
    };
    convertProductPrice();
  }, [currency, item, convertAmount]); // Re-run if currency or item changes

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const dispatch = useDispatch();

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData.name && !editData.price && !editData.quantity && !editData.description && !imageFile) {
      toast.error("Please enter at least one field to update.");
      return;
    }
    try {
      if (item?._id) {
        await editProduct(item._id, editData, imageFile || undefined);
        toast.success("Product updated successfully!");
        setEditModalOpen(false);
        const updatedProduct = await getProductData();
        setItem(updatedProduct.find((prod) => prod._id === item._id) || null);
      }
    } catch (error) {
      toast.error("Failed to update product.");
      console.error("Error updating product:", error);
    }
  };

  const img = item?.image;
  const shopProducts = [{ id: 1, imgData: img }];
  const averageRating = item ? calculateAverageRating(item.ratings) : 0;
  const numberOfReviews = item ? item.reviews.length : 0;

  const handlePurchase = async () => {
    if (item?._id && touristId) {
      try {
        const response = await purchaseProduct(touristId, item._id);
        toast.success("Product purchased successfully!");
        dispatch(decrease_quantity(item)); 
      } catch (error) {
        toast.error("Failed to purchase item.");
        console.error("Error during purchase:", error);
      }
    }
  };
  
  const handleAddToCart = async () => {
  
    try {
      addToCart(item?._id);
      
      alert("Product added to cart successfully!");
    } catch (error: any) {
      alert(error.message || "Failed to add product to cart. Please try again.");
    }
  };

  // Adding the `return` statement to return JSX
  return (
    <>
       <div className="row gy-24 justify-content-between">
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="product-details-thumb-wrap">
            <div className="product-details-thumb-top mb-24">
              {productImageUrl ? (
                <Image
                  src={productImageUrl}
                  alt="Product Image"
                  width={500} // Adjust width as needed
                  height={500} // Adjust height as needed
                  unoptimized
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              ) : (
                <p>No image for this product...</p>
              )}
            </div>
          </div>
        </div>

        {item?._id && (
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="product-details-wrapper">
              <h2 className="product-details-title small mb-10">
              {(userRole === "Admin" || (userRole === "Seller" && item?.sellerID === sellerId)) && (
  <button
    onClick={() => setEditModalOpen(true)}
    className="edit-circle-btn"
    style={{ position: 'relative', top: '-5px' }}
  >
    <i className="fa fa-pen" />
  </button>
)}

                {item?.name}
              </h2>
              <div className="product-details-rating d-flex align-items-center mb-15">
                <div className="product-rating">
                  <StarRating rating={averageRating} />
                </div>
                <div className="product-details-rating-count ml-10">
                  <span>{numberOfReviews} {numberOfReviews === 1 ? "review" : "reviews"}</span>
                </div>
              </div>
              <div className="product-details-info mb-10">
                <p>Description:</p>
                <span>{item.description}</span>
              </div>
              <div className="product-details-price mb-10">
                <h4 className="product-details-ammount">
                  {userRole === "Tourist"
                    ? `${currency} ${convertedPrice !== null ? convertedPrice.toFixed(2) : "Loading..."}`
                    : `EUR ${item?.price !== undefined ? item.price.toFixed(2) : "Loading..."}`}
                </h4>
              </div>
              <div className="product-details-info mb-10">
                <p>Seller:</p>
                <span>{item.seller}</span>
              </div>
              {userRole !== "Tourist" && (
                <div className="product-details-info mb-10">
                  <p>Available Quantity:</p>
                  <span>{item.quantity}</span>
                </div>
              )}
              {userRole !== "Tourist" && (
                <div className="product-details-info mb-10">
                  <p>Sales:</p>
                  <span>{item.sales}</span>
                </div>
              )}
              {userRole === "Tourist" && (
                <div className="product-details-count-wrap d-flex flex-wrap gap-10 align-items-center">
                  <button className="bd-primary-btn btn-style radius-60" onClick={()=>handleAddToCart()}>
                    <span className="bd-primary-btn-text">Add To Cart</span>
                    <span className="bd-primary-btn-circle"></span>
                  </button>
                </div>  
                  

              )}
            </div>
          </div>
        )}
        <h2>Reviews</h2>
        {item && <ReviewComments product={item} />}

        {isEditModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setEditModalOpen(false)}>&times;</span>
              <h2>Edit Product</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <input type="number" onChange={(e) => setEditData((prev) => ({ ...prev, price: parseFloat(e.target.value) }))} />
                </div>
                <div className="form-group">
                  <label>Quantity:</label>
                  <input type="number" onChange={(e) => setEditData((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))} />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <input type="text" onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Image:</label>
                  <input type="file" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />

      <style jsx>{`
        .edit-circle-btn {
          background-color: #007bff;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-right: 10px;
        }

        .edit-circle-btn i {
          font-size: 0.9rem;
        }

        .edit-circle-btn:hover {
          transform: scale(1.15);
          box-shadow: 0 8px 15px rgba(0, 123, 255, 0.5);
        }

        .modal {
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal-content {
          background-color: #fff;
          padding: 20px;
          width: 400px;
          border-radius: 5px;
          position: relative;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 18px;
          cursor: pointer;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .form-group input[type="text"],
        .form-group input[type="number"],
        .form-group input[type="file"] {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .btn-primary {
          background-color: blue;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default ProductDetailsSection;