"use client";

import { imageLoader } from '@/hooks/image-loader';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getPurchasedProducts } from '@/data/prod-data';
import { IPurchasedProduct } from '@/interFace/interFace';
import RateCommentModal from './RateCommentModal';
import { fetchProductImage } from '@/api/productApi';
import { useCurrency } from '@/contextApi/CurrencyContext';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  id: string;
  username: string;
  role: string;
  mustChangePassword: boolean;
}

const BookingHistory = () => {
  const [bookedProducts, setBookedProducts] = useState<IPurchasedProduct[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string | null }>({});
  const [selectedProduct, setSelectedProduct] = useState<IPurchasedProduct | null>(null);
  const [convertedPrices, setConvertedPrices] = useState<{ [key: string]: number }>({});
  const { currency, convertAmount } = useCurrency();
  const currentDate = new Date();

  // Decode JWT to get tourist ID
  const getTouristId = (): string | null => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.id || null;
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  };

  // Fetch purchased products
  useEffect(() => {
    const fetchData = async () => {
      const touristId = getTouristId();
      if (!touristId) {
        console.error("Tourist ID not found");
        return;
      }

      try {
        const data = await getPurchasedProducts(touristId);
        console.log("Fetched booked products:", data);
        setBookedProducts(data);
      } catch (error) {
        console.error("Failed to load booked products:", error);
      }
    };
    fetchData();
  }, []);

  // Load product images
  useEffect(() => {
    const loadImages = async () => {
      const urls: { [key: string]: string | null } = {};
      for (const product of bookedProducts) {
        if (product._id && product.picture) {
          try {
            const url = await fetchProductImage(product._id);
            urls[product._id] = url || null;
          } catch (error) {
            console.error("Failed to load image for product:", product._id, error);
            urls[product._id] = null;
          }
        }
      }
      setImageUrls(urls);
    };

    if (bookedProducts.length > 0) {
      loadImages();
    }
  }, [bookedProducts]);

  // Convert product prices
  useEffect(() => {
    const convertPrices = async () => {
      const newConvertedPrices: { [key: string]: number } = {};
      for (const product of bookedProducts) {
        if (product.price && product._id) {
          const convertedPrice = await convertAmount(product.price);
          newConvertedPrices[product._id!] = convertedPrice;
        }
      }
      setConvertedPrices(newConvertedPrices);
    };
    convertPrices();
  }, [currency, bookedProducts, convertAmount]);

  const handleRateCommentClick = (product: IPurchasedProduct) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <section className="bd-recent-activity section-space-small-bottom">
        <div className="container" style={{ paddingTop: "40px" }}>
          <div className="row">
            <div className="col-xxl-12">
              <div className="recent-activity-wrapper">
                <div className="section-title-wrapper section-title-space">
                  <h2 className="section-title">Product Purchased History</h2>
                </div>

                <div className="recent-activity-content">
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <tbody>
                        {bookedProducts.map((product) => (
                          <tr key={product._id} className="table-custom">
                            <td>
                              <div className="dashboard-thumb-wrapper p-relative">
                                <div className="dashboard-thumb image-hover-effect-two position-relative">
                                  {product._id && imageUrls[product._id] ? (
                                    <Image
                                      src={imageUrls[product._id]!}
                                      loader={imageLoader}
                                      alt="Product image"
                                      width={80}
                                      height={80}
                                      unoptimized
                                      style={{ objectFit: "cover", borderRadius: "4px" }}
                                    />
                                  ) : (
                                    <p>No Image for this product</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="recent-activity-title-box d-flex align-items-center gap-10">
                                <h5 className="product-title fw-5 underline">
                                  {product.name || 'No name available'}
                                </h5>
                              </div>
                            </td>
                            <td>
                              <div className="recent-activity-price-box">
                                <h5 className="mb-10">
                                  {currency} {convertedPrices[product._id!]?.toFixed(2) || 'N/A'}
                                </h5>
                                <p>Total</p>
                              </div>
                            </td>
                            <td>
                              <div>
                               
                                <button
                                  onClick={() => handleRateCommentClick(product)}
                                  className="bd-primary-btn btn-style radius-60 mb-10"
                                >
                                  Rate & Comment
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <RateCommentModal
          productId={selectedProduct._id || ''}
          touristId={getTouristId() || ''}
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default BookingHistory;
