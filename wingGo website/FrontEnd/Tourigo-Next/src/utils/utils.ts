"use client";
export const animationCreate = () => {
  if (typeof window !== "undefined") {
    (window as any).WOW = require("wowjs");
  }
  new (window as any).WOW.WOW({ live: false }).init();
};
// utils/calculateAverageRating.ts
export const calculateAverageRating = (ratings: { rating: number }[]): number => {
  if (ratings.length === 0) return 0;
  const total = ratings.reduce((sum, { rating }) => sum + rating, 0);
  return total / ratings.length;
};

import axios from 'axios';

export const fetchTouristData = async (touristId: string) => {
  try {
    const response = await axios.get(`/api/tourists/${touristId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourist data:', error);
    return null;
  }
};