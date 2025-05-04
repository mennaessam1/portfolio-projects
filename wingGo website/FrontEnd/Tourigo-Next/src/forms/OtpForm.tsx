"use client";

import { verifyOtp } from "@/api/forgotPasswordApi";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
interface FormData {
  inputOne: string;
  inputTwo: string;
  inputThree: string;
  inputFour: string;
}

const OtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const toastId = toast.loading("");

    try {
      // Call API to verify OTP
      const otp = `${data.inputOne}${data.inputTwo}${data.inputThree}${data.inputFour}`;
      console.log("OTP:", otp);
      const email = searchParams.get("email") as string;
      if (!email) throw new Error("Email is missing from the query parameters");
      const response = await verifyOtp(email, otp);
      toast.success("OTP Verified Successfully", { id: toastId, duration: 1000 });
      reset();
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);

    } catch (error) {
      toast.error("Error", { id: toastId, duration: 1000 });
    }
    
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="otp-input mb-15">
          <div className="input-box">
            <input
              type="text"
              className="input"
              placeholder=""
              maxLength={1}
              {...register("inputOne")}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input"
              placeholder=""
              maxLength={1}
              {...register("inputTwo")}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input"
              placeholder=""
              maxLength={1}
              {...register("inputThree")}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input"
              placeholder=""
              maxLength={1}
              {...register("inputFour")}
            />
          </div>
        </div>
        <div className="sign-btn mb-20">
          <button
            type="submit"
            className="bd-primary-btn btn-style is-bg radius-60"
          >
            <span className="bd-primary-btn-text">Verify</span>
            <span className="bd-primary-btn-circle"></span>
          </button>
        </div>
      </form>
    </>
  );
};

export default OtpForm;
