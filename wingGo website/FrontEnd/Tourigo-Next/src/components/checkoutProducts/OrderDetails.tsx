"use client";
import React, { useState,useEffect } from "react";
import SelectPaymentType from "./SelectPaymentType";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { getOrderDetails,getProductById } from '@/api/cartApi';
import { Product } from '@/interFace/interFace';
import {fetchCartTotalPrice,getDiscountByCode} from '@/api/cartApi'

interface SelectPaymentTypeProps {
  
  promoCode: string | null;
  orderId:string| null;
}
const OrderDetails : React.FC<SelectPaymentTypeProps> = ({ promoCode,orderId}) => {
  const router = useRouter();
  const [total, setTotal] = useState<number>(0); // Explicitly define type
  const [items, setItems] = useState<any[]>([]); // Use any[] or define a proper type for products
  const [shippingAmount, setShippingAmount] = useState<number>(0);
  const [shippingTitle, setShippingTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [discount, setDiscount] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  


  // const subtotal = items.reduce(
  //   (total, product) => total + (product.price ?? 0) * (product.amount ?? 0),
  //   0
  // );

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
       
        const orderData = await getOrderDetails(orderId); // Fetch order details
        const products = orderData.products; // Extract product array from the order
        
        if (products && products.length > 0) {
          const detailedProducts = await Promise.all(
            products.map(async (item: any) => {
              const productDetails = await getProductById(item.productId);
              return {
                ...item,
                product: productDetails, // Add detailed product data
              };
            })
          );

          setItems(detailedProducts);
          console.log(detailedProducts);
          const orderTotal = detailedProducts.reduce(
            (sum, item) => sum + (item.product.price || 0) * (item.quantity || 1),
            0
          );
          const sub = detailedProducts.reduce(
            (sum, item) => sum + (item.product.price || 0) * (item.quantity || 1),
            0
          );
          setSubtotal(orderTotal);
         

         
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        alert("Failed to fetch order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);
  useEffect(() => {
    const fetchDiscount = async () => {
      if (promoCode) {
        try {
          const discountValue = await getDiscountByCode(promoCode); // Fetch discount using the promo code
          setDiscount(subtotal*((discountValue)/100)); // Set the discount value
          // console.log("Discount fetched successfully:", discount);
          setTotal(((100-discountValue)/100)*subtotal);
          console.log("Discount fetched successfully:",discountValue );
         
        } catch (error) {
          console.error("Error fetching discount:", error);
          alert("Failed to fetch discount. Please check the promo code.");
        }
      }
    };

    fetchDiscount();
  }, [promoCode,subtotal,discount]);

  

  // const handleExtraMoney = (extra: number, text: string) => {
  //   setTotal((prevTotal) => prevTotal + extra);
  //   setShipingTitle(text);
  //   setShipingAmount(extra);
  // };

  // const handleSubmit = () => {
  //   const shippingInfo = `${shipingTitle} ${shipingAmount}`;
  //   localStorage.setItem("Shipping Info", shippingInfo);
  //   router.push("/order");
  // };

  return (
    <>
      <div className="col-lg-5">
        <div className="checkout-place sidebar-sticky">
          <h3 className="checkout-place-title">Your Order</h3>
          <div className="order-info-list">
            <ul>
              <li className="order-info-list-header">
                <h4>Product</h4>
                <h4>Total</h4>
              </li>

              {items?.length > 0 ? (
                <>
                  {items.map((item, index) => {
                    const totalAmount = item.price * item.quantity;
                    return (
                      <li key={index} className="order-info-list-desc">
                        <p>
                          {item.product.name} <span> x {item.quantity}</span>
                        </p>
                        <span>${totalAmount.toFixed(2)}</span>
                      </li>
                    );
                  })}
                </>
              ) : (
                <li className="order-info-list-desc">
                  <p>No items in your order.</p>
                </li>
              )}

              <li className="order-info-list-subtotal">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </li>

              <li className="order-info-list-subtotal">
                <span>Discount</span>
                <span>- ${discount.toFixed(2)}</span>
              </li>

              {/* <li className="order-info-list-shipping">
                <span>Shipping</span>
                <div className="order-info-list-shipping-item d-flex flex-column align-items-start">
                  <span>
                    <input
                      id="flat_rate"
                      type="radio"
                      name="shipping"
                      // onChange={() => handleExtraMoney(20, "Flat Rate")}
                    />
                    <label htmlFor="flat_rate">
                      Flat rate: <span>$20.00</span>
                    </label>
                  </span>
                  <span>
                    <input
                      id="local_pickup"
                      type="radio"
                      name="shipping"
                      // onChange={() => handleExtraMoney(25, "Local Pickup")}
                    />
                    <label htmlFor="local_pickup">
                      Local pickup: <span>$25.00</span>
                    </label>
                  </span>
                  <span>
                    <input
                      id="free_shipping"
                      type="radio"
                      name="shipping"
                      // onChange={() => handleExtraMoney(0, "Free Shipping")}
                    />
                    <label htmlFor="free_shipping">Free shipping</label>
                  </span>
                </div>
              </li> */}

              <li className="order-info-list-total">
                <span>Total</span>
                <span> ${total > 0 ? total.toFixed(2) : subtotal.toFixed(2)}</span>
              </li>
            </ul>
          </div>
          
          {/* <div className="checkout-agree">
            <div className="checkout-option mb-15">
              <input id="read_all" type="checkbox" />
              <label htmlFor="read_all">
                I have read and agree to the website terms.
              </label>
            </div>
          </div> */}
          
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
