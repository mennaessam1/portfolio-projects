"use client";
import GetRatting from "@/hooks/GetRatting";
import useGlobalContext from "@/hooks/use-context";
import { ProductsType } from "@/interFace/interFace";
import { useAppDispatch } from "@/redux/hooks";
import { cart_product } from "@/redux/slices/cartSlice";
import { wishlist_product } from "@/redux/slices/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface propsType {
  item: ProductsType;
  classItem: string;
}

const ShopContentSingleCard = ({ item, classItem }: propsType) => {
  const { setModalData } = useGlobalContext();
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: ProductsType) => {
    dispatch(cart_product(product));
  };
  const handleAddToWishlist = (product: ProductsType) => {
    dispatch(wishlist_product(product));
  };
  return (
    <>
      <div className={classItem}>
        <div className="product-wrapper">
          <div className="product-image-wrapper image-hover-effect">
            <Link href={`/shop-details/${item.id}`} className="product-image">
              <div className="product-image-one">
                <Image src={item.image} alt="image not found" />
              </div>
              <div className="product-image-two">
                {item.imageTwo && (
                  <Image src={item.imageTwo} alt="image not found" />
                )}
              </div>
            </Link>
            {item.label ? (
              <span className="product-label">
                <span className={`bd-badge fw-5 ${item.labelColor}`}>
                  {item.label}
                </span>
              </span>
            ) : (
              ""
            )}
            <div className="product-links">
              <ul>
                <li>
                  <button onClick={() => handleAddToWishlist(item)}>
                    <i className="fa fa-heart"></i>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleAddToCart(item)}>
                    <i className="far fa-cart-plus"></i>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalData(item)}
                    data-bs-toggle="modal"
                    data-bs-target="#productModalId"
                  >
                    <i className="far fa-eye"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="product-content">
            <div className="product-rating">
              {item.rating && <GetRatting averageRating={item?.rating} />}
            </div>
            
            <h5 className="product-title underline custom_mb-5">
              <Link href={`/shop-details/${item.id}`}>{item.title}</Link>
            </h5>
            <div className="product-price">
              {`$${item.price}.00`}{" "}
              {item.discount ? (
                <span className="product-discount-price">{`$${item.discount}.00`}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopContentSingleCard;
