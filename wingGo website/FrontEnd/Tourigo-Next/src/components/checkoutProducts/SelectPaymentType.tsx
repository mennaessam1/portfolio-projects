"use client";
import React, { useState } from "react";
import paymentIcon from "../../../public/assets/images/icons/payment-option.png";
import Image from "next/image";
import Link from "next/link";
interface SelectPaymentTypeProps {
  setPaymentMethod: (method: "wallet" | "stripe" | "creditCard") => void;
  promoCode: string | null;
}

const SelectPaymentType: React.FC<SelectPaymentTypeProps> = ({ setPaymentMethod,promoCode }) => {
  return (
    <>
      {/* Wallet Payment Option */}
      <div className="checkout-payment-item">
        <input
          type="radio"
          id="wallet_payment"
          name="payment"
          onChange={() => setPaymentMethod("wallet")}
        />
        <label htmlFor="wallet_payment">Pay with Wallet</label>
        <div className="checkout-payment-desc wallet-payment">
          <p>
            The total amount will be deducted from your wallet balance. Ensure you have sufficient funds.
          </p>
        </div>
      </div>

      {/* Stripe Payment Option */}
      <div className="checkout-payment-item">
        <input
          type="radio"
          id="stripe_payment"
          name="payment"
          // onChange={() => setPaymentMethod("stripe")}
        />
        <label htmlFor="stripe_payment">Cash On Delivery</label>
        <div className="checkout-payment-desc stripe-payment">
          <p>
            You will be redirected to Stripe for secure payment processing. No card details are stored on our server.
          </p>
        </div>
      </div>

      {/* Credit Card Payment Option */}
      <div className="checkout-payment-item">
        <input
          type="radio"
          id="credit_card_payment"
          name="payment"
          onChange={() => setPaymentMethod("creditCard")}
        />
        <label htmlFor="credit_card_payment">Pay with Credit/Debit Card</label>
        <div className="checkout-payment-desc credit-card-payment">
          <p>
            Enter your credit or debit card details to proceed with payment. Your card information will be securely
            processed.
          </p>
        </div>
      </div>

      {/* PayPal Option (Disabled) */}
      <div className="checkout-payment-item">
        
        <label htmlFor="paypal_payment">
           <Image src={paymentIcon} alt="payment-icon" />
        </label>
        <div className="checkout-payment-desc disabled-payment">
          <p>PayPal is currently unavailable for this booking.</p>
        </div>
      </div>
    </>
  );
};

export default SelectPaymentType;
