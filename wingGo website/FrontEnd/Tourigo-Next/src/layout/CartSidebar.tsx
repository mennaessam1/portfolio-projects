import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  cart_product,
  decrease_quantity,
  remove_cart_product,
} from "@/redux/slices/cartSlice";
import { ProductsType } from "@/interFace/interFace";

interface HeaderCartProps {
  setCartOpen: (isOpen: boolean) => void;
  cartOpen: boolean;
}

const CartSidebar: React.FC<HeaderCartProps> = ({ setCartOpen, cartOpen }) => {
  const dispatch = useDispatch();
  const handleRemoveCart = (product: ProductsType) => {
    dispatch(remove_cart_product(product));
  };

  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );
  const totalPrice = cartProducts.reduce(
    (total, product) => total + (product.price ?? 0) * (product.quantity ?? 0),
    0
  );

  return (
    <div className="cartmini__area">
      <div
        className={cartOpen ? "cartmini__wrapper opened" : "cartmini__wrapper"}
      >
        <div className="cartmini__title">
          <h4>Shopping cart</h4>
        </div>
        <div className="cartmini__close">
          <button
            type="button"
            className="cartmini__close-btn"
            onClick={() => setCartOpen(false)}
          >
            <i className="fal fa-times"></i>
          </button>
        </div>
        {cartProducts?.length >= 1 ? (
          <>
            <div className="cartmini__widget">
              <div className="cartmini__inner">
                <ul>
                  {cartProducts.map((item, index) => (
                    <li key={index}>
                      <div className="cartmini__thumb">
                        <Link href="/">
                          {item.image && (
                            <Image
                              src={item.image}
                              style={{ width: "auto", height: "auto" }}
                              alt="img not found"
                            />
                          )}
                        </Link>
                      </div>
                      <div className="cartmini__content">
                        <h5> {item.title} </h5>
                        <div className="product-quantity mt-10 mb-10">
                          <button
                            onClick={() => dispatch(decrease_quantity(item))}
                            className="cart-minus-decrease"
                          >
                            <i className="far fa-minus"></i>
                          </button>
                          <p className="cart-input-quantity">
                            {item?.quantity}
                          </p>
                          <button
                            onClick={() => dispatch(cart_product(item))}
                            className="cart-plus-increase"
                          >
                            <i className="far fa-plus"></i>
                          </button>
                        </div>
                        <div className="product__sm-price-wrapper">
                          <span className="product__sm-price">{`$${item.price}.00`}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveCart(item)}
                        className="cartmini__del"
                      >
                        <i className="fal fa-times"></i>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="cartmini__checkout">
                  <div className="cartmini__checkout-title d-flex justify-content-between">
                    <span>Sub Total:</span>
                    <span>{`$${totalPrice.toFixed(2)}`}</span>
                  </div>
                </div>
              </div>
              <div className="cartmini__viewcart">
                <Link className="tourigo-sec-btn cart-btn" href="/cart">
                  View Cart
                </Link>
                <Link className="tourigo-sec-btn" href="/checkout">
                  Checkout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="cartmini__widget">
              <div className="cartmini__inner">
                <h5 className="tourigo-cart">Your Cart is empty</h5>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CartSidebar;
