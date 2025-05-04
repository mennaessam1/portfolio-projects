"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { convertCurrency } from '@/api/CurrencyApi';

type CurrencyContextType = {
  currency: "EUR" | "USD" | "EGP"; // Explicitly typed for allowed currencies
  setCurrency: (currency: "EUR" | "USD" | "EGP") => void;
  convertedAmount: number;
  convertAmount: (amount: number) => Promise<number>;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<"EUR" | "USD" | "EGP">("EUR"); // Default to EUR
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const convertAmount = async (amount: number): Promise<number> => {
    try {
      const result = await convertCurrency(amount, currency);
      setConvertedAmount(result.amount); // Update the context state for usage
      console.log("Converted amount:", result.amount); // Log the converted amount for debugging
      return result.amount; // Return the converted amount
    } catch (error) {
      console.error('Conversion failed:', error);
      return amount; // Fallback to the original amount if conversion fails
    }
  };

  // Update convertedAmount whenever the currency changes
  useEffect(() => {
    convertAmount(1); // Optionally test conversion with 1 unit when currency changes
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertedAmount, convertAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
