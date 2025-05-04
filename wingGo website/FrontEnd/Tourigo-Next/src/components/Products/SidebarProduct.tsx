import { getProductData } from '@/data/prod-data';
import { Product } from '@/interFace/interFace';
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { fetchProductImage } from '@/api/productApi';

const SidebarProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [imageUrls, setImageUrls] = useState<{ [key: string]: string | null }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProductData();
            setProducts(data || []); // Fallback to an empty array if data is undefined
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const loadImages = async () => {
            const urls: { [key: string]: string | null } = {};
            for (const item of products) {
                if (item._id && item.picture) { // Check if the item has an image
                    try {
                        const url = await fetchProductImage(item._id);
                        urls[item._id] = url || null; // Store URL or null if no URL is found
                    } catch (error) {
                        console.error("Failed to load image for item:", item._id, error);
                        urls[item._id] = null;
                    }
                }
            }
            setImageUrls(urls);
        };
        if (products.length > 0) {
            loadImages();
        }
    }, [products]);

    return (
        <>
            <div className="sidebar-widget-post">
                {
                    products.map((item) => (
                        <div className="best-sell-post" key={item._id}>
                            <div className="best-sell-post-thumb mr-10">
                                <Link href={`/shop-details/${item._id}`}>
                                    {item._id && imageUrls[item._id] ? (
                                        <Image 
                                            src={imageUrls[item._id]!} 
                                            alt="Product image" 
                                            width={80} 
                                            height={80} 
                                            unoptimized 
                                            style={{ objectFit: "cover", borderRadius: "4px" }} 
                                        />
                                    ) : (
                                        <p>No Image for this product</p>
                                    )}
                                </Link>
                            </div>
                            <div className="best-sell-post-content">
                                <h6 className="best-sell-post-title small underline">
                                    <Link href={`/shop-details/${item._id}`}>{item.name}</Link>
                                </h6>
                                <div className="best-sell-post-price">{`$${item.price}`}</div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <style jsx>{`
                .best-sell-post {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                }
                
                .best-sell-post-thumb {
                    width: 80px; /* Set fixed width */
                    height: 80px; /* Set fixed height */
                    overflow: hidden;
                    position: relative;
                }

                .best-sell-post-thumb :global(img) {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }
                
                .best-sell-post-title {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.2;
                }

                .best-sell-post-price {
                    color: #333;
                    font-size: 13px;
                }
            `}</style>
        </>
    );
};

export default SidebarProduct;
