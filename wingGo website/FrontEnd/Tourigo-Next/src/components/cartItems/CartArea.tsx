"use client";
import { ProductsType } from "@/interFace/interFace";
import {
  cart_product,
  clear_cart,
  decrease_quantity,
  remove_cart_product,
} from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import CrossIcon from "@/svg/CrossIcon";
import MinusIcon from "@/svg/MinusIcon";
import PlusIcon from "@/svg/PlusIcon";
import Image from "next/image";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {fetchCartItems,updateCartItemAmount,removeFromCart,createOrder,fetchCartTotalPrice} from '@/api/cartApi'
import { Cart} from "@/interFace/interFace";

const CartArea = () => {
  const router = useRouter(); // Initialize useRouter
    const [items, setItems] = useState<Cart[]>([]); // Use Cart[] for the state type
    const dispatch = useDispatch();
    const [total, setTotal] = useState<number>(0); // Explicitly type total as number
    const [promoCode, setPromoCode] = useState<string>("");
   const [discount, setDiscount] = useState<number>(0);
  


    useEffect(() => {
      const fetchItems = async () => {
        try {
          const data = await fetchCartItems();
          setItems(data || []); // Fallback to an empty array if data is undefined
        } catch (error) {
          console.error("Error fetching cart items:", error);
         
        }
      };
  
      fetchItems();
    }, []);
    useEffect(() => {
      const calculateTotal = () => {
        const newTotal = items.reduce(
          (sum, item) => sum + (item.price || 0) * (item.amount || 1),
          0
        );
        setTotal(newTotal);
      };
  
      calculateTotal();
    }, [items]);



  
  const subtotal = items.reduce(
    (total, product) => total + (product.price ?? 0) * (product.amount ?? 0),
    0
  );
  const handleUpdateAmount = async (cartItemId: string, newAmount: number) => {
    try {
     
      console.log('Updating cart item:', { cartItemId, newAmount }); // Debugging
      const updatedCartItem = await updateCartItemAmount(cartItemId, newAmount);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === cartItemId ? { ...item, amount: newAmount } : item
        )
      );
      console.log("Cart item updated:", updatedCartItem);
    } catch (error) {
      alert(" We're sorry, but the quantity you selected exceeds the available stock for this product");
      
    }
  };
 
  const handleDelete = (cartItemId: string) => {
    const userConfirmed = window.confirm(
      "Do you really want to remove this item from the cart?"
    );

    if (userConfirmed) {
      setItems((prevItems) => removeItemFromState(cartItemId, prevItems)); // Optimistically update the state
      removeFromCart(cartItemId)
        .then(() => {
          console.log("Item successfully removed.");
          // alert("Item successfully removed");
        })
        .catch((error) => {
          console.error("Error removing item:", error);
          alert("Failed to remove the item. Please try again.");
          // Revert state if backend call fails
          setItems((prevItems) => [
            ...prevItems,
            items.find((item) => item.productId === cartItemId)!,
          ]);
        });
    }
  };

  // Helper function to remove item from state
  const removeItemFromState = (cartItemId: string, prevItems: Cart[]) => {
    return prevItems.filter((item) => item.productId !== cartItemId);
  };

  const handleApplyPromoCode = async () => {
    try {
      console.log("hello");
      const { totalPrice, discount: appliedDiscount } = await fetchCartTotalPrice(promoCode);
      setTotal(totalPrice);
      setDiscount(subtotal*((appliedDiscount)/100));
      // alert("Promo code applied successfully!");
    } catch (error) {
      console.error("Error applying promo code:", error);
      alert("Failed to apply promo code. Please check and try again.");
    }
  };
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, cartItemId: string) => {
  //   const newAmount = parseInt(e.target.value, 10);
  //   if (newAmount > 0) {
  //     handleUpdateAmount(cartItemId, newAmount); // Call the update handler
  //   }
  // };
  const handleCreateOrder = async () => {
    try {
      if (!items || items.length === 0) {
        console.error('No items in the cart to process.');
        return alert('Your cart is empty. Add items before proceeding.');
      }
  
      // Extract unique touristIds using Array.from() for compatibility
      const touristIds = Array.from(new Set(items.map((item) => item.touristId)));
  
      if (touristIds.length > 1) {
        console.error('Multiple tourist IDs detected:', touristIds);
        return alert('Cannot proceed with multiple tourist IDs in the cart.');
      }
  
      const buyerId = touristIds[0];
      console.log('Processing order for buyerId:', buyerId);
  
      const order = await createOrder(buyerId);
      console.log('Order details:', order.orderId);
     
  
      setItems([]);
      router.push(`/checkoutProducts?promoCode=${encodeURIComponent(promoCode)}&orderId=${encodeURIComponent(order.orderId)}`
);
    } catch (error) {
      console.error('Error during order creation:', error);
      alert('Failed to create order. Please try again.');
    }
  };
 
  return (
    <>
  
    
    
      <section className="bd-cart-area section-space">
        
        <div className="container">
        
          {items?.length ? (
            <>
            <div className="bd-cart-bottom">
                    <div className="row align-items-end">
                      <div className="col-xl-7 col-md-8">
                        <div className="bd-cart-coupon">
                          
                            <div className="bd-cart-coupon-input-box">
                              <label style={{ marginLeft: '15px' }}>Coupon Code:</label>
                              <div className="bd-cart-coupon-input d-flex flex-wrap gap-15 align-items-center">
                                <input
                                  type="text"
                                  placeholder="Enter Coupon Code"
                                  value={promoCode}
                                 onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button
                                 
                                  onClick={handleApplyPromoCode}
                                  className="bd-primary-btn btn-style is-bg radius-60"
                                >
                                  <span className="bd-primary-btn-text">
                                    Apply Coupon
                                  </span>
                                  <span className="bd-primary-btn-circle"></span>
                                </button>
                              </div>
                            </div>
                          
                        </div>
                      </div>
                      
                    </div>
                  </div>
              <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-xl-9 col-lg-8">
                
                  <div className="bd-cart-list mb-25 mr-30">
                    <table className="table">
                      <thead>
                        <tr>
                          <th colSpan={2} className="bd-cart-header-product">
                            Products
                          </th>
                          <th className="bd-cart-header-price"></th>
                          <th className="bd-cart-header-quantity"></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items?.map((item, index) => {
                          const totalAmount = item?.price * item?.amount;
                          return (
                            <tr key={index}>
                              

                              <td className="bd-cart-title">
                                <Link href={`/Product-details/${item.productId}/Tourist`}>{item?.name}</Link>
                              </td>

                              <td className="bd-cart-price">
                                <span>${totalAmount.toFixed(2)}</span>
                              </td>

                              <td className="bd-cart-quantity">
                                <div className="bd-product-quantity">
                                  <span
                                    className="bd-cart-minus"
                                    onClick={() => handleUpdateAmount(item._id,item.amount-1)}
                                  >
                                    <MinusIcon />
                                  </span>
                                  <input
                                    className="bd-cart-input"
                                    type="text"
                                   
                                    value={item.amount}
                                    readOnly
                                  />
                                  <span
                                    className="bd-cart-plus"
                                    onClick={() => handleUpdateAmount(item._id,item.amount+1)}
                                  >
                                    <PlusIcon />
                                  </span>
                                </div>
                              </td>

                              <td className="bd-cart-action">
                                <button
                                  className="bd-cart-action-btn"
                                  onClick={() => handleDelete(item.productId)}
                                >
                                  <CrossIcon />
                                  <span className="ml-1">Remove</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* <div className="bd-cart-bottom">
                    <div className="row align-items-end">
                      <div className="col-xl-6 col-md-4">
                        <div className="bd-cart-update">
                          <button
                            onClick={handleCreateOrder}
                            className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                          >
                            <span className="bd-primary-btn-arrow arrow-right">
                              <i className="fa-regular fa-arrow-right"></i>
                            </span>
                            <span className="bd-primary-btn-text">Proceed to Checkout</span>
                            <span className="bd-primary-btn-circle"></span>
                            <span className="bd-primary-btn-arrow arrow-left">
                              <i className="fa-regular fa-arrow-right"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="bd-cart-checkout-wrapper">
                    <div className="bd-cart-checkout-top d-flex align-items-center justify-content-between">
                      <span className="bd-cart-checkout-top-title">
                        Subtotal
                      </span>
                      <span className="bd-cart-checkout-top-price">
                        ${subtotal.toFixed(0)}
                      </span>
                    </div>
                    <div className="bd-cart-checkout-top d-flex align-items-center justify-content-between">
                      <span>Discount</span>
                      <span>
                     - ${discount}
                      </span>
                    </div>
                    
                    <div className="bd-cart-checkout-top d-flex align-items-center justify-content-between">
                      <span>Total</span>
                      <span>
                        ${total > 0 ? total.toFixed(2) : subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="bd-cart-checkout-proceed">
                    <button
                            onClick={handleCreateOrder}
                            className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                          >
                            <span className="bd-primary-btn-arrow arrow-right">
                              <i className="fa-regular fa-arrow-right"></i>
                            </span>
                            <span className="bd-primary-btn-text">Proceed to Checkout</span>
                            <span className="bd-primary-btn-circle"></span>
                            <span className="bd-primary-btn-arrow arrow-left">
                              <i className="fa-regular fa-arrow-right"></i>
                            </span>
                          </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h3 className="text-center">No Cart Product Found</h3>
          )}
        </div>
      </section>
    </>
  );
};

export default CartArea;