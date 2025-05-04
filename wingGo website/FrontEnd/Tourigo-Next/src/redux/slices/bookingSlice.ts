"use client";
import { ITourDataType } from "@/interFace/interFace";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
interface CartState {
  bookingProducts: ITourDataType[];
}
const initialState: CartState = {
  bookingProducts: [],
};
export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    booking_product: (state, { payload }: PayloadAction<ITourDataType>) => {
      const productIndex = state?.bookingProducts?.findIndex(
        (item) => item.id === payload.id
      );
      if (productIndex >= 0) {
        const toastId = toast.loading("");
        state.bookingProducts[productIndex].quantity! += 1;
        toast.info("Increase Product Quantity", {
          id: toastId,
          duration: 1000,
        });
      } else {
        const tempProduct = { ...payload };
        const toastId = toast.loading("");
        state?.bookingProducts?.push(tempProduct);
        toast.success(`${payload?.tourTitle?.slice(0, 15)} Added to Booked`, {
          id: toastId,
          duration: 1000,
        });
      }
    },

    incress_adult_product: (
      state,
      { payload }: PayloadAction<ITourDataType>
    ) => {
      const productIndex = state.bookingProducts.findIndex(
        (item) => item.id === payload.id
      );
      if (productIndex >= 0) {
        const toastId = toast.loading("");
        state.bookingProducts[productIndex].adult! += 1;
        toast.info("Increase Adult Quantity", {
          id: toastId,
          duration: 1000,
        });
      }
    },
    incress_infant_product: (
      state,
      { payload }: PayloadAction<ITourDataType>
    ) => {
      const productIndex = state.bookingProducts.findIndex(
        (item) => item.id === payload.id
      );
      if (productIndex >= 0) {
        const toastId = toast.loading("");
        state.bookingProducts[productIndex].infant! += 1;
        toast.info("Increase Adult Quantity", {
          id: toastId,
          duration: 1000,
        });
      }
    },
    decrease_adult_quantity: (
      state,
      { payload }: PayloadAction<ITourDataType>
    ) => {
      const cartIndex = state.bookingProducts.findIndex(
        (item) => item.id === payload.id
      );
      if (cartIndex >= 0) {
        const totalCart = state.bookingProducts[cartIndex].adult ?? 0;
        if (totalCart > 1) {
          const toastId = toast.loading("");
          state.bookingProducts[cartIndex].adult = totalCart - 1;
          toast.success("Adult Decrease", { id: toastId, duration: 1000 });
        } else {
          const toastId = toast.loading("");
          toast.error(`Adult cannot be less than 1`, {
            id: toastId,
            duration: 1000,
          });
        }
      }
    },
    decrease_infant_quantity: (
      state,
      { payload }: PayloadAction<ITourDataType>
    ) => {
      const cartIndex = state.bookingProducts.findIndex(
        (item) => item.id === payload.id
      );
      if (cartIndex >= 0) {
        const totalCart = state.bookingProducts[cartIndex].infant ?? 0;
        if (totalCart > 1) {
          const toastId = toast.loading("");
          state.bookingProducts[cartIndex].infant = totalCart - 1;
          toast.success("Infant Decrease", { id: toastId, duration: 1000 });
        } else {
          const toastId = toast.loading("");
          toast.error(`Infant cannot be less than 1`, {
            id: toastId,
            duration: 1000,
          });
        }
      }
    },
    remove_booking_product: (
      state,
      { payload }: PayloadAction<ITourDataType>
    ) => {
      const toastId = toast.loading("");
      state.bookingProducts = state.bookingProducts.filter(
        (item) => item.id !== payload.id
      );
      toast.error(`Remove from your booking`, { id: toastId, duration: 1000 });
    },
    clear_bookings: (state) => {
      const confirmMsg = window.confirm(
        "Are you sure deleted your all cart items ?"
      );
      if (confirmMsg) {
        state.bookingProducts = [];
      }
    },
  },
});

export const {
  booking_product,
  incress_adult_product,
  incress_infant_product,
  decrease_adult_quantity,
  decrease_infant_quantity,
  remove_booking_product,
  clear_bookings,
} = bookingSlice.actions;

export default bookingSlice.reducer;
